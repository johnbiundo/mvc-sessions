import { IsInt, IsString } from 'class-validator';
import { CatCreateFields } from '../interfaces/cat.interface';

export class CatCreateSchema implements CatCreateFields {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
