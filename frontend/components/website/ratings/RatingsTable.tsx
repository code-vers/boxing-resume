'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';

/**
 * @type MatchOutcome
 * @description Represents the result of a single match for the Last 6 indicator.
 */
type MatchOutcome = 'W' | 'L' | 'D';

/**
 * @type ChangeDirection
 * @description Represents the direction of a fighter's ranking change.
 */
type ChangeDirection = 'up' | 'down' | 'new' | 'none';

/**
 * @interface FighterRating
 * @description Defines the data structure for a single fighter's row in the ratings table.
 */
interface FighterRating {
  id: string;
  rank: number;
  firstName: string;
  lastName: string;
  nickname: string;
  record: { wins: number; losses: number; draws: number };
  kos: number;
  lastSix: MatchOutcome[];
  rating: number;
  change: { direction: ChangeDirection; amount?: number };
  status: string;
}

/**
 * @constant mockData
 * @description Seed data mimicking the exact visual layout of the Figma ratings table.
 */
const mockData: FighterRating[] = [
  {
    id: '1',
    rank: 1,
    firstName: 'Oleksandr',
    lastName: 'Usyk',
    nickname: '"The Cat"',
    record: { wins: 22, losses: 0, draws: 0 },
    kos: 14,
    lastSix: ['W', 'W', 'W', 'W', 'W', 'W'],
    rating: 1876,
    change: { direction: 'up', amount: 12 },
    status: 'Active',
  },
  {
    id: '2',
    rank: 2,
    firstName: 'Oleksandr',
    lastName: 'Usyk',
    nickname: '"The Cat"',
    record: { wins: 22, losses: 0, draws: 0 },
    kos: 36,
    lastSix: ['W', 'W', 'W', 'W', 'L', 'D'],
    rating: 1876,
    change: { direction: 'down', amount: 5 },
    status: 'Active',
  },
  {
    id: '3',
    rank: 3,
    firstName: 'Oleksandr',
    lastName: 'Usyk',
    nickname: '"The Cat"',
    record: { wins: 22, losses: 0, draws: 0 },
    kos: 62,
    lastSix: ['W', 'W', 'W', 'W', 'W', 'W'],
    rating: 1876,
    change: { direction: 'up', amount: 12 },
    status: 'Active',
  },
  {
    id: '4',
    rank: 4,
    firstName: 'Oleksandr',
    lastName: 'Usyk',
    nickname: '"The Cat"',
    record: { wins: 22, losses: 0, draws: 0 },
    kos: 52,
    lastSix: ['W', 'W', 'W', 'W', 'W', 'W'],
    rating: 1876,
    change: { direction: 'up', amount: 12 },
    status: 'Active',
  },
  {
    id: '5',
    rank: 5,
    firstName: 'Oleksandr',
    lastName: 'Usyk',
    nickname: '"The Cat"',
    record: { wins: 22, losses: 0, draws: 0 },
    kos: 12,
    lastSix: ['W', 'W', 'W', 'W', 'W', 'W'],
    rating: 1876,
    change: { direction: 'new' },
    status: 'Active',
  },
  {
    id: '6',
    rank: 6,
    firstName: 'Oleksandr',
    lastName: 'Usyk',
    nickname: '"The Cat"',
    record: { wins: 22, losses: 0, draws: 0 },
    kos: 26,
    lastSix: ['W', 'W', 'W', 'W', 'W', 'W'],
    rating: 1876,
    change: { direction: 'up', amount: 12 },
    status: 'Active',
  },
  ...Array(15)
    .fill({
      id: 'x',
      rank: 7,
      firstName: 'Oleksandr',
      lastName: 'Usyk',
      nickname: '"The Cat"',
      record: { wins: 22, losses: 0, draws: 0 },
      kos: 12,
      lastSix: ['W', 'W', 'W', 'W', 'W', 'W'],
      rating: 1876,
      change: { direction: 'up', amount: 12 },
      status: 'Active',
    })
    .map((item, idx) => ({ ...item, id: `7_${idx}` })),
];

/**
 * @constant TABS
 * @description The available division categories for the top navigation bar.
 */
const TABS = [
  'P4P',
  'Heavyweight',
  'Light Heavyweight',
  'Middleweight',
  'Welterweight',
  'Lightweight',
];

/**
 * @component RecordDisplay
 * @description Renders a formatted W-L-D string with distinct color coding for wins, losses, and draws.
 * @param {number} wins - Total wins
 * @param {number} losses - Total losses
 * @param {number} draws - Total draws
 * @returns {JSX.Element}
 */
const RecordDisplay = ({
  wins,
  losses,
  draws,
}: {
  wins: number;
  losses: number;
  draws: number;
}) => (
  <span className='text-[12px] font-bold tracking-wider'>
    <span className='text-[#166534]'>{wins}</span>
    <span className='mx-0.5 text-muted-foreground'>-</span>
    <span className='text-red-600'>{losses}</span>
    <span className='mx-0.5 text-muted-foreground'>-</span>
    <span className='text-amber-500'>{draws}</span>
  </span>
);

/**
 * @component LastSixDisplay
 * @description Renders an array of 6 tiny colored blocks representing recent match outcomes.
 * @param {MatchOutcome[]} outcomes - Array of W, L, or D strings
 * @returns {JSX.Element}
 */
const LastSixDisplay = ({ outcomes }: { outcomes: MatchOutcome[] }) => (
  <div className='flex items-center gap-1'>
    {outcomes.map((outcome, idx) => {
      let bgColor = 'bg-[#166534]';
      if (outcome === 'L') bgColor = 'bg-red-600';
      if (outcome === 'D') bgColor = 'bg-amber-400';

      return <div key={idx} className={`h-2.5 w-3.5 rounded-[2px] ${bgColor}`} title={outcome} />;
    })}
  </div>
);

/**
 * @component ChangeDisplay
 * @description Dynamically renders the ranking change indicator (Up arrow, Down arrow, or 'New' badge).
 * @param {FighterRating['change']} change - The change object containing direction and amount
 * @returns {JSX.Element}
 */
const ChangeDisplay = ({ change }: { change: FighterRating['change'] }) => {
  if (change.direction === 'new') {
    return (
      <Badge
        variant='outline'
        className='h-4 rounded-[3px] border-red-200 bg-red-50 px-1.5 py-0 text-[9px] font-bold uppercase tracking-widest text-red-500'
      >
        New
      </Badge>
    );
  }
  if (change.direction === 'up') {
    return (
      <span className='flex items-center text-[12px] font-bold text-[#166534]'>
        <ArrowUp className='mr-0.5 h-3 w-3' strokeWidth={3} />+{change.amount}
      </span>
    );
  }
  if (change.direction === 'down') {
    return (
      <span className='flex items-center text-[12px] font-bold text-red-500'>
        <ArrowDown className='mr-0.5 h-3 w-3' strokeWidth={3} />-{change.amount}
      </span>
    );
  }
  return <span className='text-[12px] font-medium text-muted-foreground'>-</span>;
};

/**
 * @component RatingsTable
 * @description Renders the complete ratings view including the division tab navigation and the detailed data table.
 * @returns {JSX.Element}
 */
export default function RatingsTable() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className='flex w-full flex-col font-sans'>
      {/* 1. TOP TABS NAVIGATION */}
      <div className='w-full border-b border-[#E8E2D8] bg-white'>
        <div className='hide-scrollbar mx-auto flex items-center overflow-x-auto px-4 sm:px-6 md:px-8 xl:px-12'>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap px-4 py-4 text-[12px] font-bold transition-colors ${isActive ? 'text-primary' : 'text-[#857F78] hover:text-primary'
                  }`}
              >
                {tab}
                {isActive && (
                  <div className='absolute bottom-0 left-0 h-[2px] w-full bg-[#D72322]' />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TABLE SECTION - Custom beige bg */}
      <section className='w-full bg-[#F5F3ED] py-10 md:py-12'>
        <div className='mx-auto px-4 sm:px-6 md:px-8 xl:px-12'>
          <div className='mb-6'>
            <h2 className='text-xl font-black uppercase tracking-tight text-primary md:text-2xl'>
              Recent Results
            </h2>
          </div>

          {/* Table Wrapper - White background with specific border */}
          <div className='w-full overflow-hidden rounded-[8px] border border-[#E8E2D8] bg-white shadow-sm'>
            <Table className='min-w-[900px]'>
              <TableHeader>
                <TableRow className='border-b-[#E8E2D8] hover:bg-transparent'>
                  <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#857F78]'>
                    Rank
                  </TableHead>
                  <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#857F78]'>
                    Fighter
                  </TableHead>
                  <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#857F78]'>
                    Record
                  </TableHead>
                  <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#857F78]'>
                    KOs
                  </TableHead>
                  <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#857F78]'>
                    Last 6
                  </TableHead>
                  <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#857F78]'>
                    Rating
                  </TableHead>
                  <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#857F78]'>
                    Change
                  </TableHead>
                  <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#857F78]'>
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mockData.map((row) => (
                  <TableRow
                    key={row.id}
                    className='border-b-[#E8E2D8] transition-colors hover:bg-gray-50'
                  >
                    <TableCell className='px-6 py-4 text-[13px] font-medium text-[#857F78]'>
                      {row.rank}
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D72322] bg-black text-white'>
                          <span className='text-[10px] font-bold tracking-widest'>OU</span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-[13px] font-bold'>Oleksandr Usyk</span>
                          <span className='text-[11px] font-medium italic text-[#857F78]'>
                            `The Cat`
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      <RecordDisplay wins={22} losses={0} draws={0} />
                    </TableCell>
                    <TableCell className='px-6 py-4 text-[13px] font-medium text-[#857F78]'>
                      14
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      <LastSixDisplay outcomes={row.lastSix} />
                    </TableCell>
                    <TableCell className='px-6 py-4 text-[13px] font-bold text-primary'>
                      1876
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      <ChangeDisplay change={row.change} />
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      <Badge className='rounded-[4px] border-none bg-[#E6F4EA] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#166534] hover:bg-[#E6F4EA]'>
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}
