import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, FindConditions} from "typeorm";
import {UserEntity} from "./user.entity";
import {createHash} from "crypto";

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

  private createPasswordHash(password: string, salt: string): string {
    return createHash("sha256")
      .update(password)
      .update(salt)
      .digest("hex");
  }
}
