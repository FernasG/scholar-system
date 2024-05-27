import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTValidatePayload } from './authentication.interface';
import { CookieExtractor } from './cookie.extractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>('jwt_options.secret'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        CookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
    });
  }

  public async validate(payload: JWTValidatePayload) {
    return { id: payload.id, email: payload.email };
  }
}
