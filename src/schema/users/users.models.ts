import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLUUID } from '../scalars/uuid.scalar';
import { Prisma } from '.prisma/client';

@ObjectType()
export class User {
  @Field((type) => GraphQLUUID)
  id: string;

  @Field()
  username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}
