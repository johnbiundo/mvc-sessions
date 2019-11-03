import "./env";
// eslint-disable-next-line import/default
import session from "express-session";
// eslint-disable-next-line import/default
import passport from "passport";
import connectRedis from "connect-redis";
import * as redis from "redis";
import {NestFactory, Reflector} from "@nestjs/core";
import {NestExpressApplication} from "@nestjs/platform-express";

import {AppModule} from "./app.module";
import {LocalGuard, RolesGuard} from "./common/guards";


async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    // @ts-ignore
    session({
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        signed: false,
      },
      name: "nest",
      resave: false,
      secret: process.env.SESSION_SECRET_KEY,
      // @ts-ignore
      store: new (connectRedis(session))({client: redis.createClient(process.env.REDIS_URL)}),
      saveUninitialized: true,
    }),
  );

  // eslint-disable-next-line import/namespace
  app.use(passport.initialize());
  // eslint-disable-next-line import/namespace
  app.use(passport.session());

  const reflector = app.get(Reflector);
  void reflector;
  app.useGlobalGuards(new LocalGuard(reflector));
  app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(process.env.PORT, process.env.HOST, () => {
    // eslint-disable-next-line no-console
    console.info(`Express server is running on http://${process.env.HOST}:${process.env.PORT}/`);
  });
}

bootstrap();
