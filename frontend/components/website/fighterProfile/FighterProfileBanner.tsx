'use client';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChevronRight, Columns, MessageCircle, Search, Share, X } from 'lucide-react';
import { useState } from 'react';

/**
 * @interface FighterBannerData
 * @description Data structure for the fighter profile banner.
 */
interface FighterBannerData {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  initials: string;
  status: string;
  country: string;
  countryFlag: string;
  division: string;
  stance: string;
  height: string;
  reach: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
    kos: number;
  };
  koRateDisplay: string;
  stats: {
    koRate: string;
    proDebut: string;
    totalRounds: number;
    titlesWon: number;
    activeStreak: number;
  };
}

/**
 * @interface CompareFighterData
 * @description Data structure for the fighters listed in the compare modal.
 */
interface CompareFighterData {
  id: string;
  name: string;
  initials: string;
  record: string;
  division: string;
}

/**
 * @constant mockFighterData
 * @description Seed data mimicking the Canelo Alvarez profile.
 */
const mockFighterData: FighterBannerData = {
  id: 'canelo_alvarez',
  firstName: 'Canelo',
  lastName: 'Alvarez',
  nickname: '"Canelo"',
  initials: 'CA',
  status: 'Active',
  country: 'Mexico',
  countryFlag: '🇲🇽',
  division: 'Super Middleweight',
  stance: 'Orthodox',
  height: '5\'8" / 173cm',
  reach: '70.5" / 179cm reach',
  record: { wins: 61, losses: 2, draws: 2, kos: 39 },
  koRateDisplay: '60%',
  stats: {
    koRate: '68%',
    proDebut: '2018',
    totalRounds: 264,
    titlesWon: 4,
    activeStreak: 8,
  },
};

/**
 * @constant mockCompareList
 * @description Seed data for the recently compared list in the Compare Modal.
 */
const mockCompareList: CompareFighterData[] = [
  { id: 'tf', name: 'Tyson Fury', initials: 'TF', record: '34-1-1', division: 'Heavyweight' },
  { id: 'ou', name: 'Oleksandr Usyk', initials: 'OU', record: '22-0-0', division: 'Heavyweight' },
  {
    id: 'db',
    name: 'Dmitry Bivol',
    initials: 'DB',
    record: '23-0-0',
    division: 'Light Heavyweight',
  },
];

/**
 * @component StatBlock
 * @description Renders a single statistic column for the bottom stats strip.
 */
const StatBlock = ({ value, label }: { value: string | number; label: string }) => (
  <div className='flex flex-col items-center justify-center py-6 sm:py-8'>
    <span className='text-[18px] font-black text-surface-white md:text-[22px]'>{value}</span>
    <span className='mt-1 text-[9px] font-bold uppercase tracking-widest text-text-placeholder sm:text-[10px]'>
      {label}
    </span>
  </div>
);

/**
 * @component FighterProfileBanner
 * @description The high-fidelity hero banner featuring fully functional Share and Compare modals.
 * @returns {JSX.Element}
 */
export default function FighterProfileBanner() {
  const data = mockFighterData;
  const [selectedCompareId, setSelectedCompareId] = useState<string>('tf');

  return (
    <div className='flex w-full flex-col font-sans'>
      {/* --- SECTION 1: MAIN HERO AREA --- */}
      <section className='w-full bg-card-dark pb-10 pt-6'>
        <div className='mx-auto flex flex-col px-4 sm:px-6 lg:px-8 '>
          {/* Breadcrumbs */}
          <nav className='flex items-center gap-1 text-[11px] font-medium text-text-placeholder'>
            <span className='cursor-pointer hover:text-surface-white transition-colors'>
              Fighters
            </span>
            <ChevronRight size={12} strokeWidth={2} className='opacity-50' />
            <span className='text-surface-white'>
              {data.firstName} {data.lastName}
            </span>
          </nav>

          <div className='mt-8 flex flex-col items-start justify-between gap-8 md:flex-row'>
            {/* LEFT: Avatar & Info */}
            <div className='flex flex-col gap-6 sm:flex-row sm:gap-8'>
              <div className='flex flex-col items-center'>
                <div className='flex h-[96px] w-[96px] items-center justify-center rounded-full border-2 border-text-accent bg-[#1A1A1A] text-[28px] font-bold tracking-tight text-surface-white shadow-lg'>
                  {data.initials}
                </div>
                <Badge className='mt-4 rounded-full border-none bg-[#E6F4EA] px-3 py-0.5 text-[10px] font-black tracking-widest text-[#166534] hover:bg-[#E6F4EA]'>
                  {data.status}
                </Badge>
              </div>

              <div className='flex flex-col'>
                <h1 className='text-3xl font-black uppercase tracking-tighter text-surface-white sm:text-4xl md:text-[42px] md:leading-none'>
                  {data.firstName} {data.lastName}
                </h1>
                <span className='mt-1 text-[13px] italic text-text-placeholder'>
                  {data.nickname}
                </span>

                <div className='mt-4 flex flex-wrap items-center gap-4 text-[11px] font-medium text-[#857F78] sm:text-[12px]'>
                  <span className='flex items-center gap-1.5'>
                    <span className='text-[14px]'>{data.countryFlag}</span> {data.country}
                  </span>
                  <span>{data.division}</span>
                  <span>{data.stance}</span>
                  <span>{data.height}</span>
                  <span>{data.reach}</span>
                </div>

                <div className='mt-8 flex flex-col gap-2'>
                  <div className='flex items-center gap-6 sm:gap-8'>
                    {['Wins', 'Losses', 'Draws', 'KOs'].map((stat, idx) => (
                      <div key={stat} className='flex flex-col items-center'>
                        <span className='text-[22px] font-bold text-surface-white'>
                          {Object.values(data.record)[idx]}
                        </span>
                        <span className='text-[9px] font-bold uppercase tracking-widest text-text-placeholder'>
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className='mt-1 text-[11px] font-bold text-text-accent'>
                    KO Rate: {data.koRateDisplay}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Action Buttons with Modals */}
            <div className='flex w-full flex-col gap-2.5 sm:w-auto md:w-[180px]'>
              {/* --- COMPARE MODAL --- */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className='flex h-[38px] w-full items-center justify-center gap-2 rounded-[6px] bg-btn-primary text-[12px] font-bold text-surface-white transition-colors hover:bg-btn-primary-hover'>
                    <Columns size={14} strokeWidth={2.5} />
                    Compare Fighter
                  </button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[420px] p-0 overflow-hidden bg-surface-white border-divider rounded-[12px] [&>button]:hidden'>
                  {/* Modal Header */}
                  <div className='flex items-center justify-between border-b border-divider px-6 py-4'>
                    <DialogTitle className='text-[16px] font-black uppercase tracking-tight text-text-primary'>
                      Compare With
                    </DialogTitle>
                    <DialogClose className='text-text-placeholder hover:text-text-primary transition-colors'>
                      <X size={20} strokeWidth={2} />
                    </DialogClose>
                  </div>

                  {/* Modal Body */}
                  <div className='p-6'>
                    {/* Current Fighter Base Card */}
                    <div className='flex items-center justify-between rounded-[8px] bg-page-bg p-4'>
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-text-accent bg-card-dark text-[12px] font-bold text-surface-white'>
                          {data.initials}
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-[13px] font-black uppercase tracking-wide text-text-primary'>
                            {data.firstName} {data.lastName}
                          </span>
                          <span className='text-[11px] font-medium text-text-placeholder'>
                            {data.record.wins}-{data.record.losses}-{data.record.draws}
                          </span>
                        </div>
                      </div>
                      <span className='text-[12px] font-black text-text-accent'>VS</span>
                    </div>

                    {/* Search Input */}
                    <div className='relative mt-4'>
                      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-placeholder' />
                      <Input
                        placeholder='Search fighter to compare...'
                        className='h-10 rounded-[6px] border-divider pl-9 text-[13px] placeholder:text-text-placeholder focus-visible:ring-btn-primary'
                      />
                    </div>

                    <span className='mb-2 mt-6 block text-[10px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Recently Compared
                    </span>

                    {/* Recently Compared List */}
                    <div className='flex flex-col gap-1'>
                      {mockCompareList.map((fighter) => {
                        const isSelected = selectedCompareId === fighter.id;
                        return (
                          <div
                            key={fighter.id}
                            onClick={() => setSelectedCompareId(fighter.id)}
                            className={`flex cursor-pointer items-center justify-between rounded-[8px] p-3 transition-colors ${isSelected ? 'bg-page-bg' : 'hover:bg-gray-50'}`}
                          >
                            <div className='flex items-center gap-3'>
                              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-text-accent bg-card-dark text-[12px] font-bold text-surface-white'>
                                {fighter.initials}
                              </div>
                              <div className='flex flex-col'>
                                <span className='text-[13px] font-black uppercase tracking-wide text-text-primary'>
                                  {fighter.name}
                                </span>
                                <span className='text-[11px] font-medium text-text-placeholder'>
                                  {fighter.record}
                                </span>
                              </div>
                            </div>
                            <span className='text-[11px] font-medium text-text-placeholder'>
                              {fighter.division}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Button */}
                    <button className='mt-6 h-11 w-full rounded-[6px] bg-btn-primary text-[14px] font-bold text-surface-white transition-colors hover:bg-btn-primary-hover'>
                      Compare Now
                    </button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Save Button */}
              <button className='flex h-[38px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#3D3B38] bg-transparent text-[12px] font-bold text-surface-white transition-colors hover:bg-[#1A1A1A]'>
                Save Fighter
              </button>

              {/* --- SHARE MODAL --- */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className='flex h-[38px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#3D3B38] bg-transparent text-[12px] font-bold text-surface-white transition-colors hover:bg-[#1A1A1A]'>
                    <Share size={14} strokeWidth={2.5} />
                    Share
                  </button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[420px] p-0 overflow-hidden bg-surface-white border-divider rounded-[12px] [&>button]:hidden'>
                  {/* Modal Header */}
                  <div className='flex items-center justify-between border-b border-divider px-6 py-4'>
                    <DialogTitle className='text-[16px] font-black uppercase tracking-tight text-text-primary'>
                      Share
                    </DialogTitle>
                    <DialogClose className='text-text-placeholder hover:text-text-primary transition-colors'>
                      <X size={20} strokeWidth={2} />
                    </DialogClose>
                  </div>

                  {/* Modal Body */}
                  <div className='p-6'>
                    {/* Dark Preview Card */}
                    <div className='mb-6 flex flex-col rounded-[8px] bg-card-dark p-5 shadow-sm'>
                      <span className='mb-3 text-[10px] font-black uppercase tracking-widest text-text-accent'>
                        Boxing Resume
                      </span>
                      <span className='text-[16px] font-black uppercase text-surface-white'>
                        {data.firstName} {data.lastName}
                      </span>
                      <span className='my-2 text-center text-[12px] font-black text-text-accent'>
                        VS
                      </span>
                      <span className='text-[16px] font-black uppercase text-surface-white'>
                        OLEKSANDR USYK
                      </span>
                      <span className='mt-4 text-[12px] font-medium text-[#857F78]'>
                        KO Rate: 60% vs 61%
                      </span>
                    </div>

                    <span className='mb-3 block text-[10px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Share To
                    </span>

                    {/* Social Buttons Grid */}
                    <div className='grid grid-cols-2 gap-3'>
                      <button className='flex h-10 items-center gap-3 rounded-[6px] border border-divider px-4 text-[13px] font-bold text-text-primary transition-colors hover:bg-page-bg'>
                        <div className='flex h-4 w-4 items-center justify-center rounded-[3px] bg-black'>
                          <X size={10} className='text-white' strokeWidth={3} />
                        </div>
                        Post on X
                      </button>
                      <button className='flex h-10 items-center gap-3 rounded-[6px] border border-divider px-4 text-[13px] font-bold text-text-primary transition-colors hover:bg-page-bg'>
                        {/* <Facebook size={16} className='text-[#1877F2] fill-[#1877F2]' /> */}
                        Facebook
                      </button>
                      <button className='flex h-10 items-center gap-3 rounded-[6px] border border-divider px-4 text-[13px] font-bold text-text-primary transition-colors hover:bg-page-bg'>
                        <MessageCircle size={16} className='text-[#25D366] fill-[#25D366]' />
                        WhatsApp
                      </button>
                      <button className='flex h-10 items-center gap-3 rounded-[6px] border border-divider px-4 text-[13px] font-bold text-text-primary transition-colors hover:bg-page-bg'>
                        {/* <Instagram size={16} className='text-[#E1306C]' /> */}
                        Instagram
                      </button>
                    </div>

                    <span className='mb-3 mt-6 block text-[10px] font-bold uppercase tracking-widest text-text-placeholder'>
                      Copy Link
                    </span>

                    {/* Link Copy Input */}
                    <div className='flex items-center gap-2'>
                      <Input
                        readOnly
                        value='https://d2c36d3d-0ebf-4f71-817f-f1757cda8e8c-...'
                        className='h-10 flex-1 border-none bg-page-bg text-[12px] text-text-placeholder focus-visible:ring-0'
                      />
                      <button className='h-10 rounded-[6px] bg-card-dark px-5 text-[13px] font-bold text-surface-white transition-colors hover:bg-[#1A1A1A]'>
                        Copy
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: DETAILED STATS STRIP --- */}
      <section className='w-full border-t border-[#1F1F1F] bg-[#141414]'>
        <div className='mx-auto grid max-w-[1400px] grid-cols-2 divide-y divide-[#1F1F1F] px-4 sm:grid-cols-5 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8'>
          <StatBlock value={data.stats.koRate} label='KO Rate' />
          <StatBlock value={data.stats.proDebut} label='Pro Debut' />
          <StatBlock value={data.stats.totalRounds} label='Total Rounds' />
          <StatBlock value={data.stats.titlesWon} label='Titles Won' />
          <StatBlock value={data.stats.activeStreak} label='Active Streak' />
        </div>
      </section>
    </div>
  );
}
