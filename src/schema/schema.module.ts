import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersResolver } from './users/users.resolver';

@Module({
  imports: [AuthModule, UsersModule],
})
export class SchemaModule {}
