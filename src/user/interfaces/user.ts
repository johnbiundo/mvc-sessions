import {UserRole} from "./roles";


export interface IUser {
  id: number;
  email: string;
  password: string;
  roles: UserRole[];
}
