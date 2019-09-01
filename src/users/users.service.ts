import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { UsersEntity } from './users.entity';
import { createHash } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userEntityRepository: Repository<UsersEntity>,
  ) {}

  public findOne(
    where: FindConditions<UsersEntity>,
  ): Promise<UsersEntity | undefined> {
    return this.userEntityRepository.findOne({ where });
  }

  public findAndCount(): Promise<[UsersEntity[], number]> {
    return this.userEntityRepository.findAndCount();
  }

  public async getByCredentials(
    email: string,
    password: string,
  ): Promise<UsersEntity | undefined> {
    return this.userEntityRepository.findOne({
      where: {
        email,
        password: this.createPasswordHash(password, email),
      },
    });
  }

  private createPasswordHash(password: string, salt: string): string {
    return createHash('sha256')
      .update(password)
      .update(salt)
      .digest('hex');
  }
}
