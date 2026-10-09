import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import { Course } from '../../types/course';
import { StatusBadge } from '../ui/StatusBadge';

type CourseTableProps = {
  courses: Course[];
};

export function CourseTable({ courses }: CourseTableProps) {
  if (courses.length === 0) {
    return (
      <section className="empty-state">
        <h2>Khong tim thay khoa hoc</h2>
        <p>Thu doi tu khoa tim kiem hoac bo bot bo loc de xem lai danh sach.</p>
      </section>
    );
  }

  return (
    <TableContainer className="course-table-shell">
      <Table aria-label="Course management table">
        <TableHead>
          <TableRow>
            <TableCell>Ma mon</TableCell>
            <TableCell>Ten mon</TableCell>
            <TableCell>Giang vien</TableCell>
            <TableCell>Tin chi</TableCell>
            <TableCell>Dang ky</TableCell>
            <TableCell>Hoc ky</TableCell>
            <TableCell>Trang thai</TableCell>
            <TableCell align="right">Thao tac</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => {
            const capacityPercent = Math.round((course.enrolledStudents / course.capacity) * 100);

            return (
              <TableRow key={course.id} hover>
                <TableCell>
                  <strong>{course.code}</strong>
                </TableCell>
                <TableCell>
                  <div className="course-title-cell">
                    <span>{course.title}</span>
                    <small>{course.department}</small>
                  </div>
                </TableCell>
                <TableCell>{course.lecturerName}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>
                  <div className="capacity-cell">
                    <span>
                      {course.enrolledStudents}/{course.capacity}
                    </span>
                    <LinearProgress variant="determinate" value={capacityPercent} />
                  </div>
                </TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>
                  <StatusBadge status={course.status} />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Xem chi tiet mock">
                    <span>
                      <IconButton aria-label={`Xem ${course.code}`} disabled>
                        <OpenInNewRoundedIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

