/**
 * @interface rankingGet
 * @description Data structure for a fighter's rank within a specific weight division.
 */
export interface rankingGet {
  /** Unique ranking record identifier */
  id: number | string;
  /** Essential details of the ranked fighter */
  fighter: {
    /** Fighter's unique ID */
    id: number | string;
    /** Fighter's first name */
    firstName: string;
    /** Fighter's last name */
    lastName: string;
    /** Optional nickname */
    nickname?: string;
    /** URL to profile image */
    image?: string;
  };
  /** Weight division the rank belongs to */
  division: string;
  /** Current position in the division (e.g., 1 for champion or top rank) */
  rank: number;
  /** Date the rank was originally assigned or record started */
  createdAt: Date;
  /** Fighter's career record at the time of this ranking snapshot */
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  /** Win-by-knockout percentage */
  ko_rate: number;
  /** Quantitative performance score */
  rating: number;
  /** Current status of the ranking entry (e.g., "Active", "Retired") */
  status: string;
  /** Timestamp of the most recent rank update */
  updatedAt: Date;
}
