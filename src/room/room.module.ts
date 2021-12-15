import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomResolver } from "./room.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.model";
import { Room } from "./room.model";

@Module({
  imports: [TypeOrmModule.forFeature([Room, User])],
  providers: [RoomService, RoomResolver],
})
export class RoomModule {}
