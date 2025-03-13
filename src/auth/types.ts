import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/models/users.model';

export type AuthUserData = Pick<User, 'id' | 'email' | 'username' | 'roles'> & {
	iat: number;
	exp: number;
};

export interface AuthRequest extends Request {
	user?: AuthUserData;
}
