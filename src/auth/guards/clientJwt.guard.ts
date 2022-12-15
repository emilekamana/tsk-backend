import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class ClientJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException();
    }

    if (user)
      if (user.type === 'WORKER') {
        throw new UnauthorizedException();
      }

    return super.handleRequest(err, user, info, context, status);
  }
}
