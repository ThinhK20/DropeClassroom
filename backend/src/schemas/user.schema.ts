import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: SchemaTypes.ObjectId })
  id: Types.ObjectId;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  dateOfBirth: Date;

  @Prop()
  age: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  gender: string;

  @Prop({ type: mongoose.Schema.Types.Date, default: new Date() })
  createdDate: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: new Date() })
  updatedDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
