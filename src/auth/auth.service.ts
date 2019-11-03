import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  public async validateLocal(email: string, password: string): Promise<UserEntity | undefined> {
    return this.usersService.getByCredentials(email, password);
  }

  public async validateRemote(email: string): Promise<UserEntity | undefined> {
    return this.usersService.findOne({email});
  }
}
