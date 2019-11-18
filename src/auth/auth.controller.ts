import {Request} from "express";
import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {promisify} from "util";

import {Public, User} from "../common/decorators";
import {IUserCreateFields} from "../user/interfaces";
import {FacebookGuard, GoogleGuard, LoginGuard} from "../common/guards";
import {UserEntity} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get("/login")
  public main(@User() user: UserEntity): string {
    return `
      <html>
         <script>
					function handleclick(el) {
            window.open(el.href, '_blank', 'height=600,width=800,top=0,left=0');
            return false
					}
				</script>
        <body>
          ${JSON.stringify(user)}
          <form action="/auth/login" method="post">
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="submit" />
          </form>
          <a href="/auth/google" onClick="return handleclick(this)">or login with google</a>
        </body>
      </html>
    `;
  }

  @Public()
  @UseGuards(LoginGuard)
  @Post("/login")
  public login(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Public()
  @Get("/logout")
  public logout(@Req() req: Request): void {
    req.logout();
  }

  @Public()
  @Get("/signup")
  public async signup(@Body() data: IUserCreateFields, @Req() req: Request): Promise<UserEntity> {
    const user = await this.userService.create(data);
    // @ts-ignore
    await promisify(req.logIn.bind(req))(user);
    return user;
  }

  @Public()
  @Get("/google")
  @UseGuards(GoogleGuard)
  googleLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Public()
  @Get("/google/callback")
  @UseGuards(GoogleGuard)
  googleLoginCallback(@User() user: UserEntity): string {
    return `
      <html>
      	<script>
					function handleLoad() {
					  alert(${JSON.stringify(user)});
						window.close();
					}
				</script>
        <body onload="handleLoad()" />
      </html>
    `;
  }

  @Public()
  @Get("/facebook")
  @UseGuards(FacebookGuard)
  facebookLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Public()
  @Get("/facebook/callback")
  @UseGuards(FacebookGuard)
  facebookLoginCallback(@User() user: UserEntity): string {
    return `
      <html>
      	<script>
					function handleLoad() {
					  alert(${JSON.stringify(user)});
						window.close();
					}
				</script>
        <body onload="handleLoad()" />
      </html>
    `;
  }
}
