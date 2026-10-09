import { createContext } from 'react';

import { AuthSession, AuthUser } from '../../types/auth';

export type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

