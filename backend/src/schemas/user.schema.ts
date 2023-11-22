import mongoose, { Date, HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  dateOfBirth: Date;

  @Prop()
  age: number;

  @Prop({ default: true })
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
}

export const UserSchema = SchemaFactory.createForClass(User);
