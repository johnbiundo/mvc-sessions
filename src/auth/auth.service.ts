import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async validateLocal(
    email: string,
    password: string,
  ): Promise<UsersEntity | undefined> {
    return this.usersService.getByCredentials(email, password);
  }

  public async validateRemote(email: string): Promise<UsersEntity | undefined> {
    return this.usersService.findOne({ email });
  }
}
