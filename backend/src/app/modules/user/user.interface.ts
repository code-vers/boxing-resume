import type { UserRole } from '../../interfaces/auth.interface';

export interface IChangeRolePayload {
  role: UserRole;
}

export interface IUpdateProfilePayload {
  name?: string;
  phone?: string;
}
