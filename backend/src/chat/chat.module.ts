import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { RoomResolver } from "./chat.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.model";
import { Chat } from "./chat.model";

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User])],
  providers: [ChatService, RoomResolver],
})
export class ChatModule {}
