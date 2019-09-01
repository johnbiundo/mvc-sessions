import { Request } from 'express';
import { createParamDecorator } from '@nestjs/common';

// tslint:disable-next-line:variable-name
export const User = createParamDecorator((data: any, req: Request) => req.user);
