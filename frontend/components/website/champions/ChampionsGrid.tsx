'use client';

import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useOrganizations, useTitles, useFighter } from '../../../features/rankings/hooks/useRankings';
import { ApiOrg, ApiTitle } from '../../../features/rankings/types';

/**
 * @helper Helper to get initials from a name
 */
const getInitials = (name: string) => {
  if (!name || name === "VACANT" || name === "NO CHAMPION") return "V";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (name[0] || "U").toUpperCase();
};

/**
 * @component ChampionCard
 */
const ChampionCard = ({ title, org }: { title: ApiTitle; org: ApiOrg }) => {
  const championId = title.fighter_id || title.champion_id || title.fighter?.id;
  const { data: fighterData } = useFighter(championId);
  const fighter = fighterData?.data;

  const isVacant = !championId;
  const fighterName = fighter ? fighter.name : (title.fighter?.name || (isVacant ? "VACANT" : "Loading..."));
  const initials = isVacant ? 'V' : getInitials(fighterName);
  const orgShortName = org.name.replace(/\s\(.+\)/, '');

  return (
    <div className='relative flex flex-col items-center rounded-[8px] border border-card-border bg-surface-white p-6 shadow-sm transition-shadow hover:shadow-md'>
      <span className='absolute left-4 top-4 text-[10px] font-black uppercase text-text-accent'>
        {orgShortName}
      </span>
      {title.title_type && (
        <span className='absolute right-4 top-4 text-[10px] font-medium text-text-placeholder'>
          {title.title_type}
        </span>
      )}
      <div className='mt-2 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-text-accent bg-card-dark text-[18px] font-bold text-surface-white overflow-hidden'>
        {initials}
      </div>
      <h3 className='mt-4 text-[14px] font-black uppercase tracking-tight text-text-primary text-center'>
        {fighterName}
      </h3>
      {fighter && (
        <div className='mt-2 flex flex-col items-center text-[11px] text-text-placeholder'>
          {fighter.stats && (
            <span>{fighter.stats.wins}W - {fighter.stats.losses}L - {fighter.stats.draws}D</span>
          )}
          {fighter.nationality && (
            <span>{fighter.nationality}</span>
          )}
        </div>
      )}
      {!isVacant && (
        <button className='mt-5 flex items-center gap-1 text-[11px] font-bold text-text-accent transition-colors hover:text-red-700'>
          View profile <ArrowRight size={12} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

/**
 * @component ChampionsGrid
 */
export default function ChampionsGrid() {
  const [activeTab, setActiveTab] = useState<string>('All');

  // Fetch Organizations
  const { data: orgsData, isLoading: orgsLoading } = useOrganizations();

  // Fetch Titles
  const { data: titlesData, isLoading: titlesLoading, isFetching } = useTitles(activeTab);

  // Group titles by division
  const groupedTitles = useMemo(() => {
    if (!titlesData?.data) return {};
    const groups: Record<string, ApiTitle[]> = {};
    titlesData.data.forEach(title => {
      const divName = title.division?.name || 'Unknown Division';
      if (!groups[divName]) groups[divName] = [];
      groups[divName].push(title);
    });
    return groups;
  }, [titlesData]);

  // Sort divisions by weight (Heavyweight first)
  const sortedDivisions = useMemo(() => {
    return Object.entries(groupedTitles).sort((a, b) => {
      const weightA = a[1][0]?.division?.weight_lb || 0;
      const weightB = b[1][0]?.division?.weight_lb || 0;
      return weightB - weightA;
    });
  }, [groupedTitles]);

  // Prepare Tabs
  const tabs = useMemo(() => {
    const base = [{ id: 'All', name: 'All' }];
    if (orgsData?.data) {
      return [...base, ...orgsData.data];
    }
    return base;
  }, [orgsData]);

  // Handle Tab Click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

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
              let tabLabel = tab.name;
              const match = tabLabel.match(/\(([^)]+)\)/);
              if (match) tabLabel = match[1];

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
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
          {sortedDivisions.length === 0 && !titlesLoading && !isFetching && (
            <div className="py-20 text-center text-text-placeholder">
              No titles found for this organization.
            </div>
          )}

          {sortedDivisions.map(([divisionName, titles]) => (
            <div key={divisionName} className='flex flex-col w-full'>
              {/* Section Header */}
              <div className='mb-6 flex items-baseline justify-between border-b border-divider pb-2'>
                <h2 className='text-[18px] font-black uppercase tracking-tight text-text-primary md:text-[22px]'>
                  {divisionName}
                </h2>
              </div>

              {/* Responsive Cards Grid */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {titles.map((title) => (
                  <ChampionCard
                    key={title.id}
                    title={title}
                    org={title.organization}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
