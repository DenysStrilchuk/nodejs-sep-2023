import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { IUser } from "./user.interface";

export interface IForgotDto extends Pick<IUser, "email"> {}

export interface IActionToken {
  id?: string;
  actionToken: string;
  tokenType: ActionTokenTypeEnum;
  _userId: string;
}
