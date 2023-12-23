import mongoose from 'mongoose';
import { ROLE_CLASS, Role } from '../enums';

export type getAllClassResponse<T> = {
  count: number;
  teaching_class: T[];
  erolled_class: T[];
  owner_class: T[];
};

export type userClassResponse<T> = {
  role: ROLE_CLASS;
  classId: T;
};

export type UserResponse = {
  _id: string;

  username: string;

  email: string;

  dateOfBirth: mongoose.Schema.Types.Date;

  isActive: boolean;

  gender: string;

  role: Role;

  createdDate: mongoose.Schema.Types.Date;

  updatedDate: mongoose.Schema.Types.Date;

  address: string;

  about: string;
};
