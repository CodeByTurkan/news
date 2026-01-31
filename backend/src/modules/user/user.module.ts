import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entities';
import { AuthGuards } from '../guards/auth.guard';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthGuards],
  exports: [UserService], // Export UserService so other modules can use it
})
export class UserModule {}

// ethical hacking of my software.
