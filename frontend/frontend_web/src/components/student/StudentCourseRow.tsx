import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { Button, IconButton, LinearProgress, Tooltip } from '@mui/material';

import { StudentCourseSection } from '../../types/studentCourse';
import {
  formatGroupedSchedule,
  getDepartmentColor,
  getFillPercent,
  getSeatsLeft,
  groupSchedule,
  isAlmostFull,
} from '../../utils/studentCourseFormat';
import { LecturerAvatar } from './LecturerAvatar';
import { SectionStatusBadge } from './SectionStatusBadge';

type StudentCourseRowProps = {
  section: StudentCourseSection;
  saved: boolean;
  onToggleSaved: (sectionId: string) => void;
  onViewDetail: (sectionId: string) => void;
};

// Dạng dòng cho chế độ "Danh sách": gọn hơn thẻ, xem được nhiều lớp cùng lúc.
export function StudentCourseRow({ section, saved, onToggleSaved, onViewDetail }: StudentCourseRowProps) {
  const fillPercent = getFillPercent(section);
  const seatsLeft = getSeatsLeft(section);
  const almostFull = isAlmostFull(section);
  const progressColor = fillPercent >= 100 ? 'error' : almostFull ? 'warning' : 'primary';

  return (
    <article className="relative grid items-center gap-3 overflow-hidden rounded-2xl border border-white/80 bg-white/85 py-3 pl-6 pr-4 shadow-[0_8px_24px_rgba(121,90,180,0.1)] backdrop-blur transition duration-200 hover:shadow-[0_14px_34px_rgba(121,90,180,0.2)] lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1.5fr)_minmax(0,1.7fr)_7.5rem_8.5rem]">
      <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: getDepartmentColor(section.departmentName) }} />

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-extrabold text-violet-700">
            {section.courseCode}
          </span>
          <SectionStatusBadge status={section.status} almostFull={almostFull} />
        </div>
        <h3 className="m-0 mt-1 truncate text-base font-extrabold text-[#141421]">{section.courseName}</h3>
        <p className="m-0 truncate text-xs text-[#6f6a7f]">
          {section.credits} tín chỉ · {section.departmentName}
        </p>
      </div>

      <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#3f3b4d]">
        <LecturerAvatar name={section.lecturerName} />
        <span className="truncate">{section.lecturerName}</span>
      </div>

      <div className="grid gap-0.5 text-xs text-[#4b4659]">
        {groupSchedule(section).map((group) => (
          <span key={`${group.days.join('-')}-${group.startTime}`}>{formatGroupedSchedule(group)}</span>
        ))}
      </div>

      <div className="grid gap-1">
        <LinearProgress variant="determinate" value={fillPercent} color={progressColor} sx={{ height: 6, borderRadius: 3 }} />
        <span className="text-xs font-bold text-[#6f6a7f]">
          {seatsLeft === 0 ? 'Hết chỗ' : `Còn ${seatsLeft}/${section.capacity} chỗ`}
        </span>
      </div>

      <div className="flex items-center justify-end gap-1">
        <Tooltip title={saved ? 'Bỏ lưu môn này' : 'Lưu môn này'}>
          <IconButton
            size="small"
            color={saved ? 'primary' : 'default'}
            aria-label={saved ? 'Bỏ lưu môn học' : 'Lưu môn học'}
            aria-pressed={saved}
            onClick={() => onToggleSaved(section.id)}
          >
            {saved ? <BookmarkRoundedIcon fontSize="small" /> : <BookmarkBorderRoundedIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <Button size="small" variant="outlined" onClick={() => onViewDetail(section.id)}>
          Chi tiết
        </Button>
      </div>
    </article>
  );
}
