import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entities';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // sene parampertler gelelcek hansiki bu validation tipde olacaq, dtodan gelen
  async register(params: AuthRegisterDto) {
    const checkUserName = await this.userRepo.exists({
      where: { username: params.username }, //username parampemtrlerden gelen username == olan
    });

    if (checkUserName)
      throw new ConflictException('Username is alreadt exists');

    const user = this.userRepo.create(params);

    // await this.userRepo.save(user)
    await user.save();
  }
}
