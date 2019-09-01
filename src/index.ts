import * as session from 'express-session';
import * as passport from 'passport';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthenticatedGuard, RolesGuard } from './common/guards';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthenticatedGuard(reflector));
  app.useGlobalGuards(new RolesGuard(reflector));

  const server = await app.listen(process.env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.info(`Express server listening on port ${server.address().port}`);
  });

  return server;
}

bootstrap();
