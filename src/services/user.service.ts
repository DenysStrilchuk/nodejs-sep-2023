import { ApiError } from "../api-error";
import { userRepository } from "../repisitories/user.repository";
import { IUser } from "../user.interface";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    const { name, email, password } = dto;

    if (name.length > 15) {
      throw new ApiError("Name should not be longer than 15 characters", 400);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      throw new ApiError("Invalid email", 400);
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordPattern.test(password)) {
      throw new ApiError(
        "Password must consist of at least 6 characters and contain at least one number",
        400,
      );
    }
    return await userRepository.createUser(dto);
  }
  public async getUserById() {}

  public async updateUserById() {}
  public async deleteUserById() {}
}

export const userService = new UserService();
