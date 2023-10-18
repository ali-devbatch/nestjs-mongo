import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private configService: ConfigService, // Inject ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'), // Get JWT secret from environment variables
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.userModel.findById(id);
    // Omit the 'password' field from the user object so that the password should not be returned to user
    user.password = undefined;

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user;
  }
}
