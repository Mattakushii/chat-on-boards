import { Status } from "./status.model";
import { Module } from "@nestjs/common";
import { StatusService } from "./status.service";
import { StatusResolver } from "./status.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusService, StatusResolver],
})
export class StatusModule {}
