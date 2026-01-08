import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {} //constuctor burda ilk iccrani temin edir, this yazmaq yerine yaziriq

  canActivate(context: ExecutionContext): Promise<boolean> {
    let request: Request = context.switchToHttp().getRequest(); //headerdeki get reuqest emrine access edirik
    let token = request.headers.authorization || '';
    token = token.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      let payload = this.jwtService.verify(token);
      let user = await this.userService.findUserById(payload.userId); //token useridni goturuur login in edende, mende payload tokeni tutub deye , payloadin icinden gelen id-ni gonderirem arg kimi. ve useri tapiram
      if (!user) throw new Error(); //ne error olsa catch a saliriq deye burda error qaytaririq.

      request['user'] = payload;
    } catch (err: any) {
      throw new UnauthorizedException('unauthhorized');
    }
    return true;
  }
}
