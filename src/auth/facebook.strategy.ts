import {Strategy} from "passport-facebook";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "birthday", "email", "gender", "link", "name", "locale", "picture"],
    });
  }

  public async validate(_accessToken: string, _refreshToken: string, profile: any): Promise<UserEntity> {
    const user = await this.authService.validateRemote(profile.emails[0].value);
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
