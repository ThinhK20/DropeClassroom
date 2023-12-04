import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';
import { User } from 'src/shared/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  sayHello(): string {
    return 'Hello user !';
  }

  async createNewUser(createUserDto: User): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByQuery(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async updateUser(user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(user._id, user);
  }

  async updatePasswordById(userId: string, newPassword: string): Promise<User> {
    const saltOrRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
    return this.userModel.findByIdAndUpdate(userId, {
      password: newHashedPassword,
    });
  }

  async saveResetToken(
    userId: string,
    resetToken: string,
    expirationDate: Date,
  ): Promise<void> {
    const user = await this.userModel.findOne({ id: userId });
    if (user) {
      await this.userModel.findByIdAndUpdate(userId, {
        resetToken,
        resetTokenExpirationDate: expirationDate,
      });
    }
  }

  async resetRenewToken(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      resetToken: '',
      resetTokenExpirationDate: null,
    } as User);
  }

  async activeUser(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { isActive: true } as User);
  }

  // valid user objectId
}
