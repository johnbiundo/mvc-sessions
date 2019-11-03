import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {UserRole} from "../../user/interfaces";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    return request.user.roles.some((role: UserRole) => !!roles.find(item => item === role));
  }
}
