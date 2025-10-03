/* eslint-disable prettier/prettier */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'token' in req.cookies) {
        return req.cookies.token;
    }
    return null
  }

  async validate(payload: {id: string, email: string}) {
    return payload
  }
}
