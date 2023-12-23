import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/shared/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  dateOfBirth: Date;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  gender: string;

  @Prop()
  role: Role;

  @Prop({ type: mongoose.Schema.Types.Date, default: new Date() })
  createdDate: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: new Date() })
  updatedDate: Date;

  @Prop()
  resetToken: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  resetTokenExpirationDate: Date;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  about: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
