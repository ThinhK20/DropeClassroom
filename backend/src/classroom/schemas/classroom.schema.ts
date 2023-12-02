import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/shared/schemas/user.schema';
import { generateClassCode, getRndInteger } from 'src/shared/utils/utils';

export type ClassroomDocument = HydratedDocument<Classroom>;

@Schema({ collection: 'Classrooms', timestamps: true })
export class Classroom {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  className: string;

  @Prop({ default: '' })
  section: string;

  @Prop({ default: '' })
  subject: string;

  @Prop({ default: '' })
  room: string;

  @Prop({
    default: `/src/assets/gg${getRndInteger(1, 5)}.png`,
  })
  coverImage: string;

  @Prop({ required: true, unique: true, default: generateClassCode })
  classCode: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  teachers: User[];

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  students: User[];
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

export const ClassroomSchemaFactory = () => {
  const classroom_schema = ClassroomSchema;

  // validate hook mongoose insert/update
  // delete class

  return classroom_schema;
};
