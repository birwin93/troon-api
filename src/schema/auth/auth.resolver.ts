import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './auth.models';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.models';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Mutation((returns) => LoginResponse, { nullable: true })
  async login(@Args('input') input: LoginInput) {
    let user = await this.authService.validateUser(
      input.username,
      input.password,
    );

    if (user) {
      let token = await this.authService.generateToken(user);
      return new LoginResponse(token);
    } else {
      return null;
    }
  }

  @Mutation((returns) => User)
  async createUser(@Args('input') input: CreateUserInput) {
    let user = await this.userService.create(input.username, input.password);
    return user;
  }
}
