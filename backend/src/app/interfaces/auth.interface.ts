export type UserRole = 'USER' | 'MANAGER' | 'ADMIN';

export interface IAuthUser {
  userId: string;
  email: string;
  role: UserRole;
}
