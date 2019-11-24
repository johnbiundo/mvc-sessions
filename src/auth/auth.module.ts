import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {Issuer} from "openid-client";

import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./local.strategy";
import {SessionSerializer} from "./session.serializer";
import {AuthController} from "./auth.controller";
import {GoogleStrategy} from "./google.strategy";
import {FacebookStrategy} from "./facebook.strategy";
import {OneloginStrategy} from "./onelogin.strategy";
import {UserService} from "../user/user.service";


const OneloginStrategyFactory = {
  provide: "OneloginStrategy",
  useFactory: async (userService: UserService): Promise<OneloginStrategy> => {
    // secret sauce! build the dynamic client before injecting it into the strategy
    // for use in the constructor super call.
    const TrustIssuer = await Issuer.discover(
      `https://${process.env.ONELOGIN_SUBDOMAIN}.onelogin.com/oidc/.well-known/openid-configuration`,
    );
    const client = new TrustIssuer.Client({
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: process.env.ONELOGIN_CLIENT_ID,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_secret: process.env.ONELOGIN_CLIENT_SECRET,
      // eslint-disable-next-line @typescript-eslint/camelcase
      token_endpoint_auth_method: "client_secret_post",
    });
    return new OneloginStrategy(userService, client);
  },
  inject: [UserService],
};

@Module({
  imports: [UserModule, PassportModule],
  providers: [GoogleStrategy, FacebookStrategy, LocalStrategy, SessionSerializer, OneloginStrategyFactory],
  controllers: [AuthController],
})
export class AuthModule {}
