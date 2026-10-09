import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

import { CourseStatus } from '../../types/course';

type CourseToolbarProps = {
  searchText: string;
  status: CourseStatus | 'all';
  semester: string;
  semesters: string[];
  onSearchTextChange: (value: string) => void;
  onStatusChange: (value: CourseStatus | 'all') => void;
  onSemesterChange: (value: string) => void;
};

export function CourseToolbar({
  searchText,
  status,
  semester,
  semesters,
  onSearchTextChange,
  onStatusChange,
  onSemesterChange,
}: CourseToolbarProps) {
  const handleStatusChange = (event: SelectChangeEvent) => {
    onStatusChange(event.target.value as CourseStatus | 'all');
  };

  const handleSemesterChange = (event: SelectChangeEvent) => {
    onSemesterChange(event.target.value);
  };

  return (
    <section className="course-toolbar" aria-label="Course filters">
      <TextField
        label="Tim khoa hoc"
        value={searchText}
        onChange={(event) => onSearchTextChange(event.target.value)}
        placeholder="Ma mon, ten mon, giang vien"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <FormControl>
        <InputLabel id="course-status-filter-label">Trang thai</InputLabel>
        <Select
          labelId="course-status-filter-label"
          label="Trang thai"
          value={status}
          onChange={handleStatusChange}
        >
          <MenuItem value="all">Tat ca</MenuItem>
          <MenuItem value="active">Dang mo</MenuItem>
          <MenuItem value="draft">Ban nhap</MenuItem>
          <MenuItem value="archived">Da luu tru</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="course-semester-filter-label">Hoc ky</InputLabel>
        <Select
          labelId="course-semester-filter-label"
          label="Hoc ky"
          value={semester}
          onChange={handleSemesterChange}
        >
          {semesters.map((item) => (
            <MenuItem key={item} value={item}>
              {item === 'all' ? 'Tat ca' : item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </section>
  );
}

