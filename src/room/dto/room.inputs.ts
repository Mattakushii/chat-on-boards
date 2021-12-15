import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateRoomInput {
  @Field()
  owner_id: number;

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
