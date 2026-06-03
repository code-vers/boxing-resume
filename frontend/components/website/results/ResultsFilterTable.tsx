'use client';

import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

// Shadcn UI Imports
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

/**
 * @interface FightResultRow
 * @description Data structure for a single row in the filtered results table.
 */
interface FightResultRow {
  id: string;
  date: string;
  winner: string;
  loser: string;
  method: string;
  round: number;
  division: string;
  event: string;
  level: string;
  status: string;
  organization: string;
}

/**
 * @constant FILTER_OPTIONS
 * @description Centralized configuration for all pill filters and dropdown options.
 */
const FILTER_OPTIONS = {
  levels: ['All', 'Intercontinental', 'International', 'Continental', 'National', 'State / Local'],
  statuses: ['All', 'Active', 'Vacant', 'Interim', 'Stripped'],
  divisions: ['All Division', 'Heavyweight', 'Middleweight', 'Welterweight', 'Lightweight'],
  organizations: ['All Organization', 'WBC', 'WBA', 'IBF', 'WBO'],
};

/**
 * @constant ITEMS_PER_PAGE
 * @description Number of result rows to display per pagination view.
 */
const ITEMS_PER_PAGE = 10;

/**
 * @function generateMockData
 * @description Generates a robust dataset to demonstrate functional pagination and filtering.
 * @returns {FightResultRow[]} Array of mock fight results.
 */
const generateMockData = (): FightResultRow[] => {
  const data: FightResultRow[] = [];
  const divisions = ['Middleweight', 'Welterweight', 'Heavyweight', 'Lightweight'];
  const methods = ['UD', 'KO', 'TKO', 'SD'];

  for (let i = 1; i <= 45; i++) {
    data.push({
      id: `fight_${i}`,
      date: `Nov 2023`,
      winner: 'Tyson Fury',
      loser: 'Oleksandr Usyk',
      method: methods[i % 4],
      round: 12,
      division: divisions[i % 4],
      event: 'Riyadh Season',
      level: i % 3 === 0 ? 'International' : 'All',
      status: i % 5 === 0 ? 'Vacant' : 'Active',
      organization: i % 2 === 0 ? 'WBC' : 'WBA',
    });
  }
  return data;
};

const mockData = generateMockData();

/**
 * @component ResultsFilterTable
 * @description A fully functional data table with integrated text search, pill filtering, select dropdowns, and client-side pagination.
 * Engineered to avoid cascading renders by mutating pagination state directly within filter event handlers.
 * @returns {JSX.Element}
 */
export default function ResultsFilterTable() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [activeDivision, setActiveDivision] = useState('All Division');
  const [activeOrg, setActiveOrg] = useState('All Organization');
  const [currentPage, setCurrentPage] = useState(1);

  // --- LOGIC: FILTERING ---
  /**
   * @constant filteredData
   * @description Memoized array of results that pass all active filter criteria.
   */
  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchesSearch =
        item.winner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.loser.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.event.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = activeLevel === 'All' || item.level === activeLevel;
      const matchesStatus = activeStatus === 'All' || item.status === activeStatus;
      const matchesDiv = activeDivision === 'All Division' || item.division === activeDivision;
      const matchesOrg = activeOrg === 'All Organization' || item.organization === activeOrg;

      return matchesSearch && matchesLevel && matchesStatus && matchesDiv && matchesOrg;
    });
  }, [searchQuery, activeLevel, activeStatus, activeDivision, activeOrg]);

  // --- LOGIC: PAGINATION ---
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  /**
   * @function generatePageNumbers
   * @description Constructs an array of page numbers for the pagination UI.
   * @returns {number[]}
   */
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // --- HANDLERS ---
  /**
   * @function handleSearch
   * @description Updates search query and resets pagination to page 1.
   * @param {string} value - The input text
   */
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  /**
   * @function handleLevelChange
   * @description Updates the level filter and resets pagination to page 1.
   * @param {string} level - Selected championship level
   */
  const handleLevelChange = (level: string) => {
    setActiveLevel(level);
    setCurrentPage(1);
  };

  /**
   * @function handleStatusChange
   * @description Updates the status filter and resets pagination to page 1.
   * @param {string} status - Selected belt status
   */
  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  /**
   * @function handleDivisionChange
   * @description Updates the division filter and resets pagination to page 1.
   * @param {string} division - Selected weight division
   */
  const handleDivisionChange = (division: string) => {
    setActiveDivision(division);
    setCurrentPage(1);
  };

  /**
   * @function handleOrgChange
   * @description Updates the organization filter and resets pagination to page 1.
   * @param {string} org - Selected boxing organization
   */
  const handleOrgChange = (org: string) => {
    setActiveOrg(org);
    setCurrentPage(1);
  };

  return (
    <div className='flex w-full flex-col font-sans'>
      {/* --- SECTION 1: FILTER BAR --- */}
      <div className='w-full border-b border-divider bg-surface-white py-4'>
        <div className='mx-auto flex flex-col gap-4 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex flex-1 flex-wrap items-center gap-4'>
              <div className='relative w-full max-w-[280px]'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-placeholder' />
                <Input
                  type='text'
                  placeholder='Search belt name, fighter, or organization...'
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className='h-9 w-full rounded-full border-divider pl-9 text-[12px] placeholder:text-text-placeholder focus-visible:ring-btn-primary'
                />
              </div>

              <div className='hide-scrollbar flex items-center gap-2 overflow-x-auto'>
                {FILTER_OPTIONS.levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelChange(level)}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-[11px] font-bold transition-colors ${
                      activeLevel === level
                        ? 'bg-btn-primary text-surface-white'
                        : 'border border-divider bg-transparent text-text-placeholder hover:text-text-primary'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex shrink-0 items-center gap-3'>
              <Select value={activeDivision} onValueChange={handleDivisionChange}>
                <SelectTrigger className='h-9 w-[160px] rounded-[6px] border-divider text-[12px] text-text-placeholder focus:ring-btn-primary'>
                  <SelectValue placeholder='All Division' />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_OPTIONS.divisions.map((div) => (
                    <SelectItem key={div} value={div} className='text-[12px]'>
                      {div}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={activeOrg} onValueChange={handleOrgChange}>
                <SelectTrigger className='h-9 w-[160px] rounded-[6px] border-divider text-[12px] text-text-placeholder focus:ring-btn-primary'>
                  <SelectValue placeholder='All Organization' />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_OPTIONS.organizations.map((org) => (
                    <SelectItem key={org} value={org} className='text-[12px]'>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='hide-scrollbar flex items-center gap-2 overflow-x-auto'>
              {FILTER_OPTIONS.statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`shrink-0 rounded-full px-4 py-1 text-[11px] font-bold transition-colors ${
                    activeStatus === status
                      ? 'bg-btn-primary text-surface-white'
                      : 'border border-divider bg-transparent text-text-placeholder hover:text-text-primary'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <span className='text-[11px] font-medium text-text-placeholder'>
              Showing {totalItems === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems}
            </span>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: DATA TABLE --- */}
      <section className='w-full bg-page-bg py-8 md:py-12'>
        <div className='mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8'>
          <div className='w-full overflow-hidden rounded-[8px] bg-surface-white shadow-sm border border-divider'>
            <Table className='min-w-[1000px]'>
              <TableHeader>
                <TableRow className='border-b-divider hover:bg-transparent'>
                  {['Date', 'Winner', 'Loser', 'Method', 'Round', 'DIVISION', 'Event'].map(
                    (header) => (
                      <TableHead
                        key={header}
                        className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-placeholder'
                      >
                        {header}
                      </TableHead>
                    ),
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row) => (
                    <TableRow
                      key={row.id}
                      className='border-b-divider transition-colors hover:bg-page-bg/40'
                    >
                      <TableCell className='px-6 py-4 text-[13px] font-medium text-text-placeholder'>
                        {row.date}
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-bold text-[#166534]'>
                        {row.winner}
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-bold text-text-accent'>
                        {row.loser}
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <Badge className='rounded-[4px] border-none bg-[#E6F4EA] px-2.5 py-0.5 text-[10px] font-black tracking-wide text-[#166534] hover:bg-[#E6F4EA]'>
                          {row.method}
                        </Badge>
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-bold text-text-primary'>
                        {row.round}
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-medium text-text-placeholder'>
                        {row.division}
                      </TableCell>
                      <TableCell className='px-6 py-4 text-[13px] font-bold text-text-primary'>
                        {row.event}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className='h-32 text-center text-[13px] text-text-placeholder'
                    >
                      No fight results found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* --- SECTION 3: PAGINATION CONTROLS --- */}
          {totalPages > 1 && (
            <div className='flex items-center justify-center gap-2 pb-8'>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='flex h-8 w-8 items-center justify-center rounded-[6px] border border-divider bg-surface-white text-text-placeholder transition-colors hover:text-text-primary disabled:opacity-50'
              >
                <ChevronLeft size={14} strokeWidth={2.5} />
              </button>

              {generatePageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-[6px] text-[12px] font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-btn-primary text-surface-white'
                      : 'border border-divider bg-surface-white text-text-placeholder hover:text-text-primary'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className='flex h-8 w-8 items-center justify-center rounded-[6px] border border-divider bg-surface-white text-text-placeholder transition-colors hover:text-text-primary disabled:opacity-50'
              >
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
