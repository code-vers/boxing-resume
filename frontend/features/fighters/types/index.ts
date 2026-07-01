/**
 * @file index.ts
 * @description Type definitions for the fighters feature.
 */

export interface ApiFighter {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  nationality?: string;
  division: string;
  status?: string;
  wins?: number;
  losses?: number;
  draws?: number;
  record?: {
    wins: number;
    losses: number;
    draws: number;
  };
}
