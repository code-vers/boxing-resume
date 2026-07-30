'use client';

import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFightResults } from '@/features/results/hooks/useFightResults';
import {
  ApiFight,
  ApiFightParticipant,
} from '@/features/results/types';
import { cn } from '@/lib/utils';

const ALL_FILTER = 'all';
const ITEMS_PER_PAGE = 10;

type SortOrder = 'newest' | 'oldest';
type PaginationItem = number | 'ellipsis-left' | 'ellipsis-right';

const getParticipantName = (participant?: ApiFightParticipant | null) =>
  participant?.full_name ||
  participant?.fighter_name ||
  participant?.name ||
  'Unknown fighter';

const getFightParticipants = (fight: ApiFight) => {
  const fighterOne = fight.fighters?.fighter_1;
  const fighterTwo = fight.fighters?.fighter_2;
  const hasWinner = Boolean(fighterOne?.winner || fighterTwo?.winner);
  const winner = fighterOne?.winner ? fighterOne : fighterTwo?.winner ? fighterTwo : fighterOne;
  const opponent = fighterOne?.winner ? fighterTwo : fighterTwo?.winner ? fighterOne : fighterTwo;

  return { winner, opponent, hasWinner };
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
};

const getMethodClasses = (method: string) => {
  const normalizedMethod = method.toUpperCase();

  if (normalizedMethod === 'KO' || normalizedMethod === 'TKO') {
    return 'bg-red-50 text-red-700 hover:bg-red-50';
  }

  if (['UD', 'MD', 'SD', 'PTS'].includes(normalizedMethod)) {
    return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50';
  }

  return 'bg-amber-50 text-amber-700 hover:bg-amber-50';
};

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis-right', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis-left',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    'ellipsis-left',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis-right',
    totalPages,
  ];
};

export default function ResultsFilterTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMethod, setActiveMethod] = useState(ALL_FILTER);
  const [activeDivision, setActiveDivision] = useState(ALL_FILTER);
  const [activeYear, setActiveYear] = useState(ALL_FILTER);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useFightResults();

  const results = useMemo(() => data?.results ?? [], [data]);

  const divisionOptions = useMemo(
    () =>
      Array.from(
        new Set(
          results
            .map((fight) => fight.division?.name?.trim())
            .filter((division): division is string => Boolean(division)),
        ),
      ).sort((first, second) => first.localeCompare(second)),
    [results],
  );

  const methodOptions = useMemo(
    () =>
      Array.from(
        new Set(
          results
            .map((fight) => fight.results?.outcome?.trim().toUpperCase())
            .filter((method): method is string => Boolean(method)),
        ),
      ).sort((first, second) => first.localeCompare(second)),
    [results],
  );

  const yearOptions = useMemo(
    () =>
      Array.from(
        new Set(
          results
            .map((fight) => new Date(fight.date).getFullYear())
            .filter((year) => Number.isFinite(year)),
        ),
      ).sort((first, second) => second - first),
    [results],
  );

  const filteredResults = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return results
      .filter((fight) => {
        const fighterOne = getParticipantName(fight.fighters?.fighter_1);
        const fighterTwo = getParticipantName(fight.fighters?.fighter_2);
        const searchableText = [
          fighterOne,
          fighterTwo,
          fight.title,
          fight.event?.title,
          fight.venue,
          fight.location,
          fight.event?.location,
          fight.division?.name,
          ...(fight.titles?.map((title) => title.name) ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        const matchesSearch =
          normalizedSearch.length === 0 ||
          searchableText.includes(normalizedSearch);
        const matchesMethod =
          activeMethod === ALL_FILTER ||
          fight.results?.outcome?.toUpperCase() === activeMethod;
        const matchesDivision =
          activeDivision === ALL_FILTER ||
          fight.division?.name === activeDivision;
        const matchesYear =
          activeYear === ALL_FILTER ||
          String(new Date(fight.date).getFullYear()) === activeYear;

        return (
          matchesSearch &&
          matchesMethod &&
          matchesDivision &&
          matchesYear
        );
      })
      .sort((first, second) => {
        const firstDate = new Date(first.date).getTime();
        const secondDate = new Date(second.date).getTime();

        return sortOrder === 'newest'
          ? secondDate - firstDate
          : firstDate - secondDate;
      });
  }, [
    activeDivision,
    activeMethod,
    activeYear,
    results,
    searchQuery,
    sortOrder,
  ]);

  const totalItems = filteredResults.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = filteredResults.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  const paginationItems = getPaginationItems(currentPage, totalPages);
  const hasActiveFilters =
    searchQuery.length > 0 ||
    activeMethod !== ALL_FILTER ||
    activeDivision !== ALL_FILTER ||
    activeYear !== ALL_FILTER ||
    sortOrder !== 'newest';

  const resetPage = () => setCurrentPage(1);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveMethod(ALL_FILTER);
    setActiveDivision(ALL_FILTER);
    setActiveYear(ALL_FILTER);
    setSortOrder('newest');
    resetPage();
  };

  return (
    <div className='flex w-full flex-col font-sans'>
      <div className='w-full border-b border-divider bg-surface-white py-4'>
        <div className='mx-auto flex flex-col gap-4 px-4 sm:px-6 md:px-8 xl:px-12'>
          <div className='flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between'>
            <div className='relative w-full xl:max-w-[380px]'>
              <label className='sr-only' htmlFor='results-search'>
                Search fight results
              </label>
              <Search
                aria-hidden='true'
                className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-placeholder'
              />
              <Input
                id='results-search'
                type='search'
                placeholder='Search fighter, event, title, or venue...'
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  resetPage();
                }}
                className='h-9 w-full rounded-full border-divider pl-9 text-[12px] placeholder:text-text-placeholder focus-visible:ring-btn-primary'
              />
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 xl:flex xl:shrink-0'>
              <Select
                value={activeDivision}
                onValueChange={(division) => {
                  setActiveDivision(division);
                  resetPage();
                }}
                disabled={isLoading}
              >
                <SelectTrigger
                  aria-label='Filter by division'
                  className='h-9 w-full rounded-[6px] border-divider text-[12px] text-text-placeholder focus:ring-btn-primary xl:w-[180px]'
                >
                  <SelectValue placeholder='All divisions' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_FILTER} className='text-[12px]'>
                    All divisions
                  </SelectItem>
                  {divisionOptions.map((division) => (
                    <SelectItem
                      key={division}
                      value={division}
                      className='text-[12px]'
                    >
                      {division}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={activeYear}
                onValueChange={(year) => {
                  setActiveYear(year);
                  resetPage();
                }}
                disabled={isLoading}
              >
                <SelectTrigger
                  aria-label='Filter by year'
                  className='h-9 w-full rounded-[6px] border-divider text-[12px] text-text-placeholder focus:ring-btn-primary xl:w-[140px]'
                >
                  <SelectValue placeholder='All years' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_FILTER} className='text-[12px]'>
                    All years
                  </SelectItem>
                  {yearOptions.map((year) => (
                    <SelectItem
                      key={year}
                      value={String(year)}
                      className='text-[12px]'
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortOrder}
                onValueChange={(value) => {
                  setSortOrder(value as SortOrder);
                  resetPage();
                }}
                disabled={isLoading}
              >
                <SelectTrigger
                  aria-label='Sort fight results'
                  className='h-9 w-full rounded-[6px] border-divider text-[12px] text-text-placeholder focus:ring-btn-primary xl:w-[150px]'
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='newest' className='text-[12px]'>
                    Newest first
                  </SelectItem>
                  <SelectItem value='oldest' className='text-[12px]'>
                    Oldest first
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div className='hide-scrollbar flex items-center gap-2 overflow-x-auto pb-1 md:pb-0'>
              <button
                type='button'
                aria-pressed={activeMethod === ALL_FILTER}
                onClick={() => {
                  setActiveMethod(ALL_FILTER);
                  resetPage();
                }}
                className={cn(
                  'shrink-0 rounded-full px-4 py-1.5 text-[11px] font-bold transition-colors',
                  activeMethod === ALL_FILTER
                    ? 'bg-btn-primary text-surface-white'
                    : 'border border-divider bg-transparent text-text-placeholder hover:text-text-primary',
                )}
              >
                All methods
              </button>
              {methodOptions.map((method) => (
                <button
                  key={method}
                  type='button'
                  aria-pressed={activeMethod === method}
                  onClick={() => {
                    setActiveMethod(method);
                    resetPage();
                  }}
                  className={cn(
                    'shrink-0 rounded-full px-4 py-1.5 text-[11px] font-bold transition-colors',
                    activeMethod === method
                      ? 'bg-btn-primary text-surface-white'
                      : 'border border-divider bg-transparent text-text-placeholder hover:text-text-primary',
                  )}
                >
                  {method}
                </button>
              ))}
            </div>

            <div className='flex shrink-0 items-center justify-between gap-4 md:justify-end'>
              {hasActiveFilters && (
                <button
                  type='button'
                  onClick={clearFilters}
                  className='inline-flex items-center gap-1.5 text-[11px] font-bold text-text-accent transition-colors hover:text-btn-primary-hover'
                >
                  <RotateCcw aria-hidden='true' className='h-3 w-3' />
                  Clear filters
                </button>
              )}
              <span
                aria-live='polite'
                className='text-[11px] font-medium text-text-placeholder'
              >
                {isLoading
                  ? 'Loading results...'
                  : `Showing ${totalItems === 0 ? 0 : startIndex + 1}-${Math.min(
                      startIndex + ITEMS_PER_PAGE,
                      totalItems,
                    )} of ${totalItems}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className='w-full bg-page-bg py-8 md:py-12'>
        <div className='mx-auto flex flex-col gap-8 px-4 sm:px-6 md:px-8 xl:px-12'>
          <div className='w-full overflow-hidden rounded-[8px] border border-divider bg-surface-white shadow-sm'>
            <Table className='min-w-[1000px]'>
              <TableHeader>
                <TableRow className='border-b-divider hover:bg-transparent'>
                  {[
                    'Date',
                    'Winner',
                    'Opponent',
                    'Method',
                    'Round',
                    'Division',
                    'Event',
                  ].map((header) => (
                    <TableHead
                      key={header}
                      className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-placeholder'
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow className='hover:bg-transparent'>
                    <TableCell colSpan={7} className='h-40 text-center'>
                      <div className='flex items-center justify-center gap-2 text-[13px] font-medium text-text-placeholder'>
                        <Loader2
                          aria-hidden='true'
                          className='h-5 w-5 animate-spin text-text-accent'
                        />
                        Loading fight results...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow className='hover:bg-transparent'>
                    <TableCell colSpan={7} className='h-40 text-center'>
                      <div className='flex flex-col items-center gap-3'>
                        <p className='text-[13px] font-medium text-text-primary'>
                          Fight results could not be loaded.
                        </p>
                        <button
                          type='button'
                          onClick={() => refetch()}
                          disabled={isFetching}
                          className='inline-flex h-8 items-center gap-2 rounded-[5px] bg-btn-primary px-4 text-[11px] font-bold text-surface-white transition-colors hover:bg-btn-primary-hover disabled:cursor-not-allowed disabled:opacity-60'
                        >
                          {isFetching && (
                            <Loader2
                              aria-hidden='true'
                              className='h-3.5 w-3.5 animate-spin'
                            />
                          )}
                          Try again
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedResults.length > 0 ? (
                  paginatedResults.map((fight) => {
                    const { winner, opponent, hasWinner } =
                      getFightParticipants(fight);
                    const winnerName = getParticipantName(winner);
                    const opponentName = getParticipantName(opponent);
                    const method = fight.results?.outcome?.toUpperCase() || '—';
                    const eventTitle =
                      fight.event?.title || fight.title || 'Event unavailable';
                    const eventLocation =
                      fight.venue || fight.location || fight.event?.location;

                    return (
                      <TableRow
                        key={fight.id}
                        className='border-b-divider transition-colors hover:bg-page-bg/40'
                      >
                        <TableCell className='px-6 py-4 text-[13px] font-medium text-text-placeholder'>
                          <time dateTime={fight.date}>
                            {formatDate(fight.date)}
                          </time>
                        </TableCell>
                        <TableCell
                          className={cn(
                            'px-6 py-4 text-[13px] font-bold',
                            hasWinner ? 'text-[#166534]' : 'text-text-primary',
                          )}
                        >
                          {winner?.fighter_id ? (
                            <Link
                              href={`/fighters/${winner.fighter_id}`}
                              className='transition-colors hover:text-text-accent hover:underline'
                            >
                              {winnerName}
                            </Link>
                          ) : (
                            winnerName
                          )}
                        </TableCell>
                        <TableCell
                          className={cn(
                            'px-6 py-4 text-[13px] font-bold',
                            hasWinner
                              ? 'text-text-accent'
                              : 'text-text-primary',
                          )}
                        >
                          {opponent?.fighter_id ? (
                            <Link
                              href={`/fighters/${opponent.fighter_id}`}
                              className='transition-colors hover:underline'
                            >
                              {opponentName}
                            </Link>
                          ) : (
                            opponentName
                          )}
                        </TableCell>
                        <TableCell className='px-6 py-4'>
                          <Badge
                            className={cn(
                              'rounded-[4px] border-none px-2.5 py-0.5 text-[10px] font-black tracking-wide shadow-none',
                              getMethodClasses(method),
                            )}
                          >
                            {method}
                          </Badge>
                        </TableCell>
                        <TableCell className='px-6 py-4 text-[13px] font-bold text-text-primary'>
                          {fight.results?.round ?? '—'}
                          {fight.scheduled_rounds
                            ? ` / ${fight.scheduled_rounds}`
                            : ''}
                        </TableCell>
                        <TableCell className='px-6 py-4 text-[13px] font-medium text-text-placeholder'>
                          {fight.division?.name || 'Unclassified'}
                        </TableCell>
                        <TableCell className='max-w-[280px] px-6 py-4'>
                          <div className='flex flex-col gap-0.5'>
                            {fight.event?.id ? (
                              <Link
                                href={`/events/${fight.event.id}`}
                                className='truncate text-[13px] font-bold text-text-primary transition-colors hover:text-text-accent hover:underline'
                              >
                                {eventTitle}
                              </Link>
                            ) : (
                              <span className='truncate text-[13px] font-bold text-text-primary'>
                                {eventTitle}
                              </span>
                            )}
                            {eventLocation && (
                              <span className='truncate text-[10px] text-text-placeholder'>
                                {eventLocation}
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow className='hover:bg-transparent'>
                    <TableCell
                      colSpan={7}
                      className='h-40 text-center text-[13px] text-text-placeholder'
                    >
                      <div className='flex flex-col items-center gap-3'>
                        <p>
                          {results.length === 0
                            ? 'No completed fight results are available.'
                            : 'No fight results match the selected filters.'}
                        </p>
                        {hasActiveFilters && (
                          <button
                            type='button'
                            onClick={clearFilters}
                            className='text-[11px] font-bold text-text-accent transition-colors hover:text-btn-primary-hover'
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <nav
              aria-label='Fight results pagination'
              className='flex items-center justify-center gap-2 pb-8'
            >
              <button
                type='button'
                aria-label='Go to previous page'
                onClick={() =>
                  setCurrentPage((previousPage) =>
                    Math.max(previousPage - 1, 1),
                  )
                }
                disabled={currentPage === 1}
                className='flex h-8 w-8 items-center justify-center rounded-[6px] border border-divider bg-surface-white text-text-placeholder transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50'
              >
                <ChevronLeft aria-hidden='true' size={14} strokeWidth={2.5} />
              </button>

              {paginationItems.map((item) =>
                typeof item === 'number' ? (
                  <button
                    key={item}
                    type='button'
                    aria-label={`Go to page ${item}`}
                    aria-current={currentPage === item ? 'page' : undefined}
                    onClick={() => setCurrentPage(item)}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-[6px] text-[12px] font-bold transition-colors',
                      currentPage === item
                        ? 'bg-btn-primary text-surface-white'
                        : 'border border-divider bg-surface-white text-text-placeholder hover:text-text-primary',
                    )}
                  >
                    {item}
                  </button>
                ) : (
                  <span
                    key={item}
                    aria-hidden='true'
                    className='flex h-8 w-6 items-center justify-center text-[12px] text-text-placeholder'
                  >
                    …
                  </span>
                ),
              )}

              <button
                type='button'
                aria-label='Go to next page'
                onClick={() =>
                  setCurrentPage((previousPage) =>
                    Math.min(previousPage + 1, totalPages),
                  )
                }
                disabled={currentPage === totalPages}
                className='flex h-8 w-8 items-center justify-center rounded-[6px] border border-divider bg-surface-white text-text-placeholder transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50'
              >
                <ChevronRight aria-hidden='true' size={14} strokeWidth={2.5} />
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}
