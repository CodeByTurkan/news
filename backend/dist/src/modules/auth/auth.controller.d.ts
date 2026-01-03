import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(signInDto: AuthSignInDto): Promise<{
        user: {
            password: undefined;
            id: number;
            username: string;
            email: string;
        };
        token: string;
    }>;
    register(body: AuthRegisterDto): Promise<void>;
}
