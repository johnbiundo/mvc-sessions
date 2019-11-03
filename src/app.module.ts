import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import ormconfig from "./ormconfig";

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, UserModule],
})
export class AppModule {}
