import { StudentCourseSection, StudentCourseSortOption } from '../types/studentCourse';
import { getSeatsLeft, isSectionAvailable } from './studentCourseFormat';

type StudentCourseFilterInput = {
  sections: StudentCourseSection[];
  searchText: string;
  department: string;
  credits: string;
  day: string;
  onlyAvailable: boolean;
  onlySaved: boolean;
  savedIds: string[];
};

export function filterStudentCourses({
  sections,
  searchText,
  department,
  credits,
  day,
  onlyAvailable,
  onlySaved,
  savedIds,
}: StudentCourseFilterInput) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return sections.filter((section) => {
    const matchesSearch =
      !normalizedSearch ||
      section.courseCode.toLowerCase().includes(normalizedSearch) ||
      section.courseName.toLowerCase().includes(normalizedSearch) ||
      section.lecturerName.toLowerCase().includes(normalizedSearch);

    const matchesDepartment = department === 'all' || section.departmentName === department;
    const matchesCredits = credits === 'all' || section.credits === Number(credits);
    const matchesDay = day === 'all' || section.schedules.some((slot) => slot.dayOfWeek === Number(day));
    const matchesAvailability = !onlyAvailable || isSectionAvailable(section);
    const matchesSaved = !onlySaved || savedIds.includes(section.id);

    return matchesSearch && matchesDepartment && matchesCredits && matchesDay && matchesAvailability && matchesSaved;
  });
}

export function sortStudentCourses(sections: StudentCourseSection[], sortBy: StudentCourseSortOption) {
  if (sortBy === 'default') {
    return sections;
  }

  // Sao chép mảng trước khi sắp xếp để không làm đổi dữ liệu gốc.
  const sorted = [...sections];

  if (sortBy === 'name') {
    sorted.sort((a, b) => a.courseName.localeCompare(b.courseName, 'vi'));
  } else if (sortBy === 'seats') {
    sorted.sort((a, b) => getSeatsLeft(b) - getSeatsLeft(a));
  } else {
    sorted.sort((a, b) => b.credits - a.credits);
  }

  return sorted;
}
