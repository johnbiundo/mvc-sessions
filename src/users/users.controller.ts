import { Response, Request } from 'express';
import { Controller, Get, Post, Res, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { LoginGuard } from '../common/guards/login.guard';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('/login')
  @UseGuards(LoginGuard)
  public login(@User() user: UsersEntity): UsersEntity {
    return user;
  }

  @Get('/logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    req.logout();
    res.redirect('/login');
  }

  @Get('/profile')
  @UseGuards(AuthenticatedGuard)
  public getProfile(@User() user: UsersEntity) {
    return user;
  }
}
