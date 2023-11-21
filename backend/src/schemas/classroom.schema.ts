import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ClassroomDocument = HydratedDocument<Classroom>;

@Schema({
  timestamps: true,
})
export class Classroom {
  @Prop({ required: true })
  classCode: string;

  @Prop({ required: true })
  teacherOwnerId: string;

  @Prop({ required: true })
  className: string;

  @Prop({
    default: () => {
      return '';
    },
  })
  title: string;

  @Prop({
    default: () => {
      return '';
    },
  })
  room: string;

  @Prop({
    default: () => {
      return '';
    },
  })
  topic: string;
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
