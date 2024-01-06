import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import { ROLE_CLASS } from 'src/shared/enums';
import { User } from 'src/shared/schemas/user.schema';

export type UserClassroomDocument = HydratedDocument<UserClassroom>;

// @Schema({ _id: false, versionKey: false, timestamps: false })
// export class UserExist {
//   @Prop({
//     required: true,
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Classroom',
//   })
//   classId: Classroom;

//   @Prop({
//     required: true,
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   })
//   userId: User;

//   // duoc add boi ai ?
// }

@Schema({
  collection: 'UserClassrooms',
  timestamps: true,
})
export class UserClassroom {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
  })
  classId: Classroom;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;

  @Prop({ required: true, enum: ROLE_CLASS })
  role: ROLE_CLASS;

  // classcode + hashstring
  @Prop({ default: '' })
  studentId: string;

  @Prop({ default: false })
  isActiveStudentId: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

const UserClassroomSchema = SchemaFactory.createForClass(UserClassroom);

UserClassroomSchema.index({ classId: 1, userId: 1 }, { unique: true });

export { UserClassroomSchema };
