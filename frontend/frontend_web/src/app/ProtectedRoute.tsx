import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import { useAuth } from '../hooks/auth/useAuth';

export function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
