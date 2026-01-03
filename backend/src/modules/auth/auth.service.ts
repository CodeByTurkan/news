import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entities';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signin(params: AuthSignInDto) {
    const user = await this.userRepo.findOne({
      where: { username: params.username },
    });
    if (!user) {
      throw new UnauthorizedException('User is wrong');
    }

    const checkPassword = await compare(params.password, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException('Password is wrong');
    }

    const token = this.jwtService.sign({ userId: user.id });
    return {
      user: {
        ...user,
        password: undefined,
      },
      token,
    };
  }

  // sene parampertler gelelcek hansiki bu validation tipde olacaq, dtodan gelen
  async register(params: AuthRegisterDto) {
    const checkUserName = await this.userRepo.exists({
      where: { username: params.username }, //username parampemtrlerden gelen username == olan
    });

    if (checkUserName)
      throw new ConflictException('Username is alreadt exists');

    const user = this.userRepo.create(params as any);

    await this.userRepo.save(user);
  }
}
