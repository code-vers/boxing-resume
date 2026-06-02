export enum EventStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
}

interface addEvent {
  eventName: string;
  mainBout: string;
  venue: string;
  bouts: number;
  broadcast: string;
  date: Date;
  status: EventStatus;
}

export interface EventGet {
  id: number | string;
  eventName: string;
  mainBout: string;
  venue: string;
  bouts: number;
  broadcast: string;
  date: Date;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date; // here find the last update date of the event
}
