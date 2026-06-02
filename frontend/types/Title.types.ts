export enum TitleTier {
  WORLD = "world",
  INTERCONTINENTAL = "intercontinental",
  REGIONAL = "regional",
  NATIONAL = "national",
  OTHER = "other",
}

export enum BoxingOrg {
  WBC = "WBC",
  WBA = "WBA",
  IBF = "IBF",
  WBO = "WBO",
  RING = "The Ring",
  IBO = "IBO",
  OTHER = "Other",
}

export interface TitleEntry {
  beltName: string;
  org: BoxingOrg;
  tier: TitleTier;
  division: string;
}

export interface TitleGet extends TitleEntry {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TitleHistory {
  id: string | number;
  fighterId: string | number;
  titleId: string | number;
  fighter?: {
    firstName: string;
    lastName: string;
    nickname?: string;
  };
  title?: TitleEntry;
  wonDate: Date;
  lostDate?: Date;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}
