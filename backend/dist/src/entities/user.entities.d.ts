import { BaseEntity } from 'typeorm';
import { UserEnums } from '../shared/enums/user.types';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: UserEnums;
}
