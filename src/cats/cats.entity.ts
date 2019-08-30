import { Cat } from './interfaces/cat.interface';

export class CatsEntity implements Cat {

  constructor(data) {
    Object.assign(this, data);
  }

  public id: number;

  public name: string;

  public age: number;

  public breed: string;

}
