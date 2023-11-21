import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Classroom } from 'src/schemas/classroom.schema';

@Injectable() // this is "Dependency Injection"
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: mongoose.Model<Classroom>,
  ) {}

  async crateNewClass(classDTO: Classroom): Promise<Classroom> {
    const res = await this.classroomModel.create(classDTO);
    return res;
  }

  async getClassAll(): Promise<Classroom[]> {
    const classes = await this.classroomModel.find();
    return classes;
  }

  async getClassById(id: string): Promise<Classroom> {
    const classroom = await this.classroomModel.findById(id);
    if (!classroom) throw new NotFoundException('Classroom not found');
    return classroom;
  }

  async deleteClassById(id: string): Promise<Classroom> {
    const classroom = await this.classroomModel.findByIdAndDelete(id);
    return classroom;
  }
}
