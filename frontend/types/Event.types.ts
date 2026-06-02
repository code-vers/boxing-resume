export enum EventStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
}

export interface addEvent {
  eventName: string;
  mainBout: string;
  venue: string;
  location?: string; // e.g., "Las Vegas, NV"
  image?: string;    // Poster image URL
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
  location?: string;
  image?: string;
  bouts: number;
  broadcast: string;
  date: Date;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}
