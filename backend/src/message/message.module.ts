import { ChatService } from "../chat/chat.service";
import { UserService } from "./../user/user.service";
import { User } from "./../user/user.model";
import { Chat } from "src/chat/chat.model";
import { Message } from "./message.model";
import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageResolver } from "./message.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, User])],
  providers: [MessageService, MessageResolver, UserService, ChatService],
})
export class MessageModule {}
