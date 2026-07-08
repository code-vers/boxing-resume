'use client';

import React from 'react';
import TitleFilters from './TitleFilters';
import TitleTable from './TitleTable';

import { useQuery } from '@tanstack/react-query';
import { getTitles } from '@/features/rankings/api/rankings.api';

const DEFAULT_STATS = [
  { value: '...', label: 'Total Belts' },
  { value: '...', label: 'Active Title Holders' },
  { value: '...', label: 'Organizations' },
  { value: '...', label: 'Weight Classes' },
  { value: '...', label: 'Vacant Titles' },
];

export default function TitleWithBelt() {
  const { data, isLoading } = useQuery({
    queryKey: ['boxingTitles'],
    queryFn: () => getTitles(),
  });

  const statsToDisplay = React.useMemo(() => {
    if (!data?.data || isLoading) return DEFAULT_STATS;
    const titles = data.data;

    const totalBelts = titles.length;
    // Because titles endpoint doesn't return fighters natively yet, we can't reliably count active vs vacant
    // Assuming Vacant if no fighter info is provided.
    const vacantCount = titles.filter(t => !t.fighter?.name).length;
    const activeCount = totalBelts - vacantCount;

    const uniqueOrgs = new Set(titles.map(t => t.organization.id)).size;
    const uniqueDivisions = new Set(titles.map(t => t.division.id)).size;

    return [
      { value: totalBelts.toString(), label: 'Total Belts' },
      { value: activeCount === 0 ? 'N/A' : activeCount.toString(), label: 'Active Title Holders' },
      { value: uniqueOrgs.toString(), label: 'Organizations' },
      { value: uniqueDivisions.toString(), label: 'Weight Classes' },
      { value: vacantCount === totalBelts ? 'N/A' : vacantCount.toString(), label: 'Vacant Titles' },
    ];
  }, [data, isLoading]);

  return (
    <section className="flex w-full flex-col bg-card-dark pt-8 pb-12">
      <div className="mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12">
        <div className="max-w-5xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-text-accent" />
            <span className="text-text-accent text-xs font-bold uppercase tracking-[0.2em]">
              Titles Database
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-surface-white sm:text-5xl">
            Minor &amp; Regional Belts
          </h2>

          <p className="text-text-placeholder max-w-3xl text-base font-medium leading-relaxed sm:text-lg">
            All recognized titles across major world championships, including regular, super, and interim belts across every weight class.
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {statsToDisplay.map((s) => (
            <div key={s.label} className="flex flex-col items-start gap-1">
              <span className="text-2xl font-bold tracking-tight text-surface-white sm:text-3xl">
                {s.value}
              </span>
              <span className="text-text-placeholder text-xs font-semibold uppercase tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </div>
    
      </div>
    </section>
  );
}
