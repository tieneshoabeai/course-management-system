export type UserRole = 'student' | 'lecturer' | 'studentAffairsOfficer' | 'accountant' | 'administrator';

export type UserRoleGroup = 'students' | 'employees';

export type UserRoleOption = {
  value: UserRole;
  group: UserRoleGroup;
  label: string;
  shortLabel: string;
};

export const userRoleOptions: UserRoleOption[] = [
  {
    value: 'student',
    group: 'students',
    label: 'Sinh vien',
    shortLabel: 'Student',
  },
  {
    value: 'lecturer',
    group: 'employees',
    label: 'Giang vien',
    shortLabel: 'Lecturer',
  },
  {
    value: 'studentAffairsOfficer',
    group: 'employees',
    label: 'Can bo cong tac sinh vien',
    shortLabel: 'Student Affairs',
  },
  {
    value: 'accountant',
    group: 'employees',
    label: 'Ke toan',
    shortLabel: 'Accountant',
  },
  {
    value: 'administrator',
    group: 'employees',
    label: 'Quan tri vien',
    shortLabel: 'Administrator',
  },
];

export function getRoleLabel(role: UserRole) {
  return userRoleOptions.find((option) => option.value === role)?.label ?? role;
}
