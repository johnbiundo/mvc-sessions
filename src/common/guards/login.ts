import {ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class LoginGuard extends AuthGuard("local") {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
