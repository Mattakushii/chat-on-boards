import { ArgsType, Int, Field } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  //FORWARD
  @Field(() => Int, { nullable: true })
  first: number;

  @Field(() => String, { nullable: true })
  after: string;

  //REVERSE
  @Field(() => Int, { nullable: true })
  last: number;

  @Field(() => String, { nullable: true })
  before: string;
}
