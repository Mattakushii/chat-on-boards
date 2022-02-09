import { RoomService } from "./../room/room.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import {
  Args,
  Context,
  Field,
  InputType,
  Mutation,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { User } from "src/user/user.model";
import { pubSub } from "src/shared/pubsub";
import { SendMessageSubscription } from "./dto/message.inputs";

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
    private roomService: RoomService,
  ) {}

  @Mutation(() => Message)
  @UseGuards(new AuthGuard())
  async sendMessage(
    @Args("messageData") messageData: SendMessageInput,
    @Context("user") user: User,
  ) {
    const { text, room_id } = messageData;
    const message = await this.messageService.sendMessage({
      room_id,
      text,
      user,
    });

    pubSub.publish("messageSended", {
      messageSended: message,
    });
    return message;
  }

  // подписки
  @Subscription(() => Message, {
    filter: (
      payload: { messageSended: Message },
      variables: {
        data: {
          rooms: number[];
          user_id: number;
        };
      },
    ) => {
      return (
        variables.data.rooms.includes(payload.messageSended.room_id) &&
        payload.messageSended.author.id !== variables.data.user_id
      );
    },
  })
  messageSended(@Args("data") data: SendMessageSubscription) {
    return pubSub.asyncIterator("messageSended");
  }
}
