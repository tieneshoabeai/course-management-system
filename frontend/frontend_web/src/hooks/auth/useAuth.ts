import { useContext } from 'react';

import { AuthContext } from '../../app/context/auth.context';

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth phai duoc dung ben trong AuthProvider.');
  }

  return value;
}
