import { User } from "src/user/user.model";
import { UseGuards } from "@nestjs/common";
import { Status } from "./status.model";
import { StatusService } from "./status.service";
import {
  Args,
  Context,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";

@InputType()
export class StatusData {
  @Field()
  room_id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}

@Resolver()
export class StatusResolver {
  constructor(private statusService: StatusService) {}

  @Mutation(() => Status)
  @UseGuards(new AuthGuard())
  async createStatus(
    @Args("statusData")
    statusData: StatusData,
    @Context("user") user: User,
  ) {
    return this.statusService.createStatus(
      statusData.room_id,
      statusData.name,
      statusData.description,
      user,
    );
  }
}
