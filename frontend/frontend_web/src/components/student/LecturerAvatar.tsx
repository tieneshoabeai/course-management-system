import { Avatar } from '@mui/material';

import { getInitials } from '../../utils/studentCourseFormat';

const avatarGradients = [
  'linear-gradient(135deg, #8a55f7, #c084fc)',
  'linear-gradient(135deg, #00a9f4, #67e8f9)',
  'linear-gradient(135deg, #f59e0b, #fcd34d)',
  'linear-gradient(135deg, #22c55e, #86efac)',
  'linear-gradient(135deg, #ec4899, #f9a8d4)',
];

type LecturerAvatarProps = {
  name: string;
  size?: number;
};

export function LecturerAvatar({ name, size = 28 }: LecturerAvatarProps) {
  const hash = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        fontWeight: 800,
        background: avatarGradients[hash % avatarGradients.length],
      }}
    >
      {getInitials(name)}
    </Avatar>
  );
}
