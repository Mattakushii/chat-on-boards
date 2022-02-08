import { RoomService } from "./../room/room.service";
import { UserService } from "./../user/user.service";
import { User } from "./../user/user.model";
import { Room } from "src/room/room.model";
import { Message } from "./message.model";
import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageResolver } from "./message.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Room, User])],
  providers: [MessageService, MessageResolver, UserService, RoomService],
})
export class MessageModule {}
