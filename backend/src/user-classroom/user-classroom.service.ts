import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserClassroom } from './schemas/user-classroom.schema';
import mongoose from 'mongoose';

import { UserClassroomDto } from './dto/user-classroom.dto';
import { User } from 'src/shared/schemas/user.schema';
import { ROLE_CLASS } from 'src/shared/enums';

@Injectable()
export class UserClassroomService {
  constructor(
    @InjectModel(UserClassroom.name)
    private userClassroomModel: mongoose.Model<UserClassroom>,
  ) {}

  // create user in class room with role
  async insertUserClass(dto: UserClassroomDto): Promise<UserClassroom> {
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

  // get all user in class

  // invite user in class

  // user join class by classcode

  // user join class by link -> user is student.

  // user is teacher or student ?
}
