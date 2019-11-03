import {UserRole} from "./user.roles";


export interface IUser {
  id: number;
  email: string;
  password: string;
  roles: UserRole[];
}
