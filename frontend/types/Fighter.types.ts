/**
 * @enum {string}
 * @description Represents the professional status of a boxer.
 */
export enum FighterStatus {
  /** Fighter is actively competing in professional bouts */
  ACTIVE = "active",
  /** Fighter is currently not scheduled but hasn't officially retired */
  INACTIVE = "inactive",
  /** Fighter has officially retired from professional boxing */
  RETIRED = "retired",
}

/**
 * @enum {string}
 * @description Represents the boxing stance of a fighter.
 */
export enum Stance {
  /** Left hand and foot forward (Right-handed) */
  ORTHODOX = "orthodox",
  /** Right hand and foot forward (Left-handed) */
  SOUTHPAW = "southpaw",
  /** Capable of fighting effectively in both stances */
  SWITCH = "switch",
}

/**
 * @interface IFighter
 * @description Data structure for fighter details retrieved from the API.
 */
export interface IFighter {
  /** Unique identifier for the fighter */
  id: number | string;
  /** Fighter's first name */
  firstName: string;
  /** Fighter's last name */
  lastName: string;
  /** Optional ring name or nickname */
  nickname?: string;
  /** URL to the fighter's profile image */
  image?: string;
  /** Country the fighter represents */
  nationality?: string;
  /** Fighter's date of birth */
  birthDate?: Date;
  /** Weight division (e.g., "Heavyweight", "Welterweight") */
  division: string;
  /** Primary boxing stance */
  stance?: Stance;
  /** Height in feet and inches (e.g., "5' 11\"") */
  height?: string;
  /** Arm span in inches (e.g., "72\"") */
  reach?: string;
  /** Detailed career statistics */
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  /** Calculated knockout rate percentage */
  ko_rate: number;
  /** Current professional status */
  status: FighterStatus;
  /** ISO timestamp of record creation */
  createdAt: Date;
  /** ISO timestamp of the most recent update */
  updatedAt: Date;
}

/**
 * @type IFighterPost
 * @description Data structure for creating or updating a fighter record via API.
 */
export type IFighterPost = Omit<Partial<IFighter>, "id" | "createdAt" | "updatedAt"> &
  Pick<IFighter, "firstName" | "lastName" | "division" | "status">;

/** @deprecated Use IFighterPost */
export type FighterPost = IFighterPost;
/** @deprecated Use IFighter */
export type FighterGet = IFighter;
