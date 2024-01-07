import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import { UserClassroom } from 'src/user-classroom/schemas/user-classroom.schema';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ collection: 'Notification', timestamps: true })
export class Notification {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  studentId: UserClassroom;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
  })
  assignmentId: Assignment;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
  })
  classId: Classroom;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  link: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
