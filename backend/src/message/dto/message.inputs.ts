import { PaginationArgs } from "src/shared/pagination-args";
import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/paginated";
import { Message } from "../message.model";
import { User } from "src/user/user.model";

@InputType()
export class SendMessageSubscription {
  @Field(() => [Number])
  chat_id: number[];
}

@InputType()
export class GetMessagesInput {
  @Field(() => Int)
  chatId: number;
}

@ArgsType()
export class PaginatedChatMessagesArgs extends PaginationArgs {
  @Field(() => Int)
  chatId: number;
}

@ObjectType()
export class MessageDTO {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  date: Date;

  @Field()
  author: User;

  @Field()
  chatId: number;

  constructor(message: Message) {
    this.id = message.id;
    this.author = message.author;
    this.chatId = message.chat.id;
    this.date = message.date;
    this.text = message.text;
  }
}

@ObjectType()
export class MessageListDTO {
  @Field(() => Int)
  msgCount: number;

  @Field(() => [MessageDTO])
  messages: MessageDTO[];

  constructor(msgCount: number, messages: MessageDTO[]) {
    this.messages = messages;
    this.msgCount = msgCount;
  }
}

@ObjectType()
export class PaginatedMessages extends Paginated(Message) {}
