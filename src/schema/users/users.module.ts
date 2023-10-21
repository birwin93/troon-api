import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { DB } from 'src/db/db.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [],
  providers: [UsersService, DB, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
