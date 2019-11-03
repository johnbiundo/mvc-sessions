import {PassportSerializer} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: UserEntity, done: (err: Error | null, user: number) => void): void {
    done(null, user.id);
  }

  deserializeUser(id: number, done: (err: Error | null, payload?: UserEntity) => void): void {
    this.userService
      .findOne({id})
      .then(user => done(null, user))
      .catch(error => done(error));
  }
}
