import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Alert, Button, CircularProgress, Drawer, IconButton, Tooltip } from '@mui/material';

import { StudentCourseSection } from '../../types/studentCourse';
import {
  formatDayShort,
  getDepartmentColor,
  getFillPercent,
  getSeatsLeft,
  isAlmostFull,
  isSectionAvailable,
} from '../../utils/studentCourseFormat';
import { LecturerAvatar } from './LecturerAvatar';
import { ScheduleDays } from './ScheduleDays';
import { SectionStatusBadge } from './SectionStatusBadge';

type StudentCourseDetailDrawerProps = {
  open: boolean;
  section: StudentCourseSection | null;
  saved: boolean;
  onToggleSaved: (sectionId: string) => void;
  onClose: () => void;
};

export function StudentCourseDetailDrawer({ open, section, saved, onToggleSaved, onClose }: StudentCourseDetailDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { sx: { width: { xs: '100%', sm: 460 }, borderTopLeftRadius: { sm: '1.5rem' }, borderBottomLeftRadius: { sm: '1.5rem' } } },
      }}
    >
      {section && <DrawerContent section={section} saved={saved} onToggleSaved={onToggleSaved} onClose={onClose} />}
    </Drawer>
  );
}

type DrawerContentProps = Omit<StudentCourseDetailDrawerProps, 'open' | 'section'> & { section: StudentCourseSection };

function DrawerContent({ section, saved, onToggleSaved, onClose }: DrawerContentProps) {
  const fillPercent = getFillPercent(section);
  const seatsLeft = getSeatsLeft(section);
  const almostFull = isAlmostFull(section);
  const gaugeColor = seatsLeft === 0 ? 'error' : almostFull ? 'warning' : 'primary';
  const scheduleDays = section.schedules.some((slot) => slot.dayOfWeek === 8) ? [2, 3, 4, 5, 6, 7, 8] : [2, 3, 4, 5, 6, 7];

  return (
    <div className="flex h-full flex-col">
      <header className="relative px-6 pb-5 pt-6 text-white" style={{ background: getDepartmentColor(section.departmentName) }}>
        <IconButton
          aria-label="Đóng chi tiết"
          onClick={onClose}
          size="small"
          sx={{ position: 'absolute', right: 16, top: 16, color: 'white', bgcolor: 'rgba(255,255,255,0.22)' }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-extrabold">{section.sectionCode}</span>
          <SectionStatusBadge status={section.status} almostFull={almostFull} />
        </div>
        <h2 className="m-0 mt-3 pr-10 text-2xl font-extrabold leading-tight">{section.courseName}</h2>
        <p className="m-0 mt-1 text-sm opacity-90">
          {section.credits} tín chỉ · Học kỳ {section.semester}
        </p>
      </header>

      <div className="grid flex-1 content-start gap-5 overflow-y-auto px-6 py-5 text-sm text-[#3f3b4d]">
        {seatsLeft === 0 && section.status === 'FULL' && (
          <Alert severity="error" variant="outlined">
            Lớp đã đầy, hiện không thể đăng ký thêm.
          </Alert>
        )}
        {section.status === 'CLOSED' && (
          <Alert severity="info" variant="outlined">
            Lớp đã đóng đăng ký.
          </Alert>
        )}
        {almostFull && (
          <Alert severity="warning" variant="outlined">
            Lớp sắp đầy, chỉ còn {seatsLeft} chỗ. Bạn nên đăng ký sớm.
          </Alert>
        )}

        <p className="m-0 leading-relaxed">{section.description}</p>

        <section className="grid grid-cols-2 gap-3" aria-label="Thông tin chung">
          <div className="col-span-2 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
            <LecturerAvatar name={section.lecturerName} size={40} />
            <div>
              <p className="m-0 text-xs font-bold uppercase text-[#6f6a7f]">Giảng viên</p>
              <p className="m-0 font-extrabold text-[#141421]">{section.lecturerName}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
            <p className="m-0 text-xs font-bold uppercase text-[#6f6a7f]">Khoa / Bộ môn</p>
            <p className="m-0 mt-0.5 font-extrabold text-[#141421]">{section.departmentName}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
            <p className="m-0 text-xs font-bold uppercase text-[#6f6a7f]">Mã môn</p>
            <p className="m-0 mt-0.5 font-extrabold text-[#141421]">{section.courseCode}</p>
          </div>
        </section>

        <section className="grid gap-2" aria-label="Lịch học">
          <h3 className="m-0 text-sm font-extrabold text-[#141421]">Lịch học trong tuần</h3>
          <ScheduleDays section={section} />
          <div className="grid gap-2">
            {scheduleDays.map((day) => {
              const slots = section.schedules.filter((slot) => slot.dayOfWeek === day);

              return slots.map((slot) => (
                <div
                  key={`${day}-${slot.startTime}`}
                  className="flex items-center justify-between rounded-xl bg-violet-50 px-3 py-2 ring-1 ring-violet-100"
                >
                  <span className="font-extrabold text-violet-700">{formatDayShort(day)}</span>
                  <span className="font-semibold">
                    {slot.startTime}–{slot.endTime}
                  </span>
                  <span className="text-[#6f6a7f]">Phòng {slot.classroom}</span>
                </div>
              ));
            })}
          </div>
        </section>

        <section className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100" aria-label="Sĩ số">
          <div className="relative inline-flex">
            <CircularProgress variant="determinate" value={100} size={84} thickness={5} sx={{ color: '#e8e3f7' }} />
            <CircularProgress
              variant="determinate"
              value={fillPercent}
              size={84}
              thickness={5}
              color={gaugeColor}
              sx={{ position: 'absolute', left: 0 }}
            />
            <span className="absolute inset-0 grid place-items-center text-lg font-extrabold text-[#141421]">{fillPercent}%</span>
          </div>
          <div>
            <p className="m-0 text-xs font-bold uppercase text-[#6f6a7f]">Sĩ số</p>
            <p className="m-0 text-lg font-extrabold text-[#141421]">
              {section.enrolledCount}/{section.capacity} sinh viên
            </p>
            <p className="m-0 font-semibold">{seatsLeft === 0 ? 'Hết chỗ' : `Còn ${seatsLeft} chỗ trống`}</p>
          </div>
        </section>
      </div>

      <footer className="flex items-center gap-2 border-t border-slate-100 px-6 py-4">
        <Button
          variant="outlined"
          color={saved ? 'primary' : 'inherit'}
          startIcon={saved ? <BookmarkRoundedIcon /> : <BookmarkBorderRoundedIcon />}
          onClick={() => onToggleSaved(section.id)}
        >
          {saved ? 'Đã lưu' : 'Lưu môn'}
        </Button>
        <Tooltip title="Chức năng đăng ký sẽ được làm ở màn hình Đăng ký tín chỉ">
          <span className="flex-1">
            <Button fullWidth variant="contained" disabled>
              {isSectionAvailable(section) ? 'Đăng ký lớp này' : 'Không thể đăng ký'}
            </Button>
          </span>
        </Tooltip>
      </footer>
    </div>
  );
}
