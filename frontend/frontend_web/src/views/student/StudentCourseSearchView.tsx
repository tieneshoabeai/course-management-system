import { Button, Fade, Skeleton } from '@mui/material';

import { StudentCourseCard } from '../../components/student/StudentCourseCard';
import { StudentCourseDetailDrawer } from '../../components/student/StudentCourseDetailDrawer';
import { StudentCourseHero } from '../../components/student/StudentCourseHero';
import { StudentCourseRow } from '../../components/student/StudentCourseRow';
import { StudentCourseStats } from '../../components/student/StudentCourseStats';
import { StudentCourseToolbar } from '../../components/student/StudentCourseToolbar';
import { useAuth } from '../../hooks/auth/useAuth';
import { useStudentCourseSearch } from '../../hooks/student/useStudentCourseSearch';

export function StudentCourseSearchView() {
  const { user } = useAuth();
  const search = useStudentCourseSearch();
  const showList = !search.isLoading && !search.isError;
  const isGrid = search.viewMode === 'grid';

  return (
    <div className="dashboard-page">
      <StudentCourseHero
        studentName={user?.fullName}
        semester={search.semester}
        sectionCount={search.totalCount}
        departmentCount={Math.max(search.departments.length - 1, 0)}
      />

      {showList && <StudentCourseStats {...search.stats} />}

      <section className="course-section" aria-label="Danh sách môn học">
        <StudentCourseToolbar search={search} />

        <div className="section-heading">
          <h3 className="m-0 text-lg font-extrabold">Lớp học phần</h3>
          {showList && (
            <span>
              {search.filteredSections.length}/{search.totalCount} lớp
            </span>
          )}
        </div>

        {search.isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" role="status">
            <span className="sr-only">Đang tải danh sách môn học...</span>
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} variant="rounded" height={340} sx={{ borderRadius: '1.5rem' }} />
            ))}
          </div>
        )}

        {search.isError && (
          <div className="empty-state" role="alert">
            <h2>Không tải được dữ liệu</h2>
            <p>Đã có lỗi khi lấy danh sách môn học. Vui lòng thử lại.</p>
            <Button variant="contained" onClick={() => search.refetch()}>
              Thử lại
            </Button>
          </div>
        )}

        {showList && search.filteredSections.length === 0 && (
          <div className="empty-state">
            <h2>Không tìm thấy môn học</h2>
            <p>
              {search.onlySaved && search.savedIds.length === 0
                ? 'Bạn chưa lưu môn nào. Bấm biểu tượng đánh dấu trên thẻ môn học để lưu lại.'
                : 'Thử đổi từ khóa tìm kiếm hoặc bỏ bớt bộ lọc để xem lại danh sách.'}
            </p>
            {search.hasActiveFilters && (
              <Button variant="outlined" onClick={search.resetFilters}>
                Xóa bộ lọc
              </Button>
            )}
          </div>
        )}

        {showList && search.filteredSections.length > 0 && (
          <div className={isGrid ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'grid gap-3'}>
            {search.filteredSections.map((section, index) => {
              const saved = search.savedIds.includes(section.id);
              // Hiện lần lượt từng thẻ cho mượt (tối đa trễ 0,4 giây).
              const delay = `${Math.min(index * 50, 400)}ms`;

              return (
                <Fade key={section.id} in appear timeout={450} style={{ transitionDelay: delay }}>
                  <div>
                    {isGrid ? (
                      <StudentCourseCard
                        section={section}
                        saved={saved}
                        onToggleSaved={search.toggleSaved}
                        onViewDetail={search.openDetail}
                      />
                    ) : (
                      <StudentCourseRow
                        section={section}
                        saved={saved}
                        onToggleSaved={search.toggleSaved}
                        onViewDetail={search.openDetail}
                      />
                    )}
                  </div>
                </Fade>
              );
            })}
          </div>
        )}
      </section>

      <StudentCourseDetailDrawer
        open={search.detailOpen}
        section={search.selectedSection}
        saved={search.selectedSection ? search.savedIds.includes(search.selectedSection.id) : false}
        onToggleSaved={search.toggleSaved}
        onClose={search.closeDetail}
      />
    </div>
  );
}
