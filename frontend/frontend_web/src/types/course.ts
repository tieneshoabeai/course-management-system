export type CourseStatus = 'active' | 'draft' | 'archived';

export type Course = {
  id: string;
  code: string;
  title: string;
  lecturerName: string;
  department: string;
  credits: number;
  enrolledStudents: number;
  capacity: number;
  semester: string;
  status: CourseStatus;
  updatedAt: string;
};

export type CourseDashboardStats = {
  totalCourses: number;
  activeCourses: number;
  enrolledStudents: number;
  pendingApprovals: number;
};

