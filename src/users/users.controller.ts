import { Request, Response } from 'express';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { AuthenticatedGuard, LoginGuard } from '../common/guards';
import { Public, User, Roles } from '../common/decorators';
import { UserRoles } from './interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('/login')
  public main(@User() user: UsersEntity): string {
    return `
      <html>
         <script>
					function handleclick(el) {
            window.open(el.href, '_blank', 'height=600,width=800,top=0,left=0');
            return false
					}
				</script>
        <body>
          <form action="/users/login" method="post">
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
  @Post('/login')
  @UseGuards(LoginGuard)
  public login(@User() user: UsersEntity): UsersEntity {
    return user;
  }

  @Get('/logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    req.logout();
  }

  @Get('/profile')
  @UseGuards(AuthenticatedGuard)
  public getProfile(@User() user: UsersEntity) {
    return user;
  }

  @Get('/list')
  @Roles(UserRoles.Admin)
  public findAll(): Promise<{ list: UsersEntity[]; count: number }> {
    return this.usersService.findAndCount().then(([list, count]) => ({ list, count }));
  }
}
