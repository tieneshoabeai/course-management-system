import { SectionStatus } from '../../types/studentCourse';

type BadgeKey = SectionStatus | 'ALMOST_FULL';

const badgeConfig: Record<BadgeKey, { label: string; className: string }> = {
  OPEN: { label: 'Đang mở', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  ALMOST_FULL: { label: 'Sắp đầy', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  FULL: { label: 'Đã đầy', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
  CLOSED: { label: 'Đã đóng', className: 'bg-slate-100 text-slate-600 ring-slate-200' },
};

type SectionStatusBadgeProps = {
  status: SectionStatus;
  // true khi lớp còn mở nhưng sắp hết chỗ: hiện "Sắp đầy" thay cho "Đang mở".
  almostFull?: boolean;
};

export function SectionStatusBadge({ status, almostFull = false }: SectionStatusBadgeProps) {
  const key: BadgeKey = status === 'OPEN' && almostFull ? 'ALMOST_FULL' : status;
  const config = badgeConfig[key];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${config.className}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
