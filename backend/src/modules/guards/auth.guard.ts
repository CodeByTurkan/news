// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { UserService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthGuards implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private userService: UserService,
//   ) {} //constuctor burda ilk iccrani temin edir, this yazmaq yerine yaziriq

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     let request: Request = context.switchToHttp().getRequest(); //headerdeki get reuqest emrine access edirik
//     let token = request.headers.authorization || '';
//     token = token.split(' ')[1];

//     if (!token) {
//       throw new UnauthorizedException('Unauthorized');
//     }
//   }
// }
