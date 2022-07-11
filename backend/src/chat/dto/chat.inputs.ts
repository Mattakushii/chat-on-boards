import { Message } from "./../../message/message.model";
import { InputType, Field, ObjectType } from "@nestjs/graphql";
import { Chat } from "../chat.model";
import { throws } from "assert";

@InputType()
export class CreateRoomInput {
  @Field()
  room_name: string;
}

@InputType()
export class InviteToRoomInput {
  @Field()
  roomId: number;

  @Field()
  userId: number;
}

@InputType()
export class RemoveUserInput {
  @Field()
  user_id: number;

  @Field()
  room_id: number;
}

@InputType()
export class GetRoomInput {
  @Field()
  id: number;
}

@ObjectType()
export class ChatDTO {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  admin: number;

  @Field({ nullable: true })
  lastMessage: Message;

  @Field(() => [String])
  bgColors: string[];

  constructor(chat: Chat) {
    this.id = chat.id;
    this.name = chat.name;
    this.admin = chat.admin.id;
    this.lastMessage = chat.lastMessage ?? null;
  }
}
