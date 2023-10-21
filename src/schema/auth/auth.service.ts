import { Injectable } from '@nestjs/common';
import { User } from '../users/users.models';
import { JwtService } from '@nestjs/jwt';
import { DB } from 'src/db/db.service';

@Injectable()
export class AuthService {
  constructor(
    private db: DB,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    let user = await this.db.user.findFirst({ where: { username: username } });
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  }

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
