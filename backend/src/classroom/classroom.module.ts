import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import {
  Classroom,
  ClassroomSchemaFactory,
} from 'src/classroom/schemas/classroom.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Classroom.name,
        useFactory: ClassroomSchemaFactory,
        imports: [],
      },
    ]),
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
