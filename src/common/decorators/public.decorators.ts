import { SetMetadata } from '@nestjs/common';

// tslint:disable-next-line:variable-name
export const Public = () => SetMetadata('isPublic', true);
