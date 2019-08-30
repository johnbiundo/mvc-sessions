import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { UserRole } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: UsersEntity[];

  constructor() {
    this.users = [
      new UsersEntity({
        id: 1,
        username: 'john',
        password: 'changeme',
        roles: [UserRole.Admin],
      }),
      new UsersEntity({
        id: 2,
        username: 'chris',
        password: 'secret',
        roles: [UserRole.User],
      }),
      new UsersEntity({
        id: 3,
        username: 'maria',
        password: 'guess',
        roles: [UserRole.User],
      }),
    ];
  }

  async findOne(username: string): Promise<UsersEntity> {
    return this.users.find(user => user.username === username);
  }
}
