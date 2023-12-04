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
import { getAllClassResponse } from 'src/shared/types/response.type';
import { UpdateClassDto } from './dto';

@Injectable() // this is "Dependency Injection"
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: mongoose.Model<Classroom>,
    private readonly userClassroomService: UserClassroomService,
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
    return res;
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

    return await this.classroomModel.findOneAndUpdate(
      { _id: classId },
      updateClass,
      { new: true },
    );
  }

  // Get class by ObjectId
  async getClassById(classId: string): Promise<Classroom> {
    const classroom = await this.classroomModel.findById(classId).populate({
      path: 'owner',
      select: '_id username email',
    });
    console.log(classroom);
    if (!classroom) throw new NotFoundException('Classroom not found');
    return classroom;
  }

  // Delete class ObjectId
  async deleteClassById(id: string): Promise<Classroom> {
    const classroom = await this.classroomModel.findOneAndDelete({ _id: id });
    return classroom;
  }
}
