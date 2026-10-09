import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

const navigationItems = [
  { label: 'Dashboard', icon: DashboardRoundedIcon, active: true },
  { label: 'Courses', icon: MenuBookRoundedIcon, active: false },
  { label: 'Students', icon: GroupsRoundedIcon, active: false },
  { label: 'Lecturers', icon: SchoolRoundedIcon, active: false },
  { label: 'Student Affairs', icon: BadgeRoundedIcon, active: false },
  { label: 'Accounting', icon: PaymentsRoundedIcon, active: false },
  { label: 'Reports', icon: AssessmentRoundedIcon, active: false },
  { label: 'Settings', icon: SettingsRoundedIcon, active: false },
];

export function AppSidebar() {
  return (
    <aside className="app-sidebar" aria-label="Main navigation">
      <div className="brand-mark">
        <img className="brand-logo" src="/8learn-logo.webp" alt="8LEARN" />
        <div>
          <p className="brand-title">8LEARN</p>
          <p className="brand-subtitle">Education Portal</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={item.active ? 'sidebar-link sidebar-link-active' : 'sidebar-link'}
              type="button"
              disabled={!item.active}
            >
              <Icon fontSize="small" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
