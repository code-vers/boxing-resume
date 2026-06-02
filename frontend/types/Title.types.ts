/**
 * @enum {string}
 * @description Geographical and organizational tier of a championship title.
 */
export enum TitleTier {
  /** Global recognized championship */
  WORLD = "world",
  /** Intercontinental recognized championship */
  INTERCONTINENTAL = "intercontinental",
  /** Specific continent or regional championship */
  REGIONAL = "regional",
  /** Single nation championship */
  NATIONAL = "national",
  /** Other minor or exhibition titles */
  OTHER = "other",
}

/**
 * @enum {string}
 * @description Major professional boxing sanctioning organizations.
 */
export enum BoxingOrg {
  /** World Boxing Council */
  WBC = "WBC",
  /** World Boxing Association */
  WBA = "WBA",
  /** International Boxing Federation */
  IBF = "IBF",
  /** World Boxing Organization */
  WBO = "WBO",
  /** The Ring Magazine (Linear Championship) */
  RING = "The Ring",
  /** International Boxing Organization */
  IBO = "IBO",
  /** Any other minor organization */
  OTHER = "Other",
}

/**
 * @interface TitleEntry
 * @description Basic definition of a championship title belt.
 */
export interface TitleEntry {
  /** Official name of the belt (e.g., "Silver Belt") */
  beltName: string;
  /** Sanctioning body */
  org: BoxingOrg;
  /** Organizational tier */
  tier: TitleTier;
  /** Weight division the belt belongs to */
  division: string;
}

/**
 * @interface TitleGet
 * @description Full championship title details retrieved from the API.
 * @extends TitleEntry
 */
export interface TitleGet extends TitleEntry {
  /** Unique system ID for the title */
  id: string | number;
  /** System timestamp of creation */
  createdAt: Date;
  /** System timestamp of last modification */
  updatedAt: Date;
}

/**
 * @interface TitleHistory
 * @description Historical record of a title's possession by a fighter.
 */
export interface TitleHistory {
  /** Unique historical record ID */
  id: string | number;
  /** ID of the fighter who won the title */
  fighterId: string | number;
  /** ID of the specific title belt */
  titleId: string | number;
  /** Populated fighter information */
  fighter?: {
    firstName: string;
    lastName: string;
    nickname?: string;
  };
  /** Populated title belt information */
  title?: TitleEntry;
  /** Date the fighter won the title */
  wonDate: Date;
  /** Date the fighter lost or vacated the title (optional) */
  lostDate?: Date;
  /** Boolean indicating if the fighter is the current holder */
  isCurrent: boolean;
  /** Record creation timestamp */
  createdAt: Date;
  /** Record update timestamp */
  updatedAt: Date;
}
