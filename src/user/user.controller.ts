import {Controller, Get} from "@nestjs/common";

import {UserEntity} from "./user.entity";
import {Roles, User} from "../common/decorators";
import {UserRole} from "./interfaces";
import {UserService} from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get("profile")
  getGloballyProtectedProfile(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Get("/list")
  @Roles(UserRole.Admin)
  public findAll(): Promise<{list: UserEntity[]; count: number}> {
    return this.usersService.findAndCount().then(([list, count]) => ({list, count}));
  }
}
