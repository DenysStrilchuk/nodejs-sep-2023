import { IUser } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

export class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find({ isDeleted: false });
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

  public async findWithOutActivityAfter(date: Date): Promise<IUser[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
            { $match: { createdAt: { $gt: date } } },
          ],
          as: "tokens",
        },
      },
      {
        $match: { tokens: { size: 0 } },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          name: 1,
        },
      },
    ]);
  }
}

export const userRepository = new UserRepository();
