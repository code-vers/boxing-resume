export interface rankingGet {
  id: number | string;
  fighter: {
    id: number | string;
    firstName: string;
    lastName: string;
    nickname?: string;
    image?: string;
  };
  division: string;
  rank: number;
  createdAt: Date;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  ko_rate: number;
  rating: number;
  status: string;

  updatedAt: Date; // here find the last update date of the ranking
}
