import { Injectable } from '@nestjs/common';
import { User } from './users.models';
import { DB } from 'src/db/db.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DB) {
    this.db = db;
  }

  async create(username: string, password: string): Promise<User> {
    let user = await this.db.user.create({
      data: {
        id: randomUUID(),
        username: username,
        password: password,
      },
    });

    return user.toGraphql;
  }
}
