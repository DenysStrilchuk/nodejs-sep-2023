import { configs } from "@typescript-eslint/eslint-plugin";
import * as jsonwebtoken from "jsonwebtoken";

import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { ITokenPair } from "../interfaces/token.interface";

class TokenService {
  public async generatePair(payload: IJWTPayload): Promise<ITokenPair> {
    const accessToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: configs.JWT_ACCESS_EXPIRES_IN },
    );

    const refreshToken = jsonwebtoken.sign(
      payload,
      configs.env.JWT_REFRESH_SECRET,
      { expiresIn: configs.JWT_REFRESH_EXPIRES_IN },
    );

    return {
      accessToken,
      accessExpiresIn: configs.JWT_ACCESS_EXPIRES_IN,
      refreshToken,
      refreshExpiresIn: configs.JWT_REFRESH_EXPIRES_IN,
    };
  }
}

export const tokenService = new TokenService();
