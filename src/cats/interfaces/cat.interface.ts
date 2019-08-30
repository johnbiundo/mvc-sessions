export interface CatUpdateFields {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

// tslint:disable-next-line:no-empty-interface
export interface CatCreateFields extends CatUpdateFields {

}

export interface Cat extends CatCreateFields {
  readonly id: number;
}
