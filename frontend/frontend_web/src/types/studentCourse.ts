// Trạng thái của một lớp học phần (khớp bảng course_sections của BE: OPEN / FULL / CLOSED).
export type SectionStatus = 'OPEN' | 'FULL' | 'CLOSED';

// Một buổi học trong tuần (khớp bảng course_section_schedules của BE).
// dayOfWeek: 2 = Thứ 2, ..., 7 = Thứ 7, 8 = Chủ nhật (quy ước này cần xác nhận lại với BE).
export type ScheduleSlot = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  classroom: string;
};

// Một lớp học phần mà sinh viên có thể xem / đăng ký.
// Dữ liệu gộp từ 3 bảng của BE: courses + course_sections + course_section_schedules.
export type StudentCourseSection = {
  id: string;
  sectionCode: string;
  courseCode: string;
  courseName: string;
  credits: number;
  departmentName: string;
  description: string;
  lecturerName: string;
  semester: string;
  capacity: number;
  enrolledCount: number;
  status: SectionStatus;
  schedules: ScheduleSlot[];
};

// Các kiểu sắp xếp danh sách lớp học phần trên màn hình tra cứu.
export type StudentCourseSortOption = 'default' | 'name' | 'seats' | 'credits';

// Cách hiển thị danh sách: dạng lưới thẻ hoặc dạng danh sách dòng.
export type StudentCourseViewMode = 'grid' | 'list';

// Các buổi học cùng giờ và cùng phòng được gộp lại thành một dòng (vd: "T2, T4 · 07:30–09:30 · A1-201").
export type GroupedSchedule = {
  days: number[];
  startTime: string;
  endTime: string;
  classroom: string;
};
