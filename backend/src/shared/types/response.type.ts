export type getAllClassResponse<T> = {
  count: number;
  teaching_class: T[];
  erolled_class: T[];
  owner_class: T[];
};
