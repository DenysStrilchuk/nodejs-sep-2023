import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repisitories/user.repository";
import { passwordService } from "./password.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    await this.isEmailExist(dto.email);
    const hashedPassword = await passwordService.hashPassword(dto.password);
    return await userRepository.createUser({
      ...dto,
      password: hashedPassword,
    });
  }

  public async signIn(dto: {
    email: string;
    password: string;
  }): Promise<IUser> {
    const user = await userRepository.getUserByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Wrong email or password", 401);
    }
    const isCompare = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isCompare) {
      throw new ApiError("Wrong email or password", 401);
    }
    return user;
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getUserByParams({ email });
    if (user) {
      throw new ApiError("email is alredy exist", 409);
    }
  }
}

export const authService = new AuthService();
