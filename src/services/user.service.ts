import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repisitories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    await this.isEmailExist(dto.email);
    return await userRepository.createUser(dto);
  }

  public async getUserById(userId: string): Promise<IUser> {
    return await this.findUserOrThrow(userId);
  }

  public async updateUserById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    await this.findUserOrThrow(userId);
    return await userRepository.updateUserById(userId, dto);
  }

  public async deleteUserById(userId: string): Promise<void> {
    await this.findUserOrThrow(userId);
    return await userRepository.deleteUserById(userId);
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getUserByParams({ email });
    if (user) {
      throw new ApiError("email is alredy exist", 409);
    }
  }

  private async findUserOrThrow(userId: string): Promise<IUser> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiError("user  not found", 400);
    }
    return user;
  }
}

export const userService = new UserService();
