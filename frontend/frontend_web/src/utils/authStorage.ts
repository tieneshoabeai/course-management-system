import { STORAGE_KEYS } from '../app/constants/storageKeys';
import { AuthSession } from '../types/auth';

export function loadAuthSession(): AuthSession | null {
  const rawSession = window.localStorage.getItem(STORAGE_KEYS.authSession);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    window.localStorage.removeItem(STORAGE_KEYS.authSession);
    return null;
  }
}

export function saveAuthSession(session: AuthSession) {
  window.localStorage.setItem(STORAGE_KEYS.authSession, JSON.stringify(session));
}

export function clearAuthSession() {
  window.localStorage.removeItem(STORAGE_KEYS.authSession);
}

