import { Chip } from '@mui/material';

import { CourseStatus } from '../../types/course';

type StatusBadgeProps = {
  status: CourseStatus;
};

const statusConfig: Record<CourseStatus, { label: string; color: 'success' | 'warning' | 'default' }> = {
  active: {
    label: 'Dang mo',
    color: 'success',
  },
  draft: {
    label: 'Ban nhap',
    color: 'warning',
  },
  archived: {
    label: 'Da luu tru',
    color: 'default',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return <Chip label={config.label} color={config.color} size="small" variant="outlined" />;
}

