import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstants } from './auth.constants';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './auth.strategy';
import { DB } from 'src/db/db.service';
import { UsersModule } from '../users/users.module';
import { UsersResolver } from '../users/users.resolver';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AuthConstants.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, DB, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
