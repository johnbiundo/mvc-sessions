import { User, UserRole } from './interfaces/user.interface';

export class UsersEntity implements User {

  constructor(data) {
    Object.assign(this, data);
  }

  public id: number;

  public username: string;

  public password: string;

  public roles: UserRole[];

}
