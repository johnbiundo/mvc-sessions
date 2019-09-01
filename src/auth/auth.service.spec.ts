import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { UsersEntity } from '../users/users.entity';
import * as ormconfig from '../ormconfig';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([UsersEntity]), UsersModule, PassportModule],
      providers: [AuthService, GoogleStrategy, LocalStrategy, SessionSerializer],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
