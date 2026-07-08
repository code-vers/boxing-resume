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
import { useDivisions, useRankings } from '@/features/rankings/hooks/useRankings';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';

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
  kos: number | string;
  lastSix: MatchOutcome[];
  rating: number | string;
  change: { direction: ChangeDirection; amount?: number };
  status: string;
}

// Removed mockData to ensure only real data is used.

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
const LastSixDisplay = ({ outcomes }: { outcomes: MatchOutcome[] }) => {
  if (!outcomes || outcomes.length === 0) {
    return <span className='text-[13px] font-bold text-primary'>Missing</span>;
  }

  return (
    <div className='flex items-center gap-1'>
      {outcomes.map((outcome, idx) => {
        let bgColor = 'bg-[#166534]';
        if (outcome === 'L') bgColor = 'bg-red-600';
        if (outcome === 'D') bgColor = 'bg-amber-400';

        return <div key={idx} className={`h-2.5 w-3.5 rounded-[2px] ${bgColor}`} title={outcome} />;
      })}
    </div>
  );
};

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
  return <span className='text-[13px] font-bold text-primary'>Missing</span>;
};

/**
 * @component RatingsTable
 * @description Renders the complete ratings view including the division tab navigation and the detailed data table.
 * @returns {JSX.Element}
 */
export default function RatingsTable() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch divisions
  const { data: divisionsRes } = useDivisions();
  const divisions = divisionsRes?.data || [];

  // Find division ID based on activeTab
  const currentDivisionId = divisions.find(
    (d: { id: string; name: string }) =>
      d.name.toLowerCase() === activeTab.toLowerCase() ||
      (activeTab === 'P4P' && d.name.toLowerCase() === 'heavyweight'),
  )?.id;

  // Fetch rankings for the division
  const { data: rankingsRes, isLoading } = useRankings(currentDivisionId);

  const mappedData = useMemo(() => {
    if (isLoading) return { data: [], totalPages: 0 };
    if (!rankingsRes?.data) return { data: [], totalPages: 0 }; // Fallback to empty array if error/no data

    // Flatten rankings from organizations and deduplicate
    const allRankings = rankingsRes.data.flatMap((org) => org.rankings || []);
    const uniqueFighters = new Map();

    allRankings
      .filter((r) => !r.is_vacant && r.fighter_id)
      .sort((a, b) => a.rank - b.rank)
      .forEach((r) => {
        if (!uniqueFighters.has(r.fighter_id)) {
          uniqueFighters.set(r.fighter_id, r);
        }
      });

    const finalRankings = Array.from(uniqueFighters.values());
    const totalPages = Math.ceil(finalRankings.length / 15);
    const pagedRankings = finalRankings.slice((currentPage - 1) * 15, currentPage * 15);

    if (pagedRankings.length === 0) return { data: [], totalPages: 0 };

    const mapped = pagedRankings.map((r, index) => {
      const names = r.fighter_name.split(' ');
      const firstName = names[0] || 'Unknown';
      const lastName = names.slice(1).join(' ') || '';

      const stats = r.fighter_details?.stats;
      const wins = stats?.wins || 0;
      const losses = stats?.losses || 0;
      const draws = stats?.draws || 0;

      const nickname =
        r.fighter_details?.nickname ||
        r.fighter_details?.alias ||
        `"${firstName.charAt(0)}${lastName.charAt(0)}"`;

      return {
        id: r.fighter_id!,
        rank: (currentPage - 1) * 15 + index + 1, // Re-rank based on unified list
        firstName,
        lastName,
        nickname: nickname.startsWith('"') ? nickname : `"${nickname}"`,
        record: { wins, losses, draws },
        kos: 'Missing', // API does not provide KOs
        lastSix: [], // API does not provide recent bout history directly
        rating: 'Missing', // Points/rating not provided by API
        change: { direction: 'none' as ChangeDirection }, // Change history not tracked by this API
        status: 'Active', // Ranked fighters are typically active
      };
    });

    return { data: mapped, totalPages };
  }, [rankingsRes, isLoading, currentPage]);

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
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`relative whitespace-nowrap px-4 py-4 text-[12px] font-bold transition-colors ${
                  isActive ? 'text-primary' : 'text-[#857F78] hover:text-primary'
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className='h-32 text-center'>
                      <Loader2 className='mx-auto h-6 w-6 animate-spin text-primary' />
                    </TableCell>
                  </TableRow>
                ) : (
                  mappedData.data.map((row) => (
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
                            <span className='text-[10px] font-bold tracking-widest'>
                              {row.firstName.charAt(0)}
                              {row.lastName.charAt(0)}
                            </span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-[13px] font-bold'>
                              {row.firstName} {row.lastName}
                            </span>
                            <span className='text-[11px] font-medium italic text-[#857F78]'>
                              {row.nickname}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <RecordDisplay
                          wins={row.record.wins}
                          losses={row.record.losses}
                          draws={row.record.draws}
                        />
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-medium text-[#857F78]'>
                        {row.kos}
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <LastSixDisplay outcomes={row.lastSix} />
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-bold text-primary'>
                        {row.rating}
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <ChangeDisplay change={row.change} />
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <Badge className='rounded-[4px] border-none bg-[#E6F4EA] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#166534] hover:bg-[#E6F4EA]'>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {mappedData.totalPages > 1 && (
            <div className='flex items-center justify-center pt-8 mt-8'>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className='h-8 px-4 flex items-center justify-center border border-[#d4cec4] rounded-md text-[13px] font-medium text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white shadow-sm'
                >
                  Prev
                </button>

                <div className='flex items-center gap-1'>
                  {[...Array(mappedData.totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={cn(
                        'h-8 w-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors shadow-sm',
                        currentPage === i + 1
                          ? 'bg-[#d72322] text-white'
                          : 'border border-transparent text-[#0a0a0a] hover:bg-white bg-white',
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(mappedData.totalPages, currentPage + 1))}
                  disabled={currentPage === mappedData.totalPages}
                  className='h-8 px-4 flex items-center justify-center border border-[#d4cec4] rounded-md text-[13px] font-medium text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white shadow-sm'
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
