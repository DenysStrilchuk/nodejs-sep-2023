import { ApiError } from "../errors/api-error";
import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { IToken, ITokenResponse } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repisitories/token.repository";
import { userRepository } from "../repisitories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenResponse }> {
    await this.isEmailExist(dto.email);
    const hashedPassword = await passwordService.hashPassword(dto.password);
    const user = await userRepository.createUser({
      ...dto,
      password: hashedPassword,
    });
    const tokens = tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });

    await tokenRepository.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _userId: user._id,
    });
    return { user, tokens };
  }

  public async signIn(dto: {
    email: string;
    password: string;
  }): Promise<{ user: IUser; tokens: ITokenResponse }> {
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
    const tokens = tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });

    await tokenRepository.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _userId: user._id,
    });
    await emailService.sendMail(dto.email);
    return { user, tokens };
  }

  public async refresh(
    jwtPayload: IJWTPayload,
    oldPair: IToken,
  ): Promise<ITokenResponse> {
    const newPair = tokenService.generatePair({
      userId: jwtPayload.userId,
      role: jwtPayload.role,
    });

    await tokenRepository.deleteById(oldPair._id);
    await tokenRepository.create({
      ...newPair,
      _userId: jwtPayload.userId,
    });
    return newPair;
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getUserByParams({ email });
    if (user) {
      throw new ApiError("email is alredy exist", 409);
    }
  }
}

export const authService = new AuthService();
