# Nest Authorization

## Intro

I used to code js for pretty long time, and was quite tired of doing same stuff over and over again. At some point I even thought server side js have faced some stagnation. An then someone, some where mentioned NestJS, one month later i tried it and felt in love. Unfortunately it looks like the documentation is not as great as framework itself, so I decided to write this article to contribute my 2 cents to popularization on this awesome framework

## Problem

Me and as appeared a lot of other users want to have an application which includes such features
 - Authorization with login/password
 - Authorization with social networks
 - Private/Public areas (controllers/routes)
 - Role based ACL
 - Persisted sessions
 
But unfortunately there were no good docs covering this part of framework. I mean there are, 2 pages in official documentation [Guards](https://docs.nestjs.com/guards), [Authentication](https://docs.nestjs.com/techniques/authentication), some outdated articles [1](https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722), [2](https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071), some random code on GH [TeamHive](https://github.com/TeamHive/nestjs-seed),  [artonio](https://github.com/artonio/nestjs-session-tutorial-finished), numerous closed issues [269](https://github.com/nestjs/nest/issues/269), [964](https://github.com/nestjs/nest/issues/964), [1247](https://github.com/nestjs/nest/issues/1247), [1365](https://github.com/nestjs/nest/issues/1365) => [99](https://github.com/nestjs/docs.nestjs.com/issues/99) and one [good article](https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4) from [@johnbiundo](https://github.com/johnbiundo) about local authorization. And all these links does not give you whole picture of how authorizations should be build

 ## Solution
 
 This example is a fully functional boilerplate with all features mentioned above. It also includes some very basic tests, typeorm, migrations and utils. However I just started coding with Nest so I dont know all best proctices, like for example I saw mentions of injectable configs for strategies or there is no use of `accessToken` and `refreshToken` because they are not really useful in this model. It would be cool if you leave a comment, link to interesting article or a piece of code, or made a RP to help me make this starter better

## Installation

I assume you have node, yarn/npm, postgres and configured google account

First of all you have to download dependencies
```bash
yarn run install
```

Then set google account keys
```bash
nano .env
```

And start the app
```bash
yarn run start
```
