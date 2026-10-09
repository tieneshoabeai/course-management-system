import { Course, CourseStatus } from '../types/course';

type CourseFilterInput = {
  courses: Course[];
  searchText: string;
  status: CourseStatus | 'all';
  semester: string;
};

export function filterCourses({ courses, searchText, status, semester }: CourseFilterInput) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesSearch =
      !normalizedSearch ||
      course.code.toLowerCase().includes(normalizedSearch) ||
      course.title.toLowerCase().includes(normalizedSearch) ||
      course.lecturerName.toLowerCase().includes(normalizedSearch);

    const matchesStatus = status === 'all' || course.status === status;
    const matchesSemester = semester === 'all' || course.semester === semester;

    return matchesSearch && matchesStatus && matchesSemester;
  });
}

