import {ExecutionContext, Injectable, CanActivate} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class LocalGuard extends AuthGuard("local") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    return request.isAuthenticated();
  }
}
