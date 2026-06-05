/**
 * @enum {string}
 * @description Defines the lifecycle state of a boxing event.
 */
export enum EventStatus {
  /** Event is scheduled but has not yet started */
  UPCOMING = "upcoming",
  /** Event is currently taking place */
  ONGOING = "ongoing",
  /** Event has concluded and all results are in */
  COMPLETED = "completed",
}

/**
 * @interface IEvent
 * @description Full event details retrieved from the system.
 */
export interface IEvent {
  /** Unique system identifier for the event */
  id: number | string;
  /** Title of the event (e.g., "Rumble in the Jungle") */
  eventName: string;
  /** The headline fight/main event */
  mainBout: string;
  /** Name of the venue (e.g., "Madison Square Garden") */
  venue: string;
  /** Geographical location (e.g., "New York, USA") */
  location?: string;
  /** URL to the official event poster or promotional image */
  image?: string;
  /** Total number of fights scheduled for the night */
  bouts: number;
  /** Official broadcast partner or channel */
  broadcast: string;
  /** Scheduled start date and time */
  date: Date;
  /** Current state of the event */
  status: EventStatus;
  /** System timestamp of creation */
  createdAt: Date;
  /** System timestamp of last modification */
  updatedAt: Date;
}

/**
 * @type IEventPost
 * @description Schema for creating a new boxing event or fight night.
 */
export type IEventPost = Omit<IEvent, "id" | "createdAt" | "updatedAt">;

/** @deprecated Use IEventPost */
export type addEvent = IEventPost;
/** @deprecated Use IEvent */
export type EventGet = IEvent;
