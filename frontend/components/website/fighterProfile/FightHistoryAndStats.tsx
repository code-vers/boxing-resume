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
import { Trophy } from 'lucide-react';

/**
 * @interface FightHistoryRecord
 * @description Data structure for a single row in the fight history table.
 */
interface FightHistoryRecord {
  id: string;
  date: string;
  opponent: string;
  result: string;
  method: string;
  rounds: number;
  isTitleFight: boolean;
}

/**
 * @interface PunchStats
 * @description Data structure for the punch statistics overview.
 */
interface PunchStats {
  thrown: { value: string; percentage: number };
  landed: { value: string; percentage: number };
  accuracy: { value: string; percentage: number };
  powerPunches: { value: string; percentage: number };
}

/**
 * @interface FighterDetail
 * @description Data structure for the fighter details key-value list.
 */
interface FighterDetail {
  label: string;
  value: string;
}

/**
 * @interface BeltHistoryRecord
 * @description Data structure for historical championship belts held.
 */
interface BeltHistoryRecord {
  id: string;
  belt: string;
  org: string;
  duration: string;
}

/**
 * @interface AlsoFoughtRecord
 * @description Data structure for previous notable opponents.
 */
interface AlsoFoughtRecord {
  id: string;
  opponent: string;
  result: 'W' | 'L' | 'D';
}

// --- MOCK DATA ---

const mockHistoryData: FightHistoryRecord[] = Array(8)
  .fill({
    date: 'May 18, 2026',
    opponent: 'Dmitry Bivol',
    result: 'UD',
    method: 'UD',
    rounds: 12,
    isTitleFight: true,
  })
  .map((item, idx) => ({ ...item, id: `history_${idx}` }));

const mockPunchStats: PunchStats = {
  thrown: { value: '8,420', percentage: 85 },
  landed: { value: '3,567', percentage: 70 },
  accuracy: { value: '42%', percentage: 42 },
  powerPunches: { value: '68%', percentage: 68 },
};

const mockDetails: FighterDetail[] = [
  { label: 'Full Name', value: 'Santos Saúl Álvarez Barragán' },
  { label: 'Born', value: 'July 18, 1990' },
  { label: 'Nationality', value: 'Mexican' },
  { label: 'Residence', value: 'Guadalajara, Mexico' },
  { label: 'Height', value: '5\'9" / 175cm' },
  { label: 'Reach', value: '70.5" / 179cm' },
  { label: 'Stance', value: 'Orthodox' },
  { label: 'Pro Since', value: '2005' },
  { label: 'Total Fights', value: '65' },
];

const mockBelts: BeltHistoryRecord[] = [
  { id: 'wba', belt: 'WBA Super Middleweight', org: 'WBA', duration: '2021-Present' },
  { id: 'wbo', belt: 'WBO Super Middleweight', org: 'WBO', duration: '2021-Present' },
  { id: 'wbc', belt: 'WBC Super Middleweight', org: 'WBC', duration: '2021-Present' },
  { id: 'ibf', belt: 'IBF Super Middleweight', org: 'IBF', duration: '2021-Present' },
];

const mockAlsoFought: AlsoFoughtRecord[] = [
  { id: 'bivol', opponent: 'Dmitry Bivol', result: 'L' },
  { id: 'ggg', opponent: 'Gennady Golovkin', result: 'W' },
  { id: 'kovalev', opponent: 'Sergey Kovalev', result: 'W' },
];

// --- SUB-COMPONENTS ---

/**
 * @component StatProgressBar
 * @description Renders an individual punch statistic with a value, label, and visual progress indicator.
 */
const StatProgressBar = ({
  value,
  label,
  fillPercentage,
}: {
  value: string;
  label: string;
  fillPercentage: number;
}) => (
  <div className='flex w-full flex-col'>
    <span className='text-2xl font-black tracking-tight text-text-accent sm:text-3xl'>{value}</span>
    <span className='mt-1 text-[11px] font-medium text-text-placeholder'>{label}</span>
    <div className='mt-3 h-[3px] w-full rounded-full bg-divider'>
      <div
        className='h-full rounded-full bg-text-accent transition-all duration-500 ease-out'
        style={{ width: `${fillPercentage}%` }}
      />
    </div>
  </div>
);

/**
 * @component FullWidthCard
 * @description Reusable full-width layout container for the bottom data blocks.
 */
const FullWidthCard = ({
  title,
  children,
  dark = false,
}: {
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    className={`w-full overflow-hidden rounded-[8px] shadow-sm ${dark ? 'bg-card-dark' : 'border border-divider bg-surface-white'}`}
  >
    <div className={`border-b px-6 py-4 sm:px-8 ${dark ? 'border-[#1F1F1F]' : 'border-divider'}`}>
      <h3
        className={`text-[14px] font-black uppercase tracking-tight ${dark ? 'text-surface-white' : 'text-text-primary'}`}
      >
        {title}
      </h3>
    </div>
    <div className='flex flex-col'>{children}</div>
  </div>
);

// --- MAIN COMPONENT ---

/**
 * @component FightHistoryAndStats
 * @description Renders the comprehensive fighter profile data area in a strict, vertically stacked layout.
 * @returns {JSX.Element}
 */
export default function FightHistoryAndStats() {
  return (
    <div className='flex w-full flex-col bg-page-bg pb-16 pt-10 font-sans md:pt-14'>
      {/* Container: Strict Vertical Stack */}
      <div className='mx-auto flex w-full flex-col gap-10 px-4 sm:px-6 lg:px-8'>
        {/* SECTION 1: Fight History */}
        <section className='w-full'>
          <div className='mb-6'>
            <h2 className='text-[18px] font-black uppercase tracking-tight text-text-primary md:text-[22px]'>
              Fight History
            </h2>
          </div>
          <div className='w-full overflow-hidden rounded-[8px] border border-divider bg-surface-white shadow-sm'>
            <div className='overflow-x-auto'>
              <Table className='min-w-[900px]'>
                <TableHeader>
                  <TableRow className='border-b-divider hover:bg-transparent'>
                    <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Date
                    </TableHead>
                    <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Opponent
                    </TableHead>
                    <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Result
                    </TableHead>
                    <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Method
                    </TableHead>
                    <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Rounds
                    </TableHead>
                    <TableHead className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Title
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHistoryData.map((row) => (
                    <TableRow
                      key={row.id}
                      className='border-b-divider transition-colors hover:bg-page-bg/40'
                    >
                      <TableCell className='px-6 py-4 text-[13px] font-medium text-text-placeholder'>
                        {row.date}
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-bold text-text-primary'>
                        {row.opponent}
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <Badge className='rounded-[4px] border-none bg-[#E6F4EA] px-2.5 py-0.5 text-[10px] font-black tracking-widest text-[#166534] hover:bg-[#E6F4EA]'>
                          {row.result}
                        </Badge>
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-medium text-text-placeholder'>
                        {row.method}
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-bold text-text-primary'>
                        {row.rounds}
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        {row.isTitleFight && (
                          <Trophy size={18} strokeWidth={2} className='text-text-accent' />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* SECTION 2: Punch Statistics */}
        <section className='w-full'>
          <div className='mb-6'>
            <h2 className='text-[18px] font-black uppercase tracking-tight text-text-primary md:text-[22px]'>
              Punch Statistics
            </h2>
          </div>
          <div className='grid w-full grid-cols-1 gap-8 rounded-[8px] border border-divider bg-surface-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4 md:p-8'>
            <StatProgressBar
              value={mockPunchStats.thrown.value}
              label='Punches Thrown'
              fillPercentage={mockPunchStats.thrown.percentage}
            />
            <StatProgressBar
              value={mockPunchStats.landed.value}
              label='Punches Landed'
              fillPercentage={mockPunchStats.landed.percentage}
            />
            <StatProgressBar
              value={mockPunchStats.accuracy.value}
              label='Accuracy'
              fillPercentage={mockPunchStats.accuracy.percentage}
            />
            <StatProgressBar
              value={mockPunchStats.powerPunches.value}
              label='Power Punches'
              fillPercentage={mockPunchStats.powerPunches.percentage}
            />
          </div>
        </section>

        {/* SECTION 3: Fighter Details */}
        <FullWidthCard title='Fighter Details'>
          {mockDetails.map((detail, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between border-b border-divider px-6 py-4 sm:px-8 last:border-0 hover:bg-page-bg/20 transition-colors'
            >
              <span className='text-[13px] font-medium text-text-placeholder'>{detail.label}</span>
              <span className='text-[13px] font-bold text-text-primary text-right'>
                {detail.value}
              </span>
            </div>
          ))}
        </FullWidthCard>

        {/* SECTION 4: Belt History (Dark Variant) */}
        <FullWidthCard title='Belt History' dark>
          {mockBelts.map((belt) => (
            <div
              key={belt.id}
              className='flex items-center justify-between border-b border-[#1F1F1F] px-6 py-4 sm:px-8 last:border-0 hover:bg-[#111111] transition-colors'
            >
              <span className='text-[13px] font-bold text-surface-white'>{belt.belt}</span>
              <div className='flex items-center gap-2'>
                <span className='text-[10px] font-black text-text-accent'>{belt.org}</span>
                <span className='text-[12px] font-medium text-[#857F78]'>{belt.duration}</span>
              </div>
            </div>
          ))}
        </FullWidthCard>

        {/* SECTION 5: Also Fought */}
        <FullWidthCard title='Also Fought'>
          {mockAlsoFought.map((fight) => (
            <div
              key={fight.id}
              className='flex items-center justify-between border-b border-divider px-6 py-4 sm:px-8 last:border-0 hover:bg-page-bg/20 transition-colors'
            >
              <span className='text-[13px] font-bold text-text-primary'>{fight.opponent}</span>
              <div
                className={`flex h-[24px] w-[24px] items-center justify-center rounded-full text-[10px] font-bold ${
                  fight.result === 'W'
                    ? 'bg-[#E6F4EA] text-[#166534]'
                    : 'bg-red-50 text-text-accent'
                }`}
              >
                {fight.result}
              </div>
            </div>
          ))}
        </FullWidthCard>
      </div>
    </div>
  );
}
