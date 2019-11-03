import {SetMetadata} from "@nestjs/common";


export const Roles = (...roles: Array<string>): ((target: object, key?: any, descriptor?: any) => any) =>
  SetMetadata("roles", [...roles]);
