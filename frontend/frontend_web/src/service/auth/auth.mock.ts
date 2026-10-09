import { AuthUser } from '../../types/auth';
import { UserRole } from '../../types/role';

type MockAccount = {
  password: string;
  user: AuthUser;
};

export const mockAccounts: Record<UserRole, MockAccount> = {
  student: {
    password: 'student123',
    user: {
      id: 'student-001',
      fullName: 'Nguyen Minh Anh',
      email: 'student@8learn.local',
      role: 'student',
    },
  },
  lecturer: {
    password: 'lecturer123',
    user: {
      id: 'lecturer-001',
      fullName: 'Tran Bao Long',
      email: 'lecturer@8learn.local',
      role: 'lecturer',
    },
  },
  studentAffairsOfficer: {
    password: 'affairs123',
    user: {
      id: 'affairs-001',
      fullName: 'Pham Hoai Thu',
      email: 'affairs@8learn.local',
      role: 'studentAffairsOfficer',
    },
  },
  accountant: {
    password: 'accountant123',
    user: {
      id: 'accountant-001',
      fullName: 'Dang Minh Quan',
      email: 'accountant@8learn.local',
      role: 'accountant',
    },
  },
  administrator: {
    password: 'admin123',
    user: {
      id: 'admin-001',
      fullName: 'Le Thu Ha',
      email: 'admin@8learn.local',
      role: 'administrator',
    },
  },
};
