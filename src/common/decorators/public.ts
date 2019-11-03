import {SetMetadata} from "@nestjs/common";


export const Public = (): ((target: object, key?: any, descriptor?: any) => any) => SetMetadata("isPublic", true);
