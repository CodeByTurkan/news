import { User } from '../../entities/user.entities';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    list(): Promise<User[]>;
}
