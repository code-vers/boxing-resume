'use client';

import React from 'react';
import TitleFilters from './TitleFilters';
import TitleTable from './TitleTable';

const STATS = [
  { value: '4,200+', label: 'Total Minor Belts' },
  { value: '3,800', label: 'Active Title Holders' },
  { value: '24', label: 'Organizations' },
  { value: '17', label: 'Weight Classes' },
  { value: '400+', label: 'Vacant Titles' },
];

export default function TitleWithBelt() {
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
            All recognized titles below world championship level — regional, continental, national,
            intercontinental, and international belts across every weight class.
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {STATS.map((s) => (
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
