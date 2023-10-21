import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { User } from 'src/schema/users/users.models';

function extendPrismaClient() {
  return new PrismaClient().$extends({
    result: {
      user: {
        toGraphql: {
          compute(user) {
            return new User(user.id, user.username);
          },
        },
      },
    },
  });
}

// https://github.com/prisma/prisma/issues/18628
const ExtendedPrismaClient = class {
  constructor() {
    return extendPrismaClient();
  }
} as new () => ReturnType<typeof extendPrismaClient>;

@Injectable()
export class DB extends ExtendedPrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('connect db');
    await this.$connect();
  }
}
