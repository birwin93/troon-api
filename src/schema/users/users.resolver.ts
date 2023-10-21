import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.models';
import { GraphQLUUID } from '../scalars/uuid.scalar';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { DB } from 'src/db/db.service';

// @ts-ignore
@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private db: DB,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query((returns) => User)
  async user(@Args('id', { type: () => GraphQLUUID }) id: string) {
    let user = await this.db.user.findUnique({ where: { id } });
    return user?.toGraphql;
  }
}
