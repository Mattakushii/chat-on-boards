import { AuthGuard } from "./../auth/auth.guard";
import {
  CreateRoomInput,
  GetRoomInput,
  InviteToRoomInput,
  RemoveUserInput,
} from "./dto/room.inputs";
import { Room } from "./room.model";
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { RoomService } from "./room.service";
import { UseGuards } from "@nestjs/common";
import { User } from "src/user/user.model";

@Resolver()
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Mutation(() => Room)
  @UseGuards(new AuthGuard())
  async createChat(
    @Args("roomProps") roomProps: CreateRoomInput,
    @Context("user") user: User,
  ) {
    return await this.roomService.createChat({
      owner_id: user.id,
      room_name: roomProps.room_name,
    });
  }

  @Mutation(() => Room)
  @UseGuards(new AuthGuard())
  async inviteToRoom(
    @Args("inviteProps") inviteProps: InviteToRoomInput,
    @Context("user") user: User,
  ) {
    return await this.roomService.inviteToRoom({
      room_owner: user.id,
      roomId: inviteProps.roomId,
      userId: inviteProps.userId,
    });
  }

  @Mutation(() => Room)
  @UseGuards(new AuthGuard())
  async removeUser(
    @Args("removeProps") removeProps: RemoveUserInput,
    @Context("user") user: User,
  ) {
    return await this.roomService.removeFromRoom({
      owner_id: user.id,
      user_id: removeProps.user_id,
      room_id: removeProps.room_id,
    });
  }

  @Query(() => Room)
  async getRoomById(@Args("id") id: GetRoomInput) {
    return await this.roomService.getRoomById(id);
  }
}
