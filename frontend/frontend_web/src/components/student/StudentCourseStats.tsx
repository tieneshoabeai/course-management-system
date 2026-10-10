import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';

type StudentCourseStatsProps = {
  totalSections: number;
  availableSections: number;
  almostFullSections: number;
  fullSections: number;
};

export function StudentCourseStats({
  totalSections,
  availableSections,
  almostFullSections,
  fullSections,
}: StudentCourseStatsProps) {
  const items = [
    { label: 'Tổng số lớp', hint: 'Trong học kỳ này', value: totalSections, icon: AutoStoriesRoundedIcon, tone: 'from-violet-500 to-fuchsia-400' },
    { label: 'Còn chỗ', hint: 'Có thể đăng ký', value: availableSections, icon: EventSeatRoundedIcon, tone: 'from-emerald-500 to-teal-400' },
    { label: 'Sắp đầy', hint: 'Nên đăng ký sớm', value: almostFullSections, icon: HourglassBottomRoundedIcon, tone: 'from-amber-500 to-orange-400' },
    { label: 'Đã đầy', hint: 'Hết chỗ trống', value: fullSections, icon: BlockRoundedIcon, tone: 'from-rose-500 to-pink-400' },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Thống kê lớp học phần">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.label}
            className="flex items-center gap-3.5 rounded-3xl border border-white/80 bg-white/80 p-4 shadow-[0_10px_28px_rgba(121,90,180,0.1)] backdrop-blur transition duration-200 hover:-translate-y-0.5"
          >
            <span className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br text-white shadow-md ${item.tone}`}>
              <Icon />
            </span>
            <div className="min-w-0">
              <p className="m-0 text-2xl font-extrabold leading-none text-[#141421]">{item.value}</p>
              <p className="m-0 mt-1 text-sm font-bold text-[#3f3b4d]">{item.label}</p>
              <p className="m-0 hidden truncate text-xs text-[#6f6a7f] sm:block">{item.hint}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
