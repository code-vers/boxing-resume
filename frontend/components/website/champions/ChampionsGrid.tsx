'use client';

import { ArrowRight, ChevronLeft, ChevronRight, Loader2, ChevronDown } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { useOrganizations, useTitles, useFighter, useAllRankings } from '../../../features/rankings/hooks/useRankings';
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
const ChampionCard = ({ title, org, realChampionId }: { title: ApiTitle; org: ApiOrg; realChampionId?: string }) => {
  const championId = realChampionId || title.fighter_id || title.champion_id || title.fighter?.id;
  const { data: fighterData, isLoading: fighterLoading } = useFighter(championId);
  const fighter = fighterData?.data;

  const isVacant = !championId;
  const fighterName = fighter ? fighter.name : (title.fighter?.name || (isVacant ? "VACANT" : "Loading..."));
  const initials = isVacant ? 'V' : getInitials(fighterName);
  const orgShortName = org?.name ? org.name.replace(/\s\(.+\)/, '') : 'ORG';

  return (
    <div className='group relative flex flex-col items-center rounded-[12px] border border-card-border bg-surface-white p-6 shadow-sm transition-all hover:shadow-md hover:border-text-accent'>
      <span className='absolute left-4 top-4 text-[11px] font-black uppercase text-text-accent tracking-wider'>
        {orgShortName}
      </span>
      {title.title_type && (
        <span className='absolute right-4 top-4 text-[10px] font-bold text-text-placeholder px-2 py-0.5 bg-card-dark/5 rounded-full'>
          {title.title_type}
        </span>
      )}
      
      {/* Champion Photo / Initials */}
      {fighterLoading ? (
        <div className='mt-4 h-[80px] w-[80px] rounded-full bg-card-dark/10 animate-pulse'></div>
      ) : (
        <div className='mt-4 flex h-[80px] w-[80px] items-center justify-center rounded-full border-[3px] border-text-accent bg-card-dark text-[24px] font-bold text-surface-white shadow-sm overflow-hidden transition-transform group-hover:scale-105'>
          {initials}
        </div>
      )}

      {fighterLoading ? (
        <div className='mt-5 h-[20px] w-[140px] bg-card-dark/10 animate-pulse rounded-md'></div>
      ) : (
        <h3 className='mt-5 text-[16px] font-black uppercase tracking-tight text-text-primary text-center leading-tight'>
          {fighterName}
        </h3>
      )}
      
      {fighterLoading ? (
        <div className='mt-3 flex flex-col items-center gap-1 w-full'>
          <div className='h-[18px] w-[100px] bg-card-dark/10 animate-pulse rounded-md'></div>
          <div className='h-[14px] w-[80px] bg-card-dark/10 animate-pulse rounded-md'></div>
        </div>
      ) : fighter && (
        <div className='mt-3 flex flex-col items-center gap-1'>
          {fighter.stats && (
            <span className='text-[12px] font-semibold text-text-primary bg-page-bg px-2 py-1 rounded-md'>
              {fighter.stats.wins}W - {fighter.stats.losses}L - {fighter.stats.draws}D
            </span>
          )}
          {fighter.nationality && (
            <span className='text-[12px] font-medium text-text-placeholder'>
              {fighter.nationality}
            </span>
          )}
        </div>
      )}

      {!isVacant && (
        <button 
          disabled={fighterLoading}
          className='mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-page-bg text-[12px] font-bold text-text-primary transition-colors hover:bg-text-accent hover:text-surface-white disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-text-accent group-hover:text-surface-white'
        >
          View profile <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

/**
 * @component ChampionsGrid
 */
export default function ChampionsGrid() {
  const [activeOrgTab, setActiveOrgTab] = useState<string>('All');
  const [activeDivision, setActiveDivision] = useState<string>('All');

  // Fetch Organizations
  const { data: orgsData, isLoading: orgsLoading } = useOrganizations();

  // Fetch Titles for selected organization
  const { data: titlesData, isLoading: titlesLoading, isFetching: titlesFetching } = useTitles(activeOrgTab);

  // Fetch all rankings to find current holders
  const { data: allRankings, isLoading: rankingsLoading } = useAllRankings();

  // Create a mapping of title.id to fighter_id
  const titleToChampionMap = useMemo(() => {
    const map = new Map<string, string>();
    if (!allRankings) return map;

    for (const rankingGroup of allRankings) {
      const titleIds = rankingGroup.title_ids || {};
      const champion = rankingGroup.champions?.[0];

      if (champion && !champion.is_vacant && champion.fighter_id) {
        if (titleIds.full) map.set(titleIds.full, champion.fighter_id);
        if (titleIds.regular) map.set(titleIds.regular, champion.fighter_id);
        if (titleIds.interim) map.set(titleIds.interim, champion.fighter_id);
      }
    }
    return map;
  }, [allRankings]);

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

  // Derive unique divisions from fetched titles
  const availableDivisions = useMemo(() => {
    if (!titlesData?.data) return [];
    const divMap = new Map();
    titlesData.data.forEach(title => {
      if (title.division) {
        divMap.set(title.division.id, title.division);
      }
    });
    // Sort by weight_lb descending (Heavyweight first)
    return Array.from(divMap.values()).sort((a, b) => (b.weight_lb || 0) - (a.weight_lb || 0));
  }, [titlesData]);

  // Set default division when divisions load or change
  useMemo(() => {
    if (availableDivisions.length > 0 && activeDivision !== 'All') {
      const exists = availableDivisions.find(d => d.name === activeDivision);
      if (!exists) {
        setActiveDivision('All');
      }
    } else if (availableDivisions.length === 0) {
      setActiveDivision('All');
    }
  }, [availableDivisions, activeDivision]);

  // Determine which divisions to render based on the active selection
  const divisionsToRender = useMemo(() => {
    if (activeDivision === 'All') {
      return sortedDivisions;
    }
    const filtered = sortedDivisions.find(d => d[0] === activeDivision);
    return filtered ? [filtered] : [];
  }, [activeDivision, sortedDivisions]);

  // Prepare Organization Tabs
  const orgTabs = useMemo(() => {
    const base = [{ id: 'All', name: 'All' }];
    if (orgsData?.data) {
      return [...base, ...orgsData.data];
    }
    return base;
  }, [orgsData]);

  // Handle Org Tab Click
  const handleOrgTabClick = (tabId: string) => {
    setActiveOrgTab(tabId);
  };

  return (
    <div className='flex w-full flex-col font-sans bg-page-bg min-h-[600px] relative'>
      {/* --- 1. ORGANIZATIONS NAVIGATION --- */}
      <div className='w-full border-b border-divider bg-surface-white'>
        <div className='hide-scrollbar mx-auto flex items-center gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8'>
          {orgsLoading ? (
            <div className="py-4 text-sm text-text-placeholder animate-pulse">Loading organizations...</div>
          ) : (
            orgTabs.map((tab) => {
              const isActive = activeOrgTab === tab.id;
              let tabLabel = tab.name;
              const match = tabLabel.match(/\(([^)]+)\)/);
              if (match) tabLabel = match[1];

              return (
                <button
                  key={tab.id}
                  onClick={() => handleOrgTabClick(tab.id)}
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

      {/* --- 2. WEIGHT CLASSES DROPDOWN --- */}
      {!titlesLoading && availableDivisions.length > 0 && (
        <div className='w-full bg-page-bg border-b border-divider/50'>
          <div className='mx-auto px-4 py-4 sm:px-6 lg:px-8'>
            <div className='flex items-center gap-3'>
              <label htmlFor="division-select" className="text-[13px] font-bold text-text-primary">
                Weight Class:
              </label>
              <div className="relative max-w-xs w-full md:w-64">
                <select
                  id="division-select"
                  value={activeDivision}
                  onChange={(e) => setActiveDivision(e.target.value)}
                  className="appearance-none w-full bg-surface-white border border-card-border text-text-primary text-[13px] font-medium rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-text-accent focus:border-transparent cursor-pointer shadow-sm"
                >
                  <option value="All">All Weight Classes</option>
                  {availableDivisions.map((division) => (
                    <option key={division.id} value={division.name}>
                      {division.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-placeholder">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. CHAMPIONS DIRECTORY --- */}
      <section className='w-full py-8 md:py-12 relative flex-1'>
        {(titlesFetching || rankingsLoading) && (
          <div className="absolute inset-0 bg-page-bg/40 z-10 flex items-start justify-center pt-20 backdrop-blur-[1px]">
            <Loader2 className="animate-spin text-text-accent" size={32} />
          </div>
        )}

        <div className='mx-auto flex flex-col gap-12 px-4 sm:px-6 lg:px-8'>
          {divisionsToRender.length === 0 && !titlesLoading && !titlesFetching && (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-bold text-text-primary">No Titles Found</h3>
              <p className="text-sm text-text-placeholder mt-1">There are no titles for the selected organization and weight class.</p>
            </div>
          )}

          {divisionsToRender.map(([divisionName, titles]) => (
            <div key={divisionName} className='flex flex-col w-full'>
              {/* Section Header */}
              <div className='mb-6 flex flex-col gap-1 border-b border-divider pb-3'>
                <h2 className='text-[20px] font-black uppercase tracking-tight text-text-primary md:text-[24px]'>
                  {divisionName}
                </h2>
                <span className="text-[13px] font-medium text-text-placeholder">
                  Showing {titles.length} title{titles.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Responsive Cards Grid */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {titles.map((title) => (
                  <ChampionCard
                    key={title.id}
                    title={title}
                    org={title.organization}
                    realChampionId={titleToChampionMap.get(title.id)}
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
