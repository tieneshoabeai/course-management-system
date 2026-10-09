import { AuthSession, LoginCredentials } from '../../types/auth';
import { mockAccounts } from './auth.mock';

const MOCK_DELAY_MS = 450;

function createMockJwt(userId: string) {
  return `mock.jwt.${userId}.${Date.now()}`;
}

export async function loginWithPassword(credentials: LoginCredentials): Promise<AuthSession> {
  await new Promise((resolve) => {
    window.setTimeout(resolve, MOCK_DELAY_MS);
  });

  const account = Object.values(mockAccounts).find(
    (item) => item.user.email === credentials.email.trim().toLowerCase(),
  );

  if (!account || account.password !== credentials.password) {
    throw new Error('Email hoac mat khau khong dung.');
  }

  return {
    accessToken: createMockJwt(account.user.id),
    user: account.user,
  };
}

