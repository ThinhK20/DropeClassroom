import { ROLE_CLASS } from '../enums';

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
