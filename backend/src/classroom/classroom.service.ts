import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import { User } from 'src/shared/schemas/user.schema';
import { UserClassroom } from 'src/user-classroom/schemas/user-classroom.schema';
import { UserClassroomService } from 'src/user-classroom/user-classroom.service';
import { ROLE_CLASS } from 'src/shared/enums';
import {
  getAllClassResponse,
  userClassResponse,
} from 'src/shared/types/response.type';
import {
  AddUserClassroomDto,
  inviteListUserDto,
  JoinClassDto,
  UpdateClassDto,
} from './dto';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Injectable() // this is "Dependency Injection"
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: mongoose.Model<Classroom>,
    private readonly userClassroomService: UserClassroomService,
    private readonly sendgridService: SendgridService,
  ) {}

  // Create new class
  async createNewClass(
    owner: User,
    classroom: CreateClassDto,
  ): Promise<Classroom> {
    const res = await this.classroomModel.create({
      ...classroom,
      owner: owner,
    });
    return res.populate({
      path: 'owner',
      select: '_id username email',
    });
  }

  // get all class
  async getClassOfUser(
    user: User,
  ): Promise<getAllClassResponse<UserClassroom>> {
    const teaching_classes =
      await this.userClassroomService.getAllClassWithRole(
        user,
        ROLE_CLASS.Teacher,
      );

    const enrolled_classes =
      await this.userClassroomService.getAllClassWithRole(
        user,
        ROLE_CLASS.Student,
      );

    const own_classes = await this.userClassroomService.getAllClassWithRole(
      user,
      ROLE_CLASS.Owner,
    );

    const count =
      teaching_classes.length + enrolled_classes.length + own_classes.length;

    const response: getAllClassResponse<UserClassroom> = {
      count: count,
      teaching_class: teaching_classes,
      erolled_class: enrolled_classes,
      owner_class: own_classes,
    };

    return response;
  }

  // update class info
  async updateClassOfUser(
    user: User,
    classId: string,
    updateClass: UpdateClassDto,
  ): Promise<Classroom> {
    const classroom = await this.classroomModel.findOne({ _id: classId });
    if (!classroom) throw new NotFoundException('Class room not found');
    if (classroom.owner._id.toString() !== user._id.toString())
      throw new BadRequestException('user is not owner');

    return await this.classroomModel
      .findOneAndUpdate({ _id: classId }, updateClass, { new: true })
      .select('-createdAt -updatedAt -__v')
      .populate({
        path: 'owner',
        select: '_id username email',
      });
  }

  // Get class by ObjectId
  async getClassById(classId: string): Promise<Classroom> {
    const classroom = await this.classroomModel
      .findById(classId)
      .select('-createdAt -updatedAt -__v')
      .populate({
        path: 'owner',
        select: '_id username email',
      });
    if (!classroom) throw new NotFoundException('Classroom not found');
    return classroom;
  }

  // Delete class ObjectId
  async deleteClassById(id: string): Promise<Classroom> {
    const classroom = await this.classroomModel.findOneAndDelete({ _id: id });
    if (!classroom) throw new NotFoundException('Classroom not found');
    return classroom;
  }

  // Join class by code
  async joinClassByCode(
    user: User,
    code: JoinClassDto,
  ): Promise<userClassResponse<Classroom>> {
    const existClass = await this.classroomModel.findOne({
      classCode: code.classCode,
    });
    if (!existClass) throw new NotFoundException('Classroom not found');

    const userClass = await this.userClassroomService.createUserClass({
      classId: existClass,
      role: ROLE_CLASS.Student,
      userId: user,
    });
    // console.log(userClass);

    return {
      role: userClass.role,
      classId: userClass.classId,
    };
  }

  // get all user in class
  async getAllUser(classId: string): Promise<UserClassroom[]> {
    const existClass = this.classroomModel.findOne({ _id: classId });

    if (!existClass) throw new NotFoundException('Class not exists');

    return await this.userClassroomService.getAllUser(classId);
  }

  // add user to class
  async addUserClass(
    owner: User,
    user: AddUserClassroomDto,
    classId: string,
  ): Promise<UserClassroom> {
    const classroom = await this.classroomModel.findOne({ _id: classId });
    if (!classroom) throw new NotFoundException('Class room not found');
    if (classroom.owner._id.toString() !== owner._id.toString())
      throw new BadRequestException('user is not owner');

    return await this.userClassroomService.createUserClass({
      classId: classroom,
      role: user.role,
      userId: user.userId,
    });
  }

  // delete user
  async deleteUserClass(
    owner: User,
    deleteUser: string,
    classId: string,
  ): Promise<UserClassroom> {
    const classroom = await this.classroomModel.findOne({ _id: classId });
    if (!classroom) throw new NotFoundException('Class room not found');
    if (classroom.owner._id.toString() !== owner._id.toString())
      throw new BadRequestException('user is not owner');

    return await this.userClassroomService.deleteUserClass(deleteUser, classId);
  }

  // admin get all class
  async getAllClasses(): Promise<Classroom[]> {
    return await this.classroomModel
      .find()
      .populate({
        path: 'owner',
        select:
          '-password -resetToken -resetTokenExpirationDate -createdDate -updatedDate -__v',
      })
      .select('-__v');
  }

  // if class code is right with class id
  async _joinClassByLink_v1(
    u: User,
    id: string,
    cjc: string,
    role: ROLE_CLASS,
  ): Promise<UserClassroom> {
    const existClass = await this.classroomModel.findOne({
      _id: id,
      classCode: cjc,
    });
    if (!existClass) throw new NotFoundException('not found class');

    const res = await this.userClassroomService._createUserClass({
      classId: existClass,
      userId: u,
      role: role,
      isActive: false,
    });

    return res;
  }

  async _joinClassByLink_v2(
    u: User,
    id: string,
    cjc: string,
    role: ROLE_CLASS,
  ): Promise<UserClassroom> {
    const existClass = await this.classroomModel.findById(id);
    if (!existClass) throw new BadRequestException('id not found');
    if (existClass.classCode !== cjc)
      throw new BadRequestException('class code not right');

    const res = await this.userClassroomService.accpetInvite(
      u,
      existClass._id.toString(),
      role,
    );

    return res;
  }

  // invite user
  async inviteUserClass(
    owner: User,
    dto: inviteListUserDto[],
    classId: string,
  ): Promise<UserClassroom[]> {
    const classroom = await this.classroomModel.findOne({ _id: classId });
    if (!classroom) throw new NotFoundException('Class room not found');
    if (classroom.owner._id.toString() !== owner._id.toString())
      throw new BadRequestException('user is not owner');

    const res = await this.userClassroomService.inviteUserClass(dto);

    const emailPromises = dto.map((user) => {
      return this.sendgridService.sendInviteJoinClassEmail(
        user,
        `${process.env.CLIENT_URL}/c/${user.classId._id}?cjc=${user.classId.classCode}&role=${user.role}`,
      );
    });

    await Promise.all(emailPromises);

    return res;
  }

  // user accept invite
  async acceptInviteUserClass(
    u: User,
    classId: string,
    cjc: string,
    role: ROLE_CLASS,
  ): Promise<UserClassroom> {
    const classroom = await this.classroomModel.findOne({
      _id: classId,
      classCode: cjc,
    });
    if (!classroom) throw new NotFoundException('Class room not found');

    return await this.userClassroomService.accpetInvite(u, classId, role);
  }

  // inActive or Active class
  async activeClass(classId: string, isActive: boolean) {
    try {
      await this.classroomModel.findByIdAndUpdate(classId, {
        isActive: isActive,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
