import { Controller, Get, UseGuards } from '@nestjs/common';
import { Public, User } from '../common/decorators';
import { GoogleGuard } from '../common/guards';
import { UsersEntity } from '../users/users.entity';

@Controller('auth')
export class AuthController {

  @Public()
  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleLoginCallback(@User() user: UsersEntity) {
    return `
      <html>
      	<script>
					function handleLoad() {
					  alert(${JSON.stringify(user)})
						window.close();
					}
				</script>
        <body onload="handleLoad()" />
      </html>
    `;
  }
}
