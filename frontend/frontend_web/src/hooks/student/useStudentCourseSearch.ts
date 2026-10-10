import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { getStudentCourseSections } from '../../service/student/studentCourse.service';
import { StudentCourseSortOption, StudentCourseViewMode } from '../../types/studentCourse';
import { filterStudentCourses, sortStudentCourses } from '../../utils/studentCourseFilters';
import { isAlmostFull, isSectionAvailable } from '../../utils/studentCourseFormat';

export function useStudentCourseSearch() {
  // useQuery: gọi service, tự quản lý trạng thái đang tải / lỗi / dữ liệu.
  const sectionsQuery = useQuery({
    queryKey: ['student', 'course-sections'],
    queryFn: getStudentCourseSections,
  });

  const [searchText, setSearchText] = useState('');
  const [department, setDepartment] = useState('all');
  const [credits, setCredits] = useState('all');
  const [day, setDay] = useState('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState<StudentCourseSortOption>('default');
  const [viewMode, setViewMode] = useState<StudentCourseViewMode>('grid');
  // Môn đã lưu (đánh dấu ★). Hiện chỉ lưu trong bộ nhớ, tải lại trang sẽ mất.
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const sections = useMemo(() => sectionsQuery.data ?? [], [sectionsQuery.data]);

  const departments = useMemo(
    () => ['all', ...new Set(sections.map((section) => section.departmentName))],
    [sections],
  );

  const creditOptions = useMemo(
    () => [...new Set(sections.map((section) => section.credits))].sort((a, b) => a - b),
    [sections],
  );

  const dayOptions = useMemo(
    () => [...new Set(sections.flatMap((section) => section.schedules.map((slot) => slot.dayOfWeek)))].sort((a, b) => a - b),
    [sections],
  );

  const filteredSections = useMemo(
    () =>
      sortStudentCourses(
        filterStudentCourses({ sections, searchText, department, credits, day, onlyAvailable, onlySaved, savedIds }),
        sortBy,
      ),
    [sections, searchText, department, credits, day, onlyAvailable, onlySaved, savedIds, sortBy],
  );

  // Số liệu tổng quan hiển thị ở hàng thẻ trên đầu trang.
  const stats = useMemo(
    () => ({
      totalSections: sections.length,
      availableSections: sections.filter(isSectionAvailable).length,
      almostFullSections: sections.filter(isAlmostFull).length,
      fullSections: sections.filter((section) => section.status === 'FULL').length,
    }),
    [sections],
  );

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedSectionId) ?? null,
    [sections, selectedSectionId],
  );

  const hasActiveFilters =
    searchText.trim() !== '' ||
    department !== 'all' ||
    credits !== 'all' ||
    day !== 'all' ||
    onlyAvailable ||
    onlySaved;

  function resetFilters() {
    setSearchText('');
    setDepartment('all');
    setCredits('all');
    setDay('all');
    setOnlyAvailable(false);
    setOnlySaved(false);
  }

  function toggleSaved(sectionId: string) {
    setSavedIds((current) =>
      current.includes(sectionId) ? current.filter((id) => id !== sectionId) : [...current, sectionId],
    );
  }

  function openDetail(sectionId: string) {
    setSelectedSectionId(sectionId);
    setDetailOpen(true);
  }

  return {
    isLoading: sectionsQuery.isLoading,
    isError: sectionsQuery.isError,
    refetch: sectionsQuery.refetch,
    semester: sections[0]?.semester ?? '',
    totalCount: sections.length,
    stats,
    filteredSections,
    departments,
    creditOptions,
    dayOptions,
    searchText,
    setSearchText,
    department,
    setDepartment,
    credits,
    setCredits,
    day,
    setDay,
    onlyAvailable,
    setOnlyAvailable,
    onlySaved,
    setOnlySaved,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    savedIds,
    toggleSaved,
    hasActiveFilters,
    resetFilters,
    selectedSection,
    detailOpen,
    openDetail,
    closeDetail: () => setDetailOpen(false),
  };
}
