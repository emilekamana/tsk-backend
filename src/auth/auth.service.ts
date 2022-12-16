import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import RefreshToken from './entities/refreshToken.entity';
import { User } from '../user/entities/user.entity';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];

  constructor(private userService: UserService) {}

  async login(
    res: Response,
    email: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | Response> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return res.status(401).send(`User with email ${email} doesn't exist.`);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return this.newTokens(res, user, values);
    } else {
      return res.status(401).send('Password incorrect.');
    }
  }

  private async newTokens(
    res: Response,
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | Response> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
    });
    this.refreshTokens.push(refreshObject);

    return res.send({
      user: user,
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user.id,
        },
        process.env.ACCESS_SECRET as string,
        {
          expiresIn: '1h',
        },
      ),
    });
  }

  async logout(res: Response, refreshStr: string): Promise<Response> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return res.status(401).send('No token provided');
    }
    // delete refreshtoken from db
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id,
    );

    return res.status(200).send('Logged out');
  }

  private retrieveRefreshToken(refreshStr: string) {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET as string);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (error) {
      return undefined;
    }
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }

    const user = await this.userService.findOne(refreshToken.userId);
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, process.env.ACCESS_SECRET as string, {
      expiresIn: '1h',
    });
  }
}
