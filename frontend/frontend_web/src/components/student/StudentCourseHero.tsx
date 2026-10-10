import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';

type StudentCourseHeroProps = {
  studentName?: string;
  semester: string;
  sectionCount: number;
  departmentCount: number;
};

export function StudentCourseHero({ studentName, semester, sectionCount, departmentCount }: StudentCourseHeroProps) {
  const tags = [
    semester ? `Học kỳ ${semester}` : '',
    sectionCount > 0 ? `${sectionCount} lớp học phần` : '',
    departmentCount > 0 ? `${departmentCount} khoa / bộ môn` : '',
  ].filter(Boolean);

  return (
    <section className="relative flex items-center justify-between gap-6 overflow-hidden rounded-[2rem] border border-white/70 bg-linear-to-br from-white/90 via-violet-50/70 to-pink-50/70 px-6 py-7 shadow-[0_18px_52px_rgba(121,90,180,0.16)] backdrop-blur-xl sm:px-9">
      <div className="pointer-events-none absolute -right-14 -top-20 size-72 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-40 size-56 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-16 size-48 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="relative grid gap-1.5">
        <p className="m-0 text-xs font-extrabold uppercase tracking-wider text-[#8a55f7]">
          {studentName ? `Xin chào, ${studentName}` : 'Cổng sinh viên'}
        </p>
        <h2 className="m-0 text-3xl font-extrabold leading-tight text-[#141421] sm:text-4xl">Tra cứu môn học</h2>
        <p className="m-0 max-w-xl leading-relaxed text-[#5f6577]">
          Tìm lớp học phần theo mã môn, tên môn hoặc giảng viên. Xem lịch học, số chỗ còn trống và lưu lại những môn bạn quan tâm.
        </p>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-violet-700 ring-1 ring-violet-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative hidden shrink-0 md:block">
        <span className="grid size-28 place-items-center rounded-[2rem] bg-linear-to-br from-violet-500 via-fuchsia-400 to-sky-400 text-white shadow-[0_18px_40px_rgba(138,85,247,0.4)] -rotate-6">
          <AutoStoriesRoundedIcon sx={{ fontSize: 56 }} />
        </span>
      </div>
    </section>
  );
}
