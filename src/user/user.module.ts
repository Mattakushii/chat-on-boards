import { UsersResolver } from "./user.resolver";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.model";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UserService],
})
export class UserModule {}
