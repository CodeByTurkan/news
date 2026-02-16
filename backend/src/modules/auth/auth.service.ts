import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entities';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async signin(params: AuthSignInDto) {
    const user = await this.userRepo.findOne({
      where: { username: params.username },
    });

    if (!user) {
      this.logger.warn(`Loggin Failed:User not found`, {
        username: params.username,
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    const checkPassword = await compare(params.password, user.password);
    if (!checkPassword) {
      this.logger.warn(`Loggin Failed:Invalid password`, {
        username: params.username,
      });
      throw new UnauthorizedException('Invalid credentials');
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
    const checkUserName = await this.userRepo.findOne({
      where: { username: params.username }, //username parampemtrlerden gelen username == olan
    });

    if (checkUserName)
      throw new ConflictException('Username is already exists');

    const hashedPassword = await hash(params.password, 10);

    const user = this.userRepo.create({
      ...params,
      password: hashedPassword,
    });

    await this.userRepo.save(user);

    const token = this.jwtService.sign({ userId: user.id });
    return {
      user: {
        ...user,
        password: undefined,
      },
      token,
    };
  }
}
