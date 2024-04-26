import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  password: string;
  role: RoleEnum;
  isDeleted: boolean;
  isVerified: boolean;
}
