import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    list(): Promise<import("../../entities/user.entities").User[]>;
}
