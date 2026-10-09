import { UserRole } from './role';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};

