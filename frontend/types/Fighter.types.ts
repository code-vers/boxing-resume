export enum FighterStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  RETIRED = "retired",
}

export enum Stance {
  ORTHODOX = "orthodox",
  SOUTHPAW = "southpaw",
  SWITCH = "switch",
}

export interface FighterPost {
  firstName: string;
  lastName: string;
  nickname?: string;
  image?: string;
  nationality?: string;
  birthDate?: Date;
  division: string;
  stance?: Stance;
  height?: string;
  reach?: string;
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
  image?: string;
  nationality?: string;
  birthDate?: Date;
  division: string;
  stance?: Stance;
  height?: string;
  reach?: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  ko_rate: number;
  status: FighterStatus;
  createdAt: Date;
  updatedAt: Date;
}
