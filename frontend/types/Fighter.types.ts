enum FighterStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  RETIRED = "retired",
}
export interface FighterPost {
  firstName: string;
  lastName: string;
  nickname?: string;
  division: string;
  status: FighterStatus;
  record?: {
    wins: number;
    losses: number;
    draws: number;
  };
  ko_rate?: number;
}
export interface FighterGet {
  id: number | string;
  firstName: string;
  lastName: string;
  nickname?: string;
  division: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  ko_rate: number;
  status: FighterStatus;
  createdAt: Date;
  updatedAt: Date; // here find the last update date of the fighter
}
