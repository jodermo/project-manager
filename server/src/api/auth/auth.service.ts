import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
  }

  async createToken(id: number, login: string) {
    const expiresIn = 60 * 60;
    const secretOrKey = 'secret';
    const user = {login};
    const token = jwt.sign(user, secretOrKey, {expiresIn});

    return {expires_in: expiresIn, token};
  }

  async validateUser(signedUser): Promise<boolean> {
    if (signedUser && signedUser.login) {
       return  Boolean(this.userService.getUserByUsername(signedUser.username));
    }
    return false;
  }

}
