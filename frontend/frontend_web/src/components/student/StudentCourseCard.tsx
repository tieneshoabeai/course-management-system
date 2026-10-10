import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
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
import { ScheduleDays } from './ScheduleDays';
import { SectionStatusBadge } from './SectionStatusBadge';

type StudentCourseCardProps = {
  section: StudentCourseSection;
  saved: boolean;
  onToggleSaved: (sectionId: string) => void;
  onViewDetail: (sectionId: string) => void;
};

export function StudentCourseCard({ section, saved, onToggleSaved, onViewDetail }: StudentCourseCardProps) {
  const fillPercent = getFillPercent(section);
  const seatsLeft = getSeatsLeft(section);
  const almostFull = isAlmostFull(section);
  const progressColor = fillPercent >= 100 ? 'error' : almostFull ? 'warning' : 'primary';
  const seatsTone = seatsLeft === 0 ? 'text-rose-600' : almostFull ? 'text-amber-600' : 'text-emerald-600';

  return (
    <article className="group flex h-full flex-col gap-3.5 overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_12px_32px_rgba(121,90,180,0.12)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(121,90,180,0.24)]">
      {/* Dải màu theo khoa ở đầu thẻ */}
      <div className="-mx-5 -mt-5 h-1.5" style={{ background: getDepartmentColor(section.departmentName) }} />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-extrabold text-violet-700">
            {section.courseCode}
          </span>
          <SectionStatusBadge status={section.status} almostFull={almostFull} />
        </div>
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
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="m-0 text-lg font-extrabold leading-snug text-[#141421]">{section.courseName}</h3>
          <p className="m-0 mt-1 text-sm text-[#6f6a7f]">{section.departmentName}</p>
        </div>
        <div className="grid shrink-0 place-items-center rounded-2xl bg-slate-50 px-3 py-1.5 text-center ring-1 ring-slate-100">
          <span className="text-xl font-extrabold leading-none text-[#141421]">{section.credits}</span>
          <span className="text-[0.65rem] font-bold uppercase text-[#6f6a7f]">tín chỉ</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-[#3f3b4d]">
        <LecturerAvatar name={section.lecturerName} />
        <span className="font-semibold">{section.lecturerName}</span>
      </div>

      <div className="grid gap-2 rounded-2xl bg-slate-50/80 p-3">
        <ScheduleDays section={section} />
        <div className="grid gap-1 text-xs text-[#4b4659]">
          {groupSchedule(section).map((group) => (
            <span key={`${group.days.join('-')}-${group.startTime}`} className="flex items-center gap-1.5">
              <PlaceRoundedIcon sx={{ fontSize: 14 }} color="secondary" />
              {formatGroupedSchedule(group)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto grid gap-1.5">
        <LinearProgress variant="determinate" value={fillPercent} color={progressColor} sx={{ height: 7, borderRadius: 4 }} />
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#6f6a7f]">
            {section.enrolledCount}/{section.capacity} sinh viên
          </span>
          <span className={seatsTone}>{seatsLeft === 0 ? 'Hết chỗ' : `Còn ${seatsLeft} chỗ`}</span>
        </div>
      </div>

      <Button variant="outlined" onClick={() => onViewDetail(section.id)} sx={{ borderRadius: '0.85rem' }}>
        Xem chi tiết
      </Button>
    </article>
  );
}
