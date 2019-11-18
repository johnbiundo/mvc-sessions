import {createHash} from "crypto";
import {Repository, FindConditions} from "typeorm";

import {Injectable, ConflictException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {UserEntity} from "./user.entity";
import {IUserCreateFields} from "./interfaces";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  public findOne(where: FindConditions<UserEntity>): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({where});
  }

  public findAndCount(): Promise<[UserEntity[], number]> {
    return this.userEntityRepository.findAndCount();
  }

  public async getByCredentials(email: string, password: string): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({
      where: {
        email,
        password: this.createPasswordHash(password, email),
      },
    });
  }

  public async create(data: IUserCreateFields): Promise<UserEntity> {
    let user = await this.findOne({email: data.email});

    if (user) {
      throw new ConflictException();
    }

    user = await this.userEntityRepository
      .create({
        ...data,
        password: this.createPasswordHash(data.password, data.email),
      })
      .save();

    delete user.password;

    return user;
  }

  private createPasswordHash(password: string, salt: string): string {
    return createHash("sha256")
      .update(password)
      .update(salt)
      .digest("hex");
  }
}
