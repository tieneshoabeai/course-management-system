import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

import { CourseDashboardStats } from '../../types/course';

type CourseStatsProps = {
  stats: CourseDashboardStats;
};

export function CourseStats({ stats }: CourseStatsProps) {
  const items = [
    {
      label: 'Courses',
      value: stats.totalCourses,
      icon: AutoStoriesRoundedIcon,
    },
    {
      label: 'Active classes',
      value: stats.activeCourses,
      icon: VerifiedRoundedIcon,
    },
    {
      label: 'Students joined',
      value: stats.enrolledStudents,
      icon: GroupsRoundedIcon,
    },
    {
      label: 'New requests',
      value: stats.pendingApprovals,
      icon: PendingActionsRoundedIcon,
    },
  ];

  return (
    <section className="stats-grid" aria-label="Course statistics">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article className="stat-card" key={item.label}>
            <div className="stat-icon">
              <Icon fontSize="small" />
            </div>
            <p>{item.label}</p>
            <strong>{item.value.toLocaleString('vi-VN')}</strong>
          </article>
        );
      })}
    </section>
  );
}
