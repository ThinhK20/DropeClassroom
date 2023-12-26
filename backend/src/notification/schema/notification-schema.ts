import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { User } from 'src/shared/schemas/user.schema';
import { Classroom } from 'src/classroom/schemas/classroom.schema';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ collection: 'Notification', timestamps: true })
export class Notification {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  studentId: User;

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
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
