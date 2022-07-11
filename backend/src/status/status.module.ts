import { Chat } from "src/chat/chat.model";
import { Status } from "./status.model";
import { Module } from "@nestjs/common";
import { StatusService } from "./status.service";
import { StatusResolver } from "./status.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Status, Chat])],
  providers: [StatusService, StatusResolver],
})
export class StatusModule {}
