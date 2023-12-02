import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import { generateClassCode, getRndInteger } from 'src/shared/utils/utils';
import { CreateClassDto } from './dto/create-class.dto';
import { User } from 'src/shared/schemas/user.schema';

@Injectable() // this is "Dependency Injection"
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: mongoose.Model<Classroom>,
  ) {}

  // User create new class
  async createNewClass(
    owner: User,
    classroom: CreateClassDto,
  ): Promise<Classroom> {
    const classCode = generateClassCode();
    const coverImage = `/src/assets/gg${getRndInteger(1, 5)}.png`;

    const res = await this.classroomModel.create({
      ...classroom,
      owner: owner,
      classCode: classCode,
      coverImage: coverImage,
    });
    return res;
  }

  // Get all class of user
  async getClassOfUser(user: User): Promise<Classroom[]> {
    const classes = await this.classroomModel.find({
      'userList.userId': user._id,
    });
    if (classes.length < 1) throw new NotFoundException('Classroom not found');
    return classes;
  }

  // Get class following
  async getClassById(classId: string): Promise<Classroom> {
    const classroom = await this.classroomModel.findById(classId);
    if (!classroom) throw new NotFoundException('Classroom not found');
    return classroom;
  }

  async deleteClassById(id: string): Promise<Classroom> {
    const classroom = await this.classroomModel.findByIdAndDelete(id);
    return classroom;
  }
}
