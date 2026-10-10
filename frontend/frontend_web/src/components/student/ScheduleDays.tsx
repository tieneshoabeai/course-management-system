import { StudentCourseSection } from '../../types/studentCourse';
import { formatDayShort, getDepartmentAccent } from '../../utils/studentCourseFormat';

type ScheduleDaysProps = {
  section: StudentCourseSection;
};

// Dãy ô T2 → T7: ngày nào lớp có học thì tô màu theo khoa, ngày không học để xám.
export function ScheduleDays({ section }: ScheduleDaysProps) {
  const accent = getDepartmentAccent(section.departmentName);
  const activeDays = new Set(section.schedules.map((slot) => slot.dayOfWeek));
  const days = activeDays.has(8) ? [2, 3, 4, 5, 6, 7, 8] : [2, 3, 4, 5, 6, 7];

  return (
    <div className="flex gap-1" aria-label="Các ngày học trong tuần">
      {days.map((day) => {
        const active = activeDays.has(day);

        return (
          <span
            key={day}
            className={`grid h-6 min-w-8 flex-1 place-items-center rounded-md text-[0.7rem] font-extrabold ${
              active ? 'text-white shadow-sm' : 'bg-slate-100 text-slate-400'
            }`}
            style={active ? { backgroundColor: accent } : undefined}
          >
            {formatDayShort(day)}
          </span>
        );
      })}
    </div>
  );
}
