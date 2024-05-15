import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async getUserById(userId: string): Promise<IUser> {
    return await this.findUserOrThrow(userId);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await this.findUserOrThrow(userId);
  }

  public async updateMe(userId: string, dto: Partial<IUser>): Promise<IUser> {
    await this.findUserOrThrow(userId);
    return await userRepository.updateUserById(userId, dto);
  }

  public async deleteMe(userId: string): Promise<void> {
    await this.findUserOrThrow(userId);
    await userRepository.updateUserById(userId, { isDeleted: true });
  }

  public async uploadAvatar(
    userId: string,
    avatar: UploadedFile,
  ): Promise<IUser> {
    const user = await this.findUserOrThrow(userId);
    const filePath = await s3Service.uploadFile(
      avatar,
      FileItemTypeEnum.USER,
      user._id,
    );
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return await userRepository.updateUserById(userId, { avatar: filePath });
  }

  public async deleteAvatar(userId: string): Promise<IUser> {
    const user = await this.findUserOrThrow(userId);
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return await userRepository.updateUserById(userId, { avatar: null });
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
