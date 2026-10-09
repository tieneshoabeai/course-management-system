import { ROUTES } from '../constants/routes';

export const publicPageRoutes = [
  {
    path: ROUTES.login,
    label: 'Login',
  },
] as const;

export const privatePageRoutes = [
  {
    path: ROUTES.dashboard,
    label: 'Dashboard',
  },
] as const;

