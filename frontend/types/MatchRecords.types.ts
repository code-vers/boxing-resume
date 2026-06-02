export interface AddMatchRecord {
  id: number | string;
  date: Date;
  winnerId: number | string;
  loserId: number | string;
  method: string;
  round: number;
  weight: string;
  title: string;
  eventId: string; // event id
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
  method: string;
  round: number;
  weight: string;
  title: string;
  eventId: {
    id: number | string;
    name: string;
    date: Date;
  }; // event id
}
