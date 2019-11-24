import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, Client, UserinfoResponse, TokenSet} from "openid-client";
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class OneloginStrategy extends PassportStrategy(Strategy, "onelogin") {
  client: Client;

  constructor(private readonly userService: UserService, client: Client) {
    super({
      client: client,
      params: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        redirect_uri: process.env.AUTH_ONELOGIN_REDIRECT_URI,
        scope: process.env.AUTH_ONELOGIN_SCOPE,
      },
      passReqToCallback: false,
      usePKCE: false,
    });

    this.client = client;
  }

  async validate(tokenset: TokenSet): Promise<UserEntity> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokenset);
    if (!userinfo.email) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne({email: userinfo.email});
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
