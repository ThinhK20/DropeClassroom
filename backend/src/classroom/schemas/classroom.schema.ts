import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { User } from 'src/shared/schemas/user.schema';
import { generateClassCode, getRndInteger } from 'src/shared/utils/utils';
import { UserClassroomDocument } from 'src/user-classroom/schemas/user-classroom.schema';

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

  @Prop({ required: true, default: true })
  isActive: boolean;

  // asignment

  // notification
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

export const ClassroomSchemaFactory = (
  user_classroom_model: Model<UserClassroomDocument>,
) => {
  const classroom_schema = ClassroomSchema;

  // validate hook mongoose insert/update
  classroom_schema.post('save', async function (doc: ClassroomDocument) {
    try {
      await user_classroom_model.create({
        classId: doc._id,
        userId: doc.owner._id,
        role: 'owner',
      });
    } catch (err) {
      console.error('Error creating user_classroom entry:', err);
    }
  });

  // delete class
  classroom_schema.pre('findOneAndDelete', async function (next) {
    const classroom = await this.model.findOne(this.getFilter());
    await Promise.all([
      user_classroom_model.deleteMany({ classId: classroom._id }),
    ]);

    return next();
  });

  return classroom_schema;
};
