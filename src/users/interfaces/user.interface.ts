import { UserRoles } from './user.roles';

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  roles: UserRoles[];
}
