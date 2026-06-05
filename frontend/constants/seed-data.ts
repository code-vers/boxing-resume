import { IFighter, FighterStatus, Stance } from "../types/Fighter.types";
import { IEvent, EventStatus } from "../types/Event.types";
import { IMatch, WinMethod } from "../types/MatchRecords.types";
import { IRanking } from "../types/Ranking.types";
import {
  ITitle,
  TitleTier,
  ITitleHistory,
  BoxingOrg,
} from "../types/Title.types";
import { IOverviewData } from "../types/Overview.types";
import { IRecentActivity, IPendingReview } from "../types/Dashboard.types";
import { IReportsData } from "../types/Reports.types";
import { IUser, UserStatus } from "../types/User.types";
import { ROLES } from "./roles";

/**
 * ==========================================
 * ADMIN DASHBOARD DATA
 * ==========================================
 */

/**
 * @description Mock data for the administrative overview dashboard.
 */
export const dashboardOverview: IOverviewData = {
  title: "KO Rate Overview",
  stats: [
    {
      label: "Total Fighters",
      value: "1,247",
      trend: { value: "+12", label: "this week", type: "up" },
      icon: "👤",
      source: "Database",
    },
    {
      label: "Total Bouts",
      value: "3,892",
      trend: { value: "+8", label: "this week", type: "up" },
      icon: "🥊",
      source: "Records",
    },
    {
      label: "Registered Users",
      value: "12,384",
      trend: { value: "+156", label: "this week", type: "up" },
      icon: "👥",
      source: "Platform",
    },
    {
      label: "Active Title Holders",
      value: "68",
      trend: { value: "-", label: "No change", type: "stable" },
      icon: "🏆",
      source: "Belts",
    },
    {
      label: "Pending Reviews",
      value: "23",
      trend: { value: "-5", label: "today", type: "down" },
      icon: "⏳",
      source: "Admin",
    },
    {
      label: "Events This Month",
      value: "14",
      trend: { value: "+2", label: "this month", type: "up" },
      icon: "📅",
      source: "Events",
    },
    {
      label: "New Fighters",
      value: "12",
      trend: { value: "This week", label: "", type: "up" },
      icon: "✨",
      source: "Database",
    },
    {
      label: "Total Belts Tracked",
      value: "124",
      trend: { value: "-", label: "Stable", type: "stable" },
      icon: "🏅",
      source: "Titles",
    },
  ],
};

/**
 * @const recentActivities
 * @type {IRecentActivity[]}
 */
export const recentActivities: IRecentActivity[] = [
  {
    id: 1,
    content: "New fighter added: Mike Tyson Jr.",
    user: "Admin John",
    timestamp: "2m ago",
    type: "fighter",
  },
  {
    id: 2,
    content: "Fight result added: Smith vs Jones",
    user: "Admin Sarah",
    timestamp: "15m ago",
    type: "result",
  },
  {
    id: 3,
    content: "WBC Heavyweight belt updated",
    user: "Admin Mike",
    timestamp: "1h ago",
    type: "belt",
  },
  {
    id: 4,
    content: "New user registered: boxer_fan_2024",
    user: "System",
    timestamp: "2h ago",
    type: "user",
  },
  {
    id: 5,
    content: "Fighter profile updated: Floyd Jr.",
    user: "Admin John",
    timestamp: "3h ago",
    type: "fighter",
  },
  {
    id: 6,
    content: "Fight result edited: Garcia vs Lopez",
    user: "Admin Sarah",
    timestamp: "4h ago",
    type: "result",
  },
  {
    id: 7,
    content: "Database backup completed",
    user: "System",
    timestamp: "5h ago",
    type: "system",
  },
  {
    id: 8,
    content: "IBF Welterweight belt transferred",
    user: "Admin Mike",
    timestamp: "6h ago",
    type: "belt",
  },
  {
    id: 9,
    content: "User role changed: moderator_alex",
    user: "Admin John",
    timestamp: "7h ago",
    type: "user",
  },
  {
    id: 10,
    content: "Fighter photo uploaded: Anderson",
    user: "Admin Sarah",
    timestamp: "8h ago",
    type: "fighter",
  },
];

/**
 * @const pendingReviews
 * @type {IPendingReview[]}
 */
export const pendingReviews: IPendingReview[] = [
  {
    id: 1,
    category: "Fighter",
    content: "New fighter submission: Carlos Rodriguez",
  },
  {
    id: 2,
    category: "Result",
    content: "Fight result pending approval: Davis KO3",
  },
  {
    id: 3,
    category: "Belt",
    content: "Belt transfer request: WBA Lightweight",
  },
  {
    id: 4,
    category: "User",
    content: "User verification needed: pro_boxer_2024",
  },
  {
    id: 5,
    category: "Fighter",
    content: "Fighter stats update: Muhammad Ali Jr.",
  },
];

/**
 * ==========================================
 * STATS & REPORTS DATA
 * ==========================================
 */

/**
 * @const statsAndReportsData
 * @type {IReportsData}
 */
export const statsAndReportsData: IReportsData = {
  metrics: [
    { label: "Platform KO Rate", value: "64.8", unit: "%" },
    { label: "Average KOs per event", value: "4.2" },
    { label: "Most KOs in a month", value: "127" },
    { label: "KO Streak record", value: "15" },
  ],
  growth: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Fighters",
        data: [120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340],
        color: "#d92c2c",
      },
      {
        label: "Bouts",
        data: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
        color: "#374151",
      },
    ],
  },
  weightClassBreakdown: [
    { label: "Heavyweight", count: 250 },
    { label: "Cruiserweight", count: 160 },
    { label: "Light Heavyweight", count: 190 },
    { label: "Super Middleweight", count: 200 },
    { label: "Middleweight", count: 180 },
    { label: "Welterweight", count: 320 },
    { label: "Lightweight", count: 280 },
    { label: "Featherweight", count: 200 },
  ],
  peopleDatabase: [
    { id: 1, role: "Trainer", total: 342, active: 289, notable: "Freddie Roach" },
    { id: 2, role: "Coach", total: 156, active: 142, notable: "Eddy Reynoso" },
    { id: 3, role: "Manager", total: 89, active: 76, notable: "Al Haymon" },
    { id: 4, role: "Promoter", total: 45, active: 38, notable: "Eddie Hearn" },
    { id: 5, role: "Referee", total: 112, active: 95, notable: "Kenny Bayless" },
  ],
};

/**
 * ==========================================
 * USER MANAGEMENT DATA
 * ==========================================
 */

/**
 * @const userManagementStats
 * @description Statistics for the User Management dashboard.
 */
export const userManagementStats = [
  {
    label: "TOTAL USERS",
    value: "12,384",
    trend: { value: "+156", label: "this month", type: "up" as const },
  },
  {
    label: "ACTIVE TODAY",
    value: "2,847",
    trend: { value: "+43", label: "today", type: "up" as const },
  },
  {
    label: "NEW THIS MONTH",
    value: "156",
    trend: { value: "+12", label: "this week", type: "up" as const },
  },
  {
    label: "PENDING VERIFICATION",
    value: "23",
    trend: { value: "-5", label: "today", type: "down" as const },
  },
];

/**
 * @const users
 * @type {IUser[]}
 * @description Global list of all users for administrative management.
 */
export const users: IUser[] = [
  {
    id: "u1",
    username: "boxing_fan_2024",
    fullName: "John Smith",
    email: "john.smith@email.com",
    role: ROLES.USER,
    submissions: 12,
    joinedDate: new Date("2024-12-15"),
    status: UserStatus.ACTIVE,
  },
  {
    id: "u2",
    username: "ring_master_99",
    fullName: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: ROLES.ADMIN,
    submissions: 45,
    joinedDate: new Date("2023-11-20"),
    status: UserStatus.ACTIVE,
  },
  {
    id: "u3",
    username: "corner_man_mike",
    fullName: "Michael Brown",
    email: "mike.b@boxing.com",
    role: ROLES.USER,
    submissions: 5,
    joinedDate: new Date("2024-01-10"),
    status: UserStatus.PENDING,
  },
  {
    id: "u4",
    username: "punch_driller",
    fullName: "David Wilson",
    email: "david.w@email.net",
    role: ROLES.USER,
    submissions: 28,
    joinedDate: new Date("2023-05-14"),
    status: UserStatus.SUSPENDED,
  },
  {
    id: "u5",
    username: "gloves_off",
    fullName: "Emily Davis",
    email: "emily.d@boxing-fan.com",
    role: ROLES.USER,
    submissions: 0,
    joinedDate: new Date("2024-05-02"),
    status: UserStatus.ACTIVE,
  },
];

/**
 * ==========================================
 * CORE DOMAIN DATA (Fighters, Events, etc.)
 * ==========================================
 */

/**
 * @const fighters
 * @type {IFighter[]}
 * @description A collection of world-class professional fighters across various divisions.
 */
export const fighters: IFighter[] = [
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
    reach: '70"',
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
    reach: '85"',
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
    reach: '78"',
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
    reach: '67"',
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
    reach: '74"',
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
    reach: '67"',
    record: { wins: 29, losses: 0, draws: 0 },
    ko_rate: 93,
    status: FighterStatus.ACTIVE,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-05-01"),
  },
];

/**
 * @const events
 * @type {IEvent[]}
 * @description Major boxing events and fight nights.
 */
export const events: IEvent[] = [
  {
    id: "e1",
    eventName: "Fury vs Usyk II: Reignited",
    mainBout: "Tyson Fury vs Oleksandr Usyk",
    venue: "Kingdom Arena",
    location: "Riyadh, Saudi Arabia",
    image: "https://example.com/events/fury-usyk.jpg",
    bouts: 12,
    broadcast: "DAZN PPV",
    date: new Date("2024-12-21"),
    status: EventStatus.UPCOMING,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
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
  {
    id: "e5",
    eventName: "Davis vs Martin",
    mainBout: "Gervonta Davis vs Frank Martin",
    venue: "MGM Grand Garden Arena",
    location: "Las Vegas, USA",
    image: "https://example.com/events/davis-martin.jpg",
    bouts: 10,
    broadcast: "PBC on Prime Video",
    date: new Date("2024-06-15"),
    status: EventStatus.UPCOMING,
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: "e6",
    eventName: "Bam Rodriguez vs Estrada",
    mainBout: "Jesse Rodriguez vs Juan Francisco Estrada",
    venue: "Footprint Center",
    location: "Phoenix, USA",
    image: "https://example.com/events/bam-estrada.jpg",
    bouts: 9,
    broadcast: "DAZN",
    date: new Date("2024-06-29"),
    status: EventStatus.UPCOMING,
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15"),
  },
];

/**
 * @const featuredFighters
 * @type {IFighter[]}
 * @description A curated list of fighters for the landing page or sidebar.
 */
export const featuredFighters: IFighter[] = fighters.slice(0, 4);

/**
 * @const recentResults
 * @type {IMatch[]}
 * @description The latest 8 match results to display in results widgets.
 */
export const recentResults: IMatch[] = [
  {
    id: "m1",
    date: new Date("2024-05-18"),
    winner: {
      id: "f3",
      firstName: "Oleksandr",
      lastName: "Usyk",
      nickname: "The Cat",
      image: "https://example.com/fighters/usyk.jpg",
    },
    loser: {
      id: "f2",
      firstName: "Tyson",
      lastName: "Fury",
      nickname: "The Gypsy King",
      image: "https://example.com/fighters/fury.jpg",
    },
    method: WinMethod.SD,
    round: 12,
    weight: "Heavyweight",
    title: "Undisputed Heavyweight Title",
    event: {
      id: "e1",
      eventName: "Fury vs Usyk",
      date: new Date("2024-05-18"),
    },
    createdAt: new Date("2024-05-19"),
    updatedAt: new Date("2024-05-19"),
    poster: "https://example.com/posters/fury-usyk.jpg",
  },
  {
    id: "m2",
    date: new Date("2024-05-06"),
    winner: {
      id: "f4",
      firstName: "Naoya",
      lastName: "Inoue",
      nickname: "The Monster",
      image: "https://example.com/fighters/inoue.jpg",
    },
    loser: {
      id: "f7",
      firstName: "Luis",
      lastName: "Nery",
      image: "https://example.com/fighters/nery.jpg",
    },
    method: WinMethod.KO,
    round: 6,
    weight: "Super Bantamweight",
    title: "Undisputed Super Bantamweight Title",
    event: {
      id: "e2",
      eventName: "Inoue vs Nery",
      date: new Date("2024-05-06"),
    },
    createdAt: new Date("2024-05-07"),
    updatedAt: new Date("2024-05-07"),
    poster: "https://example.com/posters/inoue-nery.jpg",
  },
  // Generated sample results for UI filling
  ...[1, 2, 3, 4, 5, 6].map((i) => ({
    id: `m-recent-${i}`,
    date: new Date(2024, 3, i),
    winner: { id: "fw", firstName: "Winner", lastName: `${i}` },
    loser: { id: "fl", firstName: "Loser", lastName: `${i}` },
    method: WinMethod.UD,
    round: 12,
    weight: "Welterweight",
    title: "WBC Regional Title",
    event: {
      id: "e-old",
      eventName: `Old Event ${i}`,
      date: new Date(2024, 3, i),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    poster: "https://example.com/posters/generic.jpg",
  })),
];

/**
 * @const topRankings
 * @type {IRanking[]}
 * @description A list of top 20 ranked fighters across divisions.
 */
export const topRankings: IRanking[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
].map((i) => ({
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
 * @type {IEvent[]}
 * @description Only the events that are scheduled for the future.
 */
export const upcomingSchedule: IEvent[] = events.filter(
  (e) => e.status === EventStatus.UPCOMING,
);

/**
 * @const allResults
 * @type {IMatch[]}
 * @description A comprehensive history of 40 past matches for testing list views.
 */
export const allResults: IMatch[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `m-all-${i}`,
  date: new Date(2023, i % 12, (i % 28) + 1),
  winner: { id: "fw", firstName: "Fighter", lastName: "Winner" },
  loser: { id: "fl", firstName: "Fighter", lastName: "Loser" },
  method: i % 3 === 0 ? WinMethod.KO : WinMethod.UD,
  round: i % 3 === 0 ? (i % 10) + 1 : 12,
  weight: "Middleweight",
  title: i % 5 === 0 ? "WBA World Title" : "Non-title",
  event: {
    id: `e-${i}`,
    eventName: `Great Fight Night ${i}`,
    date: new Date(2023, i % 12, (i % 28) + 1),
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  poster: "https://example.com/posters/generic.jpg",
}));

/**
 * @const fightSchedule
 * @type {IEvent[]}
 * @description Convenient export for all scheduled events.
 */
export const fightSchedule: IEvent[] = [...events, ...upcomingSchedule];

/**
 * @const allFightResults
 * @type {IMatch[]}
 * @description Convenient export for all past match results.
 */
export const allFightResults: IMatch[] = allResults;

/**
 * @const fightHistory
 * @type {ITitleHistory[]}
 * @description Historical record of championship wins for specific fighters.
 */
export const fightHistory: ITitleHistory[] = [
  {
    id: "th1",
    fighterId: "f1",
    titleId: "t1",
    fighter: { firstName: "Canelo", lastName: "Alvarez", nickname: "Saul" },
    title: {
      beltName: "WBC World Super Middle",
      org: BoxingOrg.WBC,
      tier: TitleTier.WORLD,
      division: "Super Middleweight",
    },
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
    title: {
      beltName: "Undisputed Heavyweight",
      org: BoxingOrg.WBA,
      tier: TitleTier.WORLD,
      division: "Heavyweight",
    },
    wonDate: new Date("2024-05-18"),
    isCurrent: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * @const allFighters
 * @type {IFighter[]}
 * @description Global list of all fighters.
 */
export const allFighters: IFighter[] = fighters;

/**
 * @const allEvents
 * @type {IEvent[]}
 * @description Global list of all events.
 */
export const allEvents: IEvent[] = events;
