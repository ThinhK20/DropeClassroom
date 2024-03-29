import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';
import { User } from 'src/shared/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { GetUserDto, UpdateUserDto } from './dto';
import { UserResponse } from 'src/shared/types/response.type';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  sayHello(): string {
    return 'Hello user !';
  }

  async createNewUser(createUserDto: User): Promise<User> {
    console.log('SASD: ', createUserDto);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByQuery(query: object): Promise<User> {
    const user = await this.userModel.findOne(query);
    return user;
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
  async getAllUserNotIn(users: GetUserDto): Promise<User[]> {
    // const userIds = users.users.map((user) => user.userId._id);

    const res = this.userModel.find({
      _id: {
        $nin: [...users.users],
      },
    });

    return res;
  }

  // update user
  async _updateUser(
    user: User,
    updateDoc: UpdateUserDto,
  ): Promise<UserResponse> {
    const res = await this.userModel.findByIdAndUpdate(user._id, updateDoc, {
      new: true,
    });
    if (!res) throw new NotFoundException('User not found');

    return {
      _id: res._id,
      username: res.username,
      email: res.email,
      dateOfBirth: res.dateOfBirth,
      isActive: res.isActive,
      gender: res.gender,
      role: res.role,
      createdDate: res.createdDate,
      updatedDate: res.updatedDate,
      address: res.address,
      about: res.about,
    };
  }

  // inActive User
  async _inActiveUser(userId: string) {
    try {
      await this.userModel.findByIdAndUpdate(userId, { isActive: false });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Active User
  async _activeUser(userId: string) {
    try {
      await this.userModel.findByIdAndUpdate(userId, { isActive: true });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Get All user filter me
  async _getAllUser(ad: User): Promise<UserResponse[]> {
    const res = await this.userModel
      .find({ _id: { $ne: ad._id } })
      .select('-__v -password');
    if (!res) return [];
    return res;
  }

  // find user by id
  async _findUser(id: string): Promise<UserResponse> {
    const res = await this.userModel.findById(id);
    if (!res) throw new NotFoundException('user not found');

    return res;
  }

  // update use by admin
  async _updateUserByAdmin(
    id: string,
    updateDoc: UpdateUserDto,
  ): Promise<UserResponse> {
    const res = await this.userModel.findOneAndUpdate({ _id: id }, updateDoc, {
      new: true,
    });
    if (!res) throw new NotFoundException('User not found');

    return {
      _id: res._id,
      username: res.username,
      email: res.email,
      dateOfBirth: res.dateOfBirth,
      isActive: res.isActive,
      gender: res.gender,
      role: res.role,
      createdDate: res.createdDate,
      updatedDate: res.updatedDate,
      address: res.address,
      about: res.about,
    };
  }

  // delete user by id
  async _deleteUserByAdmin(id: string): Promise<UserResponse> {
    const res = this.userModel.findOneAndDelete({ _id: id });

    return res;
  }
}
