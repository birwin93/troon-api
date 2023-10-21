import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './schema/users/users.resolver';
import { UsersService } from './schema/users/users.service';
import { AuthModule } from './schema/auth/auth.module';
import { AuthResolver } from './schema/auth/auth.resolver';
import { DB } from './db/db.service';
import { UsersModule } from './schema/users/users.module';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    SchemaModule,
  ],
  controllers: [AppController],
  providers: [AppService, DB],
})
export class AppModule {}
