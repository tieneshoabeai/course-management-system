import { Outlet } from 'react-router-dom';

import { AppHeader } from '../components/layout/AppHeader';
import { AppSidebar } from '../components/layout/AppSidebar';

export function AppLayout() {
  return (
    <div className="app-shell">
      <AppSidebar />
      <div className="app-main-shell">
        <AppHeader />
        <main className="app-main" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

