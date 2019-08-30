import { Injectable } from '@nestjs/common';
import { Cat, CatCreateFields } from './interfaces/cat.interface';
import { CatsEntity } from './cats.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(data: CatCreateFields): CatsEntity {
    this.cats.push({ id: this.cats.length + 1, ...data });
    return this.cats[this.cats.length - 1];
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
