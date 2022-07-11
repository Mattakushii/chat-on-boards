import { ChatService } from "../chat/chat.service";
import { AuthGuard } from "src/auth/auth.guard";
import { MessageService } from "./message.service";
import {
  Args,
  Context,
  Field,
  InputType,
  Mutation,
  Resolver,
  Subscription,
  Query,
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { User } from "src/user/user.model";
import { pubSub } from "src/shared/pubsub";
import {
  MessageDTO,
  PaginatedChatMessagesArgs,
  PaginatedMessages,
  SendMessageSubscription,
} from "./dto/message.inputs";
import { Message } from "./message.model";

@InputType()
export class SendMessageInput {
  @Field()
  text: string;

  @Field()
  room_id: number;
}

@Resolver()
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private chatService: ChatService,
  ) {}

  @Mutation(() => Message)
  @UseGuards(new AuthGuard())
  async sendMessage(
    @Args("messageData") messageData: SendMessageInput,
    @Context("user") user: User,
  ) {
    const { text, room_id } = messageData;
    const message = await this.messageService.sendMessage(user, text, room_id);

    pubSub.publish("messageSended", {
      messageSended: message,
    });

    return message;
  }

  @Query(() => PaginatedMessages)
  async getMessages(@Args() pagination: PaginatedChatMessagesArgs) {
    return this.messageService.getPaginatedMessages(pagination);
  }

  // подписки
  @Subscription(() => Message, {
    filter: (
      payload: { messageSended: Message },
      variables: { data: SendMessageSubscription },
      context: { user: User },
    ) =>
      variables.data.chat_id.includes(payload.messageSended.chat.id) &&
      context.user.id !== payload.messageSended.author.id,
  })
  messageSended(
    @Args("data") data: SendMessageSubscription,
    @Context("user") user: User,
  ) {
    return pubSub.asyncIterator("messageSended");
  }
}
