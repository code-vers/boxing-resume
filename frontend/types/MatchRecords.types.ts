export enum WinMethod {
  KO = "KO",
  TKO = "TKO",
  UD = "UD",
  MD = "MD",
  SD = "SD",
  DQ = "DQ",
  NC = "NC",
  DRAW = "DRAW",
}

export interface AddMatchRecord {
  id: number | string;
  date: Date;
  winner: number | string; // winner id
  loser: number | string; // loser id
  method: WinMethod;
  round: number;
  weight: string;
  title?: string;
  event: string; // event id
  poster?: string; // image url of the match record
}

export interface MatchResult {
  id: number | string;
  date: Date;
  winner: {
    id: number | string;
    firstName: string;
    lastName: string;
    nickname?: string;
    image?: string;
  };
  loser: {
    id: number | string;
    firstName: string;
    lastName: string;
    nickname?: string;
    image?: string;
  };
  method: WinMethod;
  round: number;
  weight: string;
  title?: string;
  event: {
    id: number | string;
    eventName: string;
    date: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  poster?: string;
}

export interface FightHistory {
  fighterId: number | string;
  totalFights: number;
  results: MatchResult[];
}
