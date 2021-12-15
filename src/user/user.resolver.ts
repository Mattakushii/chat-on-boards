import { AuthGuard } from "./../auth/auth.guard";
import { SignInInput, SignUpInput } from "./dto/user.inputs";
import { UserService } from "./user.service";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.model";
import { UseGuards } from "@nestjs/common";

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(new AuthGuard())
  async me(@Context("user") user: User): Promise<User> {
    return user;
  }

  @Mutation(() => String)
  async signUp(@Args("authData") signUpInput: SignUpInput) {
    const user = await this.userService.createUser(signUpInput);
    return this.userService.createToken(user);
  }

  @Mutation(() => String)
  async login(@Args("authData") signInInput: SignInInput) {
    const user = await this.userService.login(signInInput);
    return this.userService.createToken(user);
  }
}
