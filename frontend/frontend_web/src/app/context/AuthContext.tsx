import { ReactNode, useMemo, useState } from 'react';

import { AuthSession } from '../../types/auth';
import { clearAuthSession, loadAuthSession, saveAuthSession } from '../../utils/authStorage';
import { AuthContext, AuthContextValue } from './auth.context';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(() => loadAuthSession());

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      accessToken: session?.accessToken ?? null,
      isAuthenticated: Boolean(session?.accessToken),
      login: (nextSession) => {
        saveAuthSession(nextSession);
        setSession(nextSession);
      },
      logout: () => {
        clearAuthSession();
        setSession(null);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
