import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ViewAgendaRoundedIcon from '@mui/icons-material/ViewAgendaRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import {
  Button,
  Chip,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { useStudentCourseSearch } from '../../hooks/student/useStudentCourseSearch';
import { StudentCourseSortOption, StudentCourseViewMode } from '../../types/studentCourse';
import { formatDayOfWeek } from '../../utils/studentCourseFormat';

const sortOptions: { value: StudentCourseSortOption; label: string }[] = [
  { value: 'default', label: 'Mặc định' },
  { value: 'name', label: 'Tên môn A → Z' },
  { value: 'seats', label: 'Còn nhiều chỗ nhất' },
  { value: 'credits', label: 'Nhiều tín chỉ nhất' },
];

type StudentCourseToolbarProps = {
  search: ReturnType<typeof useStudentCourseSearch>;
};

export function StudentCourseToolbar({ search }: StudentCourseToolbarProps) {
  return (
    <div className="grid gap-3.5">
      <div className="flex flex-wrap items-center gap-3">
        <TextField
          className="min-w-64 flex-1"
          size="small"
          label="Tìm môn học"
          value={search.searchText}
          onChange={(event) => search.setSearchText(event.target.value)}
          placeholder="Mã môn, tên môn, giảng viên"
          slotProps={{
            input: {
              sx: { borderRadius: '0.9rem', backgroundColor: 'rgba(255,255,255,0.9)' },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: search.searchText ? (
                <InputAdornment position="end">
                  <IconButton size="small" aria-label="Xóa nội dung tìm kiếm" onClick={() => search.setSearchText('')}>
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />

        <ToggleButtonGroup
          exclusive
          size="small"
          value={search.viewMode}
          aria-label="Chế độ hiển thị"
          onChange={(_, value: StudentCourseViewMode | null) => {
            if (value) {
              search.setViewMode(value);
            }
          }}
        >
          <ToggleButton value="grid" aria-label="Xem dạng lưới" sx={{ borderRadius: '0.9rem 0 0 0.9rem', px: 1.5 }}>
            <GridViewRoundedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list" aria-label="Xem dạng danh sách" sx={{ borderRadius: '0 0.9rem 0.9rem 0', px: 1.5 }}>
            <ViewAgendaRoundedIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <TextField
          select
          size="small"
          label="Số tín chỉ"
          value={search.credits}
          onChange={(event) => search.setCredits(event.target.value)}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          {search.creditOptions.map((item) => (
            <MenuItem key={item} value={String(item)}>
              {item} tín chỉ
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Ngày học"
          value={search.day}
          onChange={(event) => search.setDay(event.target.value)}
        >
          <MenuItem value="all">Tất cả các ngày</MenuItem>
          {search.dayOptions.map((item) => (
            <MenuItem key={item} value={String(item)}>
              {formatDayOfWeek(item)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Sắp xếp"
          value={search.sortBy}
          onChange={(event) => search.setSortBy(event.target.value as StudentCourseSortOption)}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Lọc theo khoa">
        {search.departments.map((item) => (
          <Chip
            key={item}
            label={item === 'all' ? 'Tất cả khoa' : item}
            color={search.department === item ? 'primary' : 'default'}
            variant={search.department === item ? 'filled' : 'outlined'}
            onClick={() => search.setDepartment(item)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <FormControlLabel
            control={<Switch checked={search.onlyAvailable} onChange={(event) => search.setOnlyAvailable(event.target.checked)} />}
            label="Chỉ hiện lớp còn chỗ"
          />
          <Chip
            icon={<BookmarkRoundedIcon />}
            label={`Đã lưu (${search.savedIds.length})`}
            color={search.onlySaved ? 'primary' : 'default'}
            variant={search.onlySaved ? 'filled' : 'outlined'}
            onClick={() => search.setOnlySaved(!search.onlySaved)}
          />
        </div>
        {search.hasActiveFilters && (
          <Button size="small" onClick={search.resetFilters}>
            Xóa bộ lọc
          </Button>
        )}
      </div>
    </div>
  );
}
