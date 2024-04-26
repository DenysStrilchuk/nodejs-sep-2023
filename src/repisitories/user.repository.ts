import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find({});
  }

  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getUserById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getUserByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async updateUserById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteUserById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
