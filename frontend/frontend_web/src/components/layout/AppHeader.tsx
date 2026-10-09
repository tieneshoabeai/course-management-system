import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../app/constants/routes';
import { useAuth } from '../../hooks/auth/useAuth';
import { getRoleLabel } from '../../types/role';

export function AppHeader() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow-text">Course Management System</p>
        <h1>Quan ly khoa hoc</h1>
      </div>
      <div className="header-user">
        <div className="header-user-copy">
          <span>{user?.fullName}</span>
          <small>{user ? `${getRoleLabel(user.role)} - ${user.email}` : null}</small>
        </div>
        <Button variant="outlined" color="inherit" startIcon={<LogoutRoundedIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
