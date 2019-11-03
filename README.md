# Nest Authorization

This is a code sample for my article 


## Installation

I assume you have node, yarn/npm, postgres, redis and configured google/facebook account

First of all you have to download dependencies
```bash
npm i
```

Then check config in
```bash
nano .env
```

and start in watch mode
```bash
npm run start
```

or in production mode
```bash
npm run build
npm run start:prod
```

## Usage

You can log in to the application using trejgun@gmail.com/My5up3r5tr0ngP@55w0rd 
on http://localhost:3000/auth/login 

then navigate to http://localhost:3000/users/profile
