import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(
    user: UsersEntity,
    done: (err: Error | null, user: number) => void,
  ): void {
    done(null, user.id);
  }

  deserializeUser(
    id: number,
    done: (err: Error | null, payload?: UsersEntity) => void,
  ): void {
    this.userService
      .findOne({ id })
      .then(user => done(null, user))
      .catch(error => done(error));
  }
}
