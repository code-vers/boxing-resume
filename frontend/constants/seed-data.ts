import { FighterGet, FighterStatus, Stance } from "../types/Fighter.types";
import { EventGet, EventStatus } from "../types/Event.types";
import { MatchResult, WinMethod } from "../types/MatchRecords.types";
import { rankingGet } from "../types/Ranking.types";
import { TitleGet, TitleTier, TitleHistory, BoxingOrg } from "../types/Title.types";

/**
 * @const fighters
 * @type {FighterGet[]}
 * @description A collection of world-class professional fighters across various divisions.
 */
export const fighters: FighterGet[] = [
  {
    id: "f1",
    firstName: "Canelo",
    lastName: "Alvarez",
    nickname: "Saul",
    image: "https://example.com/fighters/canelo.jpg",
    nationality: "Mexico",
    birthDate: new Date("1990-07-18"),
    division: "Super Middleweight",
    stance: Stance.ORTHODOX,
    height: "5' 8\"",
    reach: "70\"",
    record: { wins: 60, losses: 2, draws: 2 },
    ko_rate: 65,
    status: FighterStatus.ACTIVE,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: "f2",
    firstName: "Tyson",
    lastName: "Fury",
    nickname: "The Gypsy King",
    image: "https://example.com/fighters/fury.jpg",
    nationality: "United Kingdom",
    birthDate: new Date("1988-08-12"),
    division: "Heavyweight",
    stance: Stance.ORTHODOX,
    height: "6' 9\"",
    reach: "85\"",
    record: { wins: 34, losses: 1, draws: 1 },
    ko_rate: 70,
    status: FighterStatus.ACTIVE,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-18"),
  },
  {
    id: "f3",
    firstName: "Oleksandr",
    lastName: "Usyk",
    nickname: "The Cat",
    image: "https://example.com/fighters/usyk.jpg",
    nationality: "Ukraine",
    birthDate: new Date("1987-01-17"),
    division: "Heavyweight",
    stance: Stance.SOUTHPAW,
    height: "6' 3\"",
    reach: "78\"",
    record: { wins: 22, losses: 0, draws: 0 },
    ko_rate: 64,
    status: FighterStatus.ACTIVE,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-18"),
  },
  {
    id: "f4",
    firstName: "Naoya",
    lastName: "Inoue",
    nickname: "The Monster",
    image: "https://example.com/fighters/inoue.jpg",
    nationality: "Japan",
    birthDate: new Date("1993-04-10"),
    division: "Super Bantamweight",
    stance: Stance.ORTHODOX,
    height: "5' 5\"",
    reach: "67\"",
    record: { wins: 27, losses: 0, draws: 0 },
    ko_rate: 89,
    status: FighterStatus.ACTIVE,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-06"),
  },
  {
    id: "f5",
    firstName: "Terence",
    lastName: "Crawford",
    nickname: "Bud",
    image: "https://example.com/fighters/crawford.jpg",
    nationality: "USA",
    birthDate: new Date("1987-09-28"),
    division: "Welterweight",
    stance: Stance.SWITCH,
    height: "5' 8\"",
    reach: "74\"",
    record: { wins: 40, losses: 0, draws: 0 },
    ko_rate: 77,
    status: FighterStatus.ACTIVE,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: "f6",
    firstName: "Gervonta",
    lastName: "Davis",
    nickname: "Tank",
    image: "https://example.com/fighters/davis.jpg",
    nationality: "USA",
    birthDate: new Date("1994-11-07"),
    division: "Lightweight",
    stance: Stance.SOUTHPAW,
    height: "5' 5\"",
    reach: "67\"",
    record: { wins: 29, losses: 0, draws: 0 },
    ko_rate: 93,
    status: FighterStatus.ACTIVE,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-01"),
  },
];

/**
 * @const events
 * @type {EventGet[]}
 * @description Major boxing events and fight nights.
 */
export const events: EventGet[] = [
  {
    id: "e1",
    eventName: "Fury vs Usyk: Ring of Fire",
    mainBout: "Tyson Fury vs Oleksandr Usyk",
    venue: "Kingdom Arena",
    location: "Riyadh, Saudi Arabia",
    image: "https://example.com/events/fury-usyk.jpg",
    bouts: 10,
    broadcast: "DAZN PPV",
    date: new Date("2024-05-18"),
    status: EventStatus.COMPLETED,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-19"),
  },
  {
    id: "e2",
    eventName: "Inoue vs Nery",
    mainBout: "Naoya Inoue vs Luis Nery",
    venue: "Tokyo Dome",
    location: "Tokyo, Japan",
    image: "https://example.com/events/inoue-nery.jpg",
    bouts: 8,
    broadcast: "ESPN+",
    date: new Date("2024-05-06"),
    status: EventStatus.COMPLETED,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-07"),
  },
  {
    id: "e3",
    eventName: "Canelo vs Munguia",
    mainBout: "Saul Alvarez vs Jaime Munguia",
    venue: "T-Mobile Arena",
    location: "Las Vegas, USA",
    image: "https://example.com/events/canelo-munguia.jpg",
    bouts: 12,
    broadcast: "Amazon Prime Video PPV",
    date: new Date("2024-05-04"),
    status: EventStatus.COMPLETED,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-05"),
  },
  {
    id: "e4",
    eventName: "Crawford vs Madrimov",
    mainBout: "Terence Crawford vs Israil Madrimov",
    venue: "BMO Stadium",
    location: "Los Angeles, USA",
    image: "https://example.com/events/crawford-madrimov.jpg",
    bouts: 10,
    broadcast: "DAZN PPV",
    date: new Date("2024-08-03"),
    status: EventStatus.UPCOMING,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
  },
];

/**
 * @const featuredFighters
 * @type {FighterGet[]}
 * @description A curated list of fighters for the landing page or sidebar.
 */
export const featuredFighters: FighterGet[] = fighters.slice(0, 4);

/**
 * @const recentResults
 * @type {MatchResult[]}
 * @description The latest 8 match results to display in results widgets.
 */
export const recentResults: MatchResult[] = [
  {
    id: "m1",
    date: new Date("2024-05-18"),
    winner: { id: "f3", firstName: "Oleksandr", lastName: "Usyk", nickname: "The Cat", image: "https://example.com/fighters/usyk.jpg" },
    loser: { id: "f2", firstName: "Tyson", lastName: "Fury", nickname: "The Gypsy King", image: "https://example.com/fighters/fury.jpg" },
    method: WinMethod.SD,
    round: 12,
    weight: "Heavyweight",
    title: "Undisputed Heavyweight Title",
    event: { id: "e1", eventName: "Fury vs Usyk", date: new Date("2024-05-18") },
    createdAt: new Date("2024-05-19"),
    updatedAt: new Date("2024-05-19"),
    poster: "https://example.com/posters/fury-usyk.jpg",
  },
  {
    id: "m2",
    date: new Date("2024-05-06"),
    winner: { id: "f4", firstName: "Naoya", lastName: "Inoue", nickname: "The Monster", image: "https://example.com/fighters/inoue.jpg" },
    loser: { id: "f7", firstName: "Luis", lastName: "Nery", image: "https://example.com/fighters/nery.jpg" },
    method: WinMethod.KO,
    round: 6,
    weight: "Super Bantamweight",
    title: "Undisputed Super Bantamweight Title",
    event: { id: "e2", eventName: "Inoue vs Nery", date: new Date("2024-05-06") },
    createdAt: new Date("2024-05-07"),
    updatedAt: new Date("2024-05-07"),
    poster: "https://example.com/posters/inoue-nery.jpg",
  },
  // Generated sample results for UI filling
  ...[1, 2, 3, 4, 5, 6].map(i => ({
    id: `m-recent-${i}`,
    date: new Date(2024, 3, i),
    winner: { id: "fw", firstName: "Winner", lastName: `${i}` },
    loser: { id: "fl", firstName: "Loser", lastName: `${i}` },
    method: WinMethod.UD,
    round: 12,
    weight: "Welterweight",
    title: "WBC Regional Title",
    event: { id: "e-old", eventName: `Old Event ${i}`, date: new Date(2024, 3, i) },
    createdAt: new Date(),
    updatedAt: new Date(),
    poster: "https://example.com/posters/generic.jpg",
  }))
];

/**
 * @const topRankings
 * @type {rankingGet[]}
 * @description A list of top 20 ranked fighters across divisions.
 */
export const topRankings: rankingGet[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => ({
  id: `r-${i}`,
  fighter: {
    id: fighters[i % fighters.length].id,
    firstName: fighters[i % fighters.length].firstName,
    lastName: fighters[i % fighters.length].lastName,
    nickname: fighters[i % fighters.length].nickname,
    image: fighters[i % fighters.length].image,
  },
  division: fighters[i % fighters.length].division,
  rank: i,
  createdAt: new Date("2024-01-01"),
  record: fighters[i % fighters.length].record,
  ko_rate: fighters[i % fighters.length].ko_rate,
  rating: 100 - i,
  status: "Active",
  updatedAt: new Date(),
}));

/**
 * @const upcomingSchedule
 * @type {EventGet[]}
 * @description Only the events that are scheduled for the future.
 */
export const upcomingSchedule: EventGet[] = events.filter(e => e.status === EventStatus.UPCOMING);

/**
 * @const allResults
 * @type {MatchResult[]}
 * @description A comprehensive history of 40 past matches for testing list views.
 */
export const allResults: MatchResult[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `m-all-${i}`,
  date: new Date(2023, i % 12, (i % 28) + 1),
  winner: { id: "fw", firstName: "Fighter", lastName: "Winner" },
  loser: { id: "fl", firstName: "Fighter", lastName: "Loser" },
  method: i % 3 === 0 ? WinMethod.KO : WinMethod.UD,
  round: i % 3 === 0 ? (i % 10) + 1 : 12,
  weight: "Middleweight",
  title: i % 5 === 0 ? "WBA World Title" : "Non-title",
  event: { id: `e-${i}`, eventName: `Great Fight Night ${i}`, date: new Date(2023, i % 12, (i % 28) + 1) },
  createdAt: new Date(),
  updatedAt: new Date(),
  poster: "https://example.com/posters/generic.jpg",
}));

/**
 * @const fightSchedule
 * @type {EventGet[]}
 * @description Convenient export for all scheduled events.
 */
export const fightSchedule: EventGet[] = [
  ...events,
  ...upcomingSchedule
];

/**
 * @const allFightResults
 * @type {MatchResult[]}
 * @description Convenient export for all past match results.
 */
export const allFightResults: MatchResult[] = allResults;

/**
 * @const fightHistory
 * @type {TitleHistory[]}
 * @description Historical record of championship wins for specific fighters.
 */
export const fightHistory: TitleHistory[] = [
  {
    id: "th1",
    fighterId: "f1",
    titleId: "t1",
    fighter: { firstName: "Canelo", lastName: "Alvarez", nickname: "Saul" },
    title: { beltName: "WBC World Super Middle", org: BoxingOrg.WBC, tier: TitleTier.WORLD, division: "Super Middleweight" },
    wonDate: new Date("2020-12-19"),
    isCurrent: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "th2",
    fighterId: "f3",
    titleId: "t2",
    fighter: { firstName: "Oleksandr", lastName: "Usyk", nickname: "The Cat" },
    title: { beltName: "Undisputed Heavyweight", org: BoxingOrg.WBA, tier: TitleTier.WORLD, division: "Heavyweight" },
    wonDate: new Date("2024-05-18"),
    isCurrent: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * @const allFighters
 * @type {FighterGet[]}
 * @description Global list of all fighters.
 */
export const allFighters: FighterGet[] = fighters;

/**
 * @const allEvents
 * @type {EventGet[]}
 * @description Global list of all events.
 */
export const allEvents: EventGet[] = events;
