import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SendMessageSubscription {
  @Field(() => [Number])
  rooms: number[];
  @Field(() => Number)
  user_id: number;
}
