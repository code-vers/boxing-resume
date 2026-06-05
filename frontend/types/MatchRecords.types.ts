/**
 * @enum {string}
 * @description Standardized winning methods in professional boxing.
 */
export enum WinMethod {
  /** Victory by pure knockout */
  KO = "KO",
  /** Victory by Technical Knockout (referee intervention) */
  TKO = "TKO",
  /** Victory by Unanimous Decision of all judges */
  UD = "UD",
  /** Victory by Majority Decision */
  MD = "MD",
  /** Victory by Split Decision */
  SD = "SD",
  /** Victory via opponent disqualification */
  DQ = "DQ",
  /** Match ruled as a No Contest (e.g., accidental headbutt) */
  NC = "NC",
  /** Match ruled as a draw */
  DRAW = "DRAW",
}

/**
 * @interface IMatch
 * @description Complete match result object with populated entity details.
 */
export interface IMatch {
  /** Unique match record ID */
  id: number | string;
  /** Date the fight took place */
  date: Date;
  /** Basic details of the winner */
  winner: {
    id: number | string;
    firstName: string;
    lastName: string;
    nickname?: string;
    image?: string;
  };
  /** Basic details of the loser */
  loser: {
    id: number | string;
    firstName: string;
    lastName: string;
    nickname?: string;
    image?: string;
  };
  /** Outcome method */
  method: WinMethod;
  /** Final round reached */
  round: number;
  /** Competition weight class */
  weight: string;
  /** Title belts contested */
  title?: string;
  /** Basic event information */
  event: {
    id: number | string;
    eventName: string;
    date: Date;
  };
  /** System creation timestamp */
  createdAt: Date;
  /** System update timestamp */
  updatedAt: Date;
  /** Match-specific promotional poster */
  poster?: string;
}

/**
 * @type IMatchPost
 * @description Input schema for recording a new match result.
 */
export type IMatchPost = Omit<
  IMatch,
  "winner" | "loser" | "event" | "createdAt" | "updatedAt"
> & {
  /** System ID of the winning fighter */
  winner: number | string;
  /** System ID of the losing fighter */
  loser: number | string;
  /** ID of the associated boxing event */
  event: string;
};

/**
 * @interface IFightHistory
 * @description A fighter's professional record and full list of match outcomes.
 */
export interface IFightHistory {
  /** The fighter's unique identifier */
  fighterId: number | string;
  /** Cumulative count of professional fights */
  totalFights: number;
  /** Sequential list of all match results */
  results: IMatch[];
}

/** @deprecated Use IMatchPost */
export type AddMatchRecord = IMatchPost;
/** @deprecated Use IMatch */
export type MatchResult = IMatch;
/** @deprecated Use IFightHistory */
export type FightHistory = IFightHistory;
