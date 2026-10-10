import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { queryClient } from '../configs/queryClient';
import { muiTheme } from '../configs/theme';
import { DashboardPage } from './pages/private/dashboard/page';
import { StudentCoursesPage } from './pages/private/student/courses/page';
import { LoginPage } from './pages/public/auth/login/page';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { ROUTES } from './constants/routes';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './layout';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES.root} element={<Navigate to={ROUTES.dashboard} replace />} />
              <Route element={<PublicOnlyRoute />}>
                <Route path={ROUTES.login} element={<LoginPage />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path={ROUTES.dashboard} element={<DashboardPage />} />
                  <Route path={ROUTES.studentCourses} element={<StudentCoursesPage />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
