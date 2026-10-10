import { GroupedSchedule, ScheduleSlot, StudentCourseSection } from '../types/studentCourse';

export function formatDayOfWeek(dayOfWeek: number) {
  return dayOfWeek === 8 ? 'Chủ nhật' : `Thứ ${dayOfWeek}`;
}

export function formatDayShort(dayOfWeek: number) {
  return dayOfWeek === 8 ? 'CN' : `T${dayOfWeek}`;
}

export function formatScheduleSlot(slot: ScheduleSlot) {
  return `${formatDayOfWeek(slot.dayOfWeek)} · ${slot.startTime}–${slot.endTime} · ${slot.classroom}`;
}

// Gộp các buổi học cùng giờ + cùng phòng thành một dòng cho gọn.
export function groupSchedule(section: StudentCourseSection): GroupedSchedule[] {
  const groups = new Map<string, GroupedSchedule>();

  section.schedules.forEach((slot) => {
    const key = `${slot.startTime}-${slot.endTime}-${slot.classroom}`;
    const existing = groups.get(key);

    if (existing) {
      existing.days.push(slot.dayOfWeek);
    } else {
      groups.set(key, {
        days: [slot.dayOfWeek],
        startTime: slot.startTime,
        endTime: slot.endTime,
        classroom: slot.classroom,
      });
    }
  });

  return [...groups.values()]
    .map((group) => ({ ...group, days: [...group.days].sort((a, b) => a - b) }))
    .sort((a, b) => a.days[0] - b.days[0]);
}

export function formatGroupedSchedule(group: GroupedSchedule) {
  return `${group.days.map(formatDayShort).join(', ')} · ${group.startTime}–${group.endTime} · ${group.classroom}`;
}

export function getSeatsLeft(section: StudentCourseSection) {
  return Math.max(section.capacity - section.enrolledCount, 0);
}

export function getFillPercent(section: StudentCourseSection) {
  return Math.min(Math.round((section.enrolledCount / section.capacity) * 100), 100);
}

// Lớp còn đăng ký được: đang mở và còn ít nhất 1 chỗ.
export function isSectionAvailable(section: StudentCourseSection) {
  return section.status === 'OPEN' && getSeatsLeft(section) > 0;
}

// Lớp "sắp đầy": còn đăng ký được nhưng đã lấp từ 85% sĩ số trở lên.
export function isAlmostFull(section: StudentCourseSection) {
  return isSectionAvailable(section) && getFillPercent(section) >= 85;
}

// Chữ cái đầu của họ và tên để làm ảnh đại diện, vd "Trần Bảo Long" -> "TL".
export function getInitials(fullName: string) {
  const words = fullName.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return '?';
  }

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`.toUpperCase();
}

type DepartmentTheme = { gradient: string; accent: string };

// Mỗi khoa một bộ màu riêng (dải màu đầu thẻ + màu nhấn). Khoa chưa khai báo thì chọn theo tên.
const knownDepartmentThemes: Record<string, DepartmentTheme> = {
  'Công nghệ thông tin': { gradient: 'linear-gradient(90deg, #8a55f7, #b48cff)', accent: '#8a55f7' },
  'Trí tuệ nhân tạo': { gradient: 'linear-gradient(90deg, #00a9f4, #5cd0ff)', accent: '#0891d1' },
  'Toán - Thống kê': { gradient: 'linear-gradient(90deg, #22c55e, #86efac)', accent: '#16a34a' },
  'Ngoại ngữ': { gradient: 'linear-gradient(90deg, #f59e0b, #fcd34d)', accent: '#d97706' },
  'Vật lý': { gradient: 'linear-gradient(90deg, #ff72d6, #ffa6e8)', accent: '#db2777' },
};

const fallbackThemes: DepartmentTheme[] = [
  { gradient: 'linear-gradient(90deg, #6366f1, #a5b4fc)', accent: '#4f46e5' },
  { gradient: 'linear-gradient(90deg, #14b8a6, #5eead4)', accent: '#0d9488' },
  { gradient: 'linear-gradient(90deg, #f43f5e, #fda4af)', accent: '#e11d48' },
];

function getDepartmentTheme(departmentName: string) {
  const known = knownDepartmentThemes[departmentName];

  if (known) {
    return known;
  }

  const hash = [...departmentName].reduce((total, char) => total + char.charCodeAt(0), 0);

  return fallbackThemes[hash % fallbackThemes.length];
}

export function getDepartmentColor(departmentName: string) {
  return getDepartmentTheme(departmentName).gradient;
}

export function getDepartmentAccent(departmentName: string) {
  return getDepartmentTheme(departmentName).accent;
}
