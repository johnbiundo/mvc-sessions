import {Test, TestingModule} from "@nestjs/testing";
import {AuthService} from "./auth.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {GoogleStrategy} from "./google.strategy";
import {LocalStrategy} from "./local.strategy";
import {SessionSerializer} from "./session.serializer";
import {UserEntity} from "../user/user.entity";
import ormconfig from "../ormconfig";


describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([UserEntity]), UserModule, PassportModule],
      providers: [AuthService, GoogleStrategy, LocalStrategy, SessionSerializer],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
