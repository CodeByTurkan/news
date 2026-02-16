import { User } from '../../entities/user.entities';

export interface AuthorizedUser extends Request {
  user: User;
}
