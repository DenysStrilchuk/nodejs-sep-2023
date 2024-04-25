import { ApiError } from "../api-error";
import { userRepository } from "../repisitories/user.repository";
import { IUser } from "../user.interface";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.createUser(dto);
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }

  public async updateUserById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await userRepository.updateUserById(userId, dto);
  }

  public async deleteUserById(userId: string): Promise<void> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return await userRepository.deleteUserById(userId);
  }
}

export const userService = new UserService();
