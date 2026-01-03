import { User } from '../../entities/user.entities';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from './dto/auth-signin.dto';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signin(params: AuthSignInDto): Promise<{
        user: {
            password: undefined;
            id: number;
            username: string;
            email: string;
        };
        token: string;
    }>;
    register(params: AuthRegisterDto): Promise<void>;
}
