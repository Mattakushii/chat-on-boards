import { AuthGuard } from "../auth/auth.guard";
import {
  ChatDTO,
  CreateRoomInput,
  GetRoomInput,
  InviteToRoomInput,
} from "./dto/chat.inputs";
import { Chat } from "./chat.model";
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { UseGuards } from "@nestjs/common";
import { User } from "src/user/user.model";

const stringToColour = function (str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

const getColors = (text: string) => {
  const str = text.replace(/\s/g, "");
  const left = str.slice(0, Math.abs(str.length / 2));
  const right = str.slice(Math.abs(str.length / 2));

  return [stringToColour(left), stringToColour(right)];
};

@Resolver()
export class RoomResolver {
  constructor(private chatService: ChatService) {}

  @Mutation(() => Chat)
  @UseGuards(new AuthGuard())
  async createChat(
    @Args("roomProps") roomProps: CreateRoomInput,
    @Context("user") user: User,
  ) {
    return await this.chatService.createChat({
      admin: user,
      room_name: roomProps.room_name,
    });
  }

  @Query(() => [ChatDTO])
  @UseGuards(new AuthGuard())
  async getAllChats(@Context("user") user: User) {
    const data = await this.chatService.getChats(user.id);

    const chats = data.reduce((prev: ChatDTO[], curr) => {
      const colors = getColors(curr.name);

      return [...prev, { ...new ChatDTO(curr), bgColors: colors }];
    }, []);

    console.log(chats);

    return chats;
  }

  @Mutation(() => Chat)
  @UseGuards(new AuthGuard())
  async inviteToChat(@Args("inviteProps") inviteProps: InviteToRoomInput) {
    return await this.chatService.inviteToRoom({
      roomId: inviteProps.roomId,
      userId: inviteProps.userId,
    });
  }

  @Query(() => Chat)
  async getChat(@Args("chatId") data: GetRoomInput) {
    return await this.chatService.getChat(data.id);
  }

  // @Mutation(() => Chat)
  // @UseGuards(new AuthGuard())
  // async removeUser(
  //   @Args("removeProps") removeProps: RemoveUserInput,
  //   @Context("user") user: User,
  // ) {
  //   return await this.roomService.removeFromRoom({
  //     owner_id: user.id,
  //     user_id: removeProps.user_id,
  //     room_id: removeProps.room_id,
  //   });
  // }
}
