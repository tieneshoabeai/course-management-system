import { Course } from '../../types/course';
import { mockCourses } from './course.mock';

export function getCourses(): Course[] {
  return mockCourses;
}

