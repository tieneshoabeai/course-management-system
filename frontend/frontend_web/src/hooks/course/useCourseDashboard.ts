import { useMemo, useState } from 'react';

import { getCourses } from '../../service/course/course.service';
import { CourseStatus } from '../../types/course';
import { filterCourses } from '../../utils/courseFilters';

export function useCourseDashboard() {
  const courses = useMemo(() => getCourses(), []);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState<CourseStatus | 'all'>('all');
  const [semester, setSemester] = useState('all');

  const semesters = useMemo(() => ['all', ...new Set(courses.map((course) => course.semester))], [courses]);

  const filteredCourses = useMemo(
    () =>
      filterCourses({
        courses,
        searchText,
        status,
        semester,
      }),
    [courses, searchText, semester, status],
  );

  const stats = useMemo(
    () => ({
      totalCourses: courses.length,
      activeCourses: courses.filter((course) => course.status === 'active').length,
      enrolledStudents: courses.reduce((total, course) => total + course.enrolledStudents, 0),
      pendingApprovals: courses.filter((course) => course.status === 'draft').length,
    }),
    [courses],
  );

  return {
    courses,
    filteredCourses,
    stats,
    searchText,
    setSearchText,
    status,
    setStatus,
    semester,
    setSemester,
    semesters,
  };
}

