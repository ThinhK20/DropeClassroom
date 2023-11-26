export interface User {
   _id: string;
   username: string;
   email: string;
   dateOfBirth?: Date;
   isActive: boolean;
   gender: string;
   role: string;
   avatar?: string;
   createdDate: string;
   updatedDate: string;
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
