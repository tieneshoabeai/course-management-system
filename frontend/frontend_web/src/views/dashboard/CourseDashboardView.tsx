import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button } from '@mui/material';

import { CourseStats } from '../../components/course/CourseStats';
import { CourseTable } from '../../components/course/CourseTable';
import { CourseToolbar } from '../../components/course/CourseToolbar';
import { useCourseDashboard } from '../../hooks/course/useCourseDashboard';
import { userRoleOptions } from '../../types/role';

export function CourseDashboardView() {
  const dashboard = useCourseDashboard();

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow-text">Academic operations</p>
          <h2>Welcome back to 8LEARN</h2>
          <p>
            Dashboard tong quan cho sinh vien va nhan su nha truong: hoc phan, sinh vien, hoc vu,
            ke toan va quan tri he thong.
          </p>
        </div>
        <Button variant="contained" startIcon={<AddRoundedIcon />} disabled>
          New request
        </Button>
      </section>

      <section className="role-grid" aria-label="8LEARN roles">
        {userRoleOptions.map((role) => (
          <article className="role-card" key={role.value}>
            <span>{role.group}</span>
            <strong>{role.label}</strong>
            <small>{role.shortLabel}</small>
          </article>
        ))}
      </section>

      <CourseStats stats={dashboard.stats} />

      <section className="course-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow-text">Course catalog</p>
            <h3>Danh sach khoa hoc</h3>
          </div>
          <span>{dashboard.filteredCourses.length} ket qua</span>
        </div>

        <CourseToolbar
          searchText={dashboard.searchText}
          status={dashboard.status}
          semester={dashboard.semester}
          semesters={dashboard.semesters}
          onSearchTextChange={dashboard.setSearchText}
          onStatusChange={dashboard.setStatus}
          onSemesterChange={dashboard.setSemester}
        />

        <CourseTable courses={dashboard.filteredCourses} />
      </section>
    </div>
  );
}
