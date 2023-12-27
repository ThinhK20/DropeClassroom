export interface User {
  _id: string;
  username: string;
  email: string;
  dateOfBirth?: string;
  isActive: boolean;
  gender: string;
  role: string;
  avatar?: string;
  createdDate: string;
  updatedDate: string;
  about?: string;
  address?: string;
}

export interface SignUpUser {
  username?: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
  isActive?: boolean;
  gender?: string;
  role?: string;
}

export interface UpdateUserInfoDto {
  username: string;
  about: string;
  address: string;
  gender: string;
  dateOfBirth: Date;
}

export interface UserResponse {
  _id: string;

  username: string;

  email: string;

  dateOfBirth: string | null;

  isActive: boolean;

  gender: string;

  role: string;

  // createdAt: string;

  // updatedAt: string;

  address: string;

  about: string;
}
