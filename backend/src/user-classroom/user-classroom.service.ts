import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserClassroom } from './schemas/user-classroom.schema';
import mongoose from 'mongoose';

import { UserClassroomDto, UserClassroomDtos } from './dto/user-classroom.dto';
import { User } from 'src/shared/schemas/user.schema';
import { ROLE_CLASS } from 'src/shared/enums';

@Injectable()
export class UserClassroomService {
  constructor(
    @InjectModel(UserClassroom.name)
    private userClassroomModel: mongoose.Model<UserClassroom>,
  ) {}

  // create user in class room with role
  async createUserClass(dto: UserClassroomDto): Promise<UserClassroom> {
    try {
      return (await this.userClassroomModel.create(dto)).populate({
        path: 'classId',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'owner',
          select: '_id username email',
        },
      });
    } catch (err) {
      throw new Error('Error creating instance: ' + err.message);
    }
  }

  // delete user in class room by owner
  async deleteUserClass(
    deleteUserId: string,
    classId: string,
  ): Promise<UserClassroom> {
    const deletedUser = await this.userClassroomModel.findOneAndDelete({
      classId: classId,
      userId: deleteUserId,
    });
    if (!deletedUser)
      throw new NotFoundException(`${deleteUserId} or ${classId} not exists `);

    return deletedUser;
  }

  // get all teaching class of user ?
  async getAllClassWithRole(
    user: User,
    role: ROLE_CLASS,
  ): Promise<UserClassroom[]> {
    const classes = await this.userClassroomModel
      .find({
        userId: user._id,
        role: role,
      })
      .select('classId role -_id')
      .populate({
        path: 'classId',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'owner',
          select: '_id username email',
        },
      });

    if (!classes) return [];

    return classes;
  }

  // get all user not owner in class
  async getAllUser(classId: string): Promise<UserClassroom[]> {
    const lists = await this.userClassroomModel
      .find({ classId: classId })
      .select('-__v')
      .populate({
        path: 'userId',
        select: '_id username email',
      });

    return lists;
  }

  // get specific user classroom by user classroom id
  async getUser(id: string): Promise<UserClassroom> {
    const user = await this.userClassroomModel.findById(id).populate('userId');
    return user;
  }

  // invite user in class
  async inviteUserClass(dto: UserClassroomDtos[]): Promise<UserClassroom[]> {
    try {
      if (dto.length < 1) throw new BadRequestException('no user');
      const res = await this.userClassroomModel.create(dto);
      const populate = await Promise.all(
        res.map(async (doc) => {
          return await doc.populate({
            path: 'classId',
            select: '-createdAt -updatedAt -__v',
            populate: {
              path: 'owner',
              select: '_id username email',
            },
          });
        }),
      );

      return populate;
    } catch (err) {
      throw new Error('Error creating instance: ' + err.message);
    }
  }

  // user accept or inactive user
  async accpetInvite(
    u: User,
    classId: string,
    role: ROLE_CLASS,
  ): Promise<UserClassroom> {
    const res = await this.userClassroomModel
      .findOneAndUpdate(
        {
          userId: u,
          classId: classId,
          role: role,
        },
        { $set: { isActive: true } },
        { new: true },
      )
      .populate({
        path: 'classId',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'owner',
          select: '_id username email',
        },
      });

    if (!res) throw new NotFoundException('user not found');

    return res;
  }

  // create user in class room with role
  async _createUserClass(dto: UserClassroomDtos): Promise<UserClassroom> {
    try {
      const existClass = await this.userClassroomModel
        .findOne({
          userId: dto.userId,
          classId: dto.classId,
        })
        .populate({
          path: 'classId',
          select: '-createdAt -updatedAt -__v',
          populate: {
            path: 'owner',
            select: '_id username email',
          },
        });

      if (existClass) return existClass;

      return (await this.userClassroomModel.create(dto)).populate({
        path: 'classId',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'owner',
          select: '_id username email',
        },
      });
    } catch (err) {
      throw new Error('Error creating instance: ' + err.message);
    }
  }
}
