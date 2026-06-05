import { Role } from "../constants/roles";

/**
 * @enum {string}
 * @description Defines the status of a user account.
 */
export enum UserStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  PENDING = "pending",
}

/**
 * @interface IUser
 * @description Full user profile details for administrative management.
 */
export interface IUser {
  id: string | number;
  username: string;
  fullName: string;
  email: string;
  role: Role;
  submissions: number;
  joinedDate: Date;
  status: UserStatus;
  avatar?: string;
}
