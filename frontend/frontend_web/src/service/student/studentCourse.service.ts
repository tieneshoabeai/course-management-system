import { StudentCourseSection } from '../../types/studentCourse';
import { mockStudentCourseSections } from './studentCourse.mock';

const MOCK_DELAY_MS = 400;

// Hiện tại trả về dữ liệu giả sau 0,4 giây để giả lập thời gian chờ mạng.
// Khi BE có API thật, chỉ cần sửa nội dung hàm này (gọi API thay vì trả mock),
// các màn hình bên trên không phải đổi.
export async function getStudentCourseSections(): Promise<StudentCourseSection[]> {
  await new Promise((resolve) => {
    window.setTimeout(resolve, MOCK_DELAY_MS);
  });

  return mockStudentCourseSections;
}
