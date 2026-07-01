'use client';

import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useOrganizations, useDivisions, useRankings } from '../../../features/rankings/hooks/useRankings';

/**
 * @interface Mapped Types
 */
interface Champion {
  id: string;
  org: string;
  status: string;
  initials: string;
  name: string;
  record: string;
  since: string;
}

interface WeightClass {
  id: string;
  name: string;
  weightLimit: string;
  champions: Champion[];
}

/**
 * @helper Helper to get initials from a name
 */
const getInitials = (name: string) => {
  if (!name || name === "VACANT") return "V";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (name[0] || "U").toUpperCase();
};

/**
 * @component ChampionCard
 */
const ChampionCard = ({ org, status, initials, name, record, since }: Champion) => (
  <div className='relative flex flex-col items-center rounded-[8px] border border-card-border bg-surface-white p-6 shadow-sm transition-shadow hover:shadow-md'>
    <span className='absolute left-4 top-4 text-[10px] font-black uppercase text-text-accent'>
      {org}
    </span>
    <span className='absolute right-4 top-4 text-[10px] font-medium text-text-placeholder'>
      {status}
    </span>
    <div className='mt-2 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-text-accent bg-card-dark text-[18px] font-bold text-surface-white'>
      {initials}
    </div>
    <h3 className='mt-4 text-[14px] font-black uppercase tracking-tight text-text-primary text-center'>
      {name}
    </h3>
    <span className='mt-1 text-[11px] font-medium text-text-placeholder'>{record}</span>
    <span className='mt-0.5 text-[11px] font-medium text-text-placeholder'>{since}</span>
    <button className='mt-5 flex items-center gap-1 text-[11px] font-bold text-text-accent transition-colors hover:text-red-700'>
      View profile <ArrowRight size={12} strokeWidth={2.5} />
    </button>
  </div>
);

/**
 * @component ChampionsGrid
 */
export default function ChampionsGrid() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [page, setPage] = useState<number>(1);

  // Fetch Organizations
  const { data: orgsData, isLoading: orgsLoading } = useOrganizations();

  // Fetch Divisions for pagination
  const { data: divisionsData, isLoading: divisionsLoading } = useDivisions();

  // Determine current division ID based on page
  const currentDivisionId = divisionsData?.data?.[page - 1]?.id;

  // Fetch Rankings (Champions)
  const { data: rankingsData, isLoading: rankingsLoading, isFetching } = useRankings(currentDivisionId);

  // Prepare Tabs
  const tabs = useMemo(() => {
    const base = [{ id: 'All', name: 'All' }];
    if (orgsData?.data) {
      return [...base, ...orgsData.data];
    }
    return base;
  }, [orgsData]);

  // Map Data to Divisions and Champions
  const mappedData = useMemo(() => {
    if (!rankingsData?.data) return [];

    // Filter by active tab (locally, in case the API doesn't support org filtering)
    let filteredItems = rankingsData.data;
    if (activeTab !== 'All') {
      filteredItems = filteredItems.filter(item => item.organization.id === activeTab);
    }

    const divisionsMap = new Map<string, WeightClass>();

    filteredItems.forEach(item => {
      const divName = item.division.name;
      const weightLimit = item.division.weight_lb ? `${item.division.weight_lb} lbs` : '';
      
      if (!divisionsMap.has(divName)) {
        divisionsMap.set(divName, {
          id: item.division.id || divName,
          name: divName,
          weightLimit,
          champions: []
        });
      }

      const div = divisionsMap.get(divName)!;
      
      item.champions.forEach((champ, idx) => {
        // Skip purely vacant placeholders unless they are the only ones, but usually vacant means no champion.
        if (champ.fighter_name !== "VACANT" && !champ.is_vacant) {
          div.champions.push({
            id: `${item.id}-${champ.fighter_id}-${idx}`,
            org: item.organization.name.replace(/\\s\\(.+\\)/, ''), // e.g., "World Boxing Association (WBA)" -> "World Boxing Association"
            status: champ.title_type || 'Champion',
            initials: getInitials(champ.fighter_name),
            name: champ.fighter_name,
            record: 'N/A', // Data not provided by endpoint
            since: 'Current' // Data not provided by endpoint
          });
        }
      });
    });

    return Array.from(divisionsMap.values()).filter(div => div.champions.length > 0);
  }, [rankingsData, activeTab]);

  return (
    <div className='flex w-full flex-col font-sans bg-page-bg min-h-[600px] relative'>
      {/* --- 1. TABS NAVIGATION --- */}
      <div className='w-full border-b border-divider bg-surface-white'>
        <div className='hide-scrollbar mx-auto flex items-center gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8'>
          {orgsLoading ? (
            <div className="py-4 text-sm text-text-placeholder animate-pulse">Loading organizations...</div>
          ) : (
            tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              // Clean up long names like "World Boxing Association (WBA)" for the tab -> "WBA"
              let tabLabel = tab.name;
              const match = tabLabel.match(/\\(([^)]+)\\)/);
              if (match) tabLabel = match[1];

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative whitespace-nowrap px-4 py-4 text-[12px] font-bold transition-colors ${
                    isActive ? 'text-text-primary' : 'text-text-placeholder hover:text-text-primary'
                  }`}
                >
                  {tabLabel}
                  {isActive && (
                    <div className='absolute bottom-0 left-0 h-[2px] w-full bg-text-accent' />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* --- 2. CHAMPIONS DIRECTORY --- */}
      <section className='w-full py-10 md:py-14 relative'>
        {isFetching && (
          <div className="absolute inset-0 bg-page-bg/50 z-10 flex items-start justify-center pt-20">
            <Loader2 className="animate-spin text-text-accent" size={32} />
          </div>
        )}
        
        <div className='mx-auto flex flex-col gap-12 px-4 sm:px-6 lg:px-8'>
          {mappedData.map((division) => (
            <div key={division.id} className='flex flex-col w-full'>
              {/* Section Header */}
              <div className='mb-6 flex items-baseline justify-between border-b border-divider pb-2'>
                <h2 className='text-[18px] font-black uppercase tracking-tight text-text-primary md:text-[22px]'>
                  {division.name}
                </h2>
                <span className='text-[12px] font-medium text-text-placeholder'>
                  {division.weightLimit}
                </span>
              </div>

              {/* Responsive Cards Grid */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {division.champions.map((champion) => (
                  <ChampionCard key={champion.id} {...champion} />
                ))}
              </div>
            </div>
          ))}

          {!rankingsLoading && mappedData.length === 0 && (
            <div className='flex h-32 w-full items-center justify-center text-[13px] text-text-placeholder'>
              No champions found for the selected view. Try switching tabs or pages.
            </div>
          )}

          {/* Pagination Controls */}
          {divisionsData?.data && divisionsData.data.length > 0 && (
            <div className='flex items-center justify-center gap-4 mt-8'>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                className='flex h-10 w-10 items-center justify-center rounded-md border border-card-border bg-surface-white text-text-primary shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
              >
                <ChevronLeft size={18} />
              </button>
              <div className='flex flex-col items-center'>
                <div className='text-[13px] font-medium text-text-placeholder'>
                  Division <span className='text-text-primary font-bold'>{page}</span> of{' '}
                  <span className='text-text-primary font-bold'>{divisionsData.data.length}</span>
                </div>
                <div className='text-[11px] font-bold text-text-accent mt-1 uppercase'>
                  {divisionsData.data[page - 1]?.name}
                </div>
              </div>
              <button
                onClick={() => setPage(p => Math.min(divisionsData.data.length, p + 1))}
                disabled={page === divisionsData.data.length || isFetching}
                className='flex h-10 w-10 items-center justify-center rounded-md border border-card-border bg-surface-white text-text-primary shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
