'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getRapidFightersApi } from '@/features/fighters/api/fighters.api';
import { useRouter } from 'next/navigation';

interface Fighter {
  id: string;
  name: string;
  initials: string;
  record: string;
  weightClass: string;
}

interface CompareFighterDialogProps {
  currentFighter: {
    id: string;
    name: string;
    initials: string;
    record: string;
  };
  trigger: React.ReactNode;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function CompareFighterDialog({ currentFighter, trigger }: CompareFighterDialogProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['fighters-search', debouncedSearchTerm],
    queryFn: () => getRapidFightersApi({ page: 1, name: debouncedSearchTerm }),
    enabled: debouncedSearchTerm.length > 2,
  });

  const displayFighters = searchResults?.data?.map((f: any) => ({
    id: f.id,
    name: `${f.firstName} ${f.lastName}`.trim(),
    initials: `${f.firstName?.[0] || ''}${f.lastName?.[0] || ''}`.toUpperCase(),
    record: `${f.wins}-${f.losses}-${f.draws}`,
    weightClass: f.division || 'Unknown',
  })) || [];

  const handleCompare = () => {
    if (selectedFighter && currentFighter.id) {
      router.push(`/compare?f1=${currentFighter.id}&f2=${selectedFighter.id}`);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[480px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 animate-in fade-in zoom-in-95 rounded-[8px]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e8e2d8] pb-4">
            <Dialog.Title className="text-[20px] font-['Bebas_Neue'] text-[#0a0a0a] uppercase tracking-wide">
              COMPARE WITH
            </Dialog.Title>
            <Dialog.Close className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#d72322] focus:ring-offset-2">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          {/* VS Section */}
          <div className="bg-[#f0ebe1] rounded-[6px] p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#d72322] bg-[#0a0a0a] flex items-center justify-center flex-shrink-0">
              <span className="text-[16px] font-['Bebas_Neue'] text-white">{currentFighter.initials}</span>
            </div>
            <div className="flex-1">
              <div className="text-[16px] font-['Bebas_Neue'] text-[#0a0a0a] leading-tight uppercase">
                {currentFighter.name}
              </div>
              <div className="text-[11px] text-[#857f78] font-['Inter']">
                {currentFighter.record}
              </div>
            </div>
            <div className="text-[14px] font-['Bebas_Neue'] text-[#d72322] uppercase px-2">
              vs
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#857f78]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#d4cec4] rounded-[6px] py-2.5 pl-10 pr-4 text-[13px] font-['Inter'] text-[#0a0a0a] placeholder:text-[#857f78] focus:outline-none focus:ring-1 focus:ring-[#d72322]"
              placeholder="Search fighter to compare (e.g. Usyk)..."
            />
          </div>

          {/* Search Results */}
          <div className="flex flex-col gap-2 min-h-[164px]">
            <span className="text-[10px] font-['Inter'] text-[#857f78] tracking-[0.8px] uppercase">
              {debouncedSearchTerm.length > 2 ? 'SEARCH RESULTS' : 'TYPE AT LEAST 3 CHARACTERS TO SEARCH'}
            </span>
            <div className="flex flex-col gap-1 max-h-[164px] overflow-y-auto pr-1">
              {isLoading && <div className="text-sm text-center py-4 text-gray-500">Searching...</div>}
              {!isLoading && displayFighters.length === 0 && debouncedSearchTerm.length > 2 && (
                <div className="text-sm text-center py-4 text-gray-500">No fighters found.</div>
              )}
              {displayFighters.map((fighter: Fighter) => (
                <button
                  key={fighter.id}
                  onClick={() => setSelectedFighter(fighter)}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-[6px] transition-colors text-left",
                    selectedFighter?.id === fighter.id ? "bg-[#f0ebe1]" : "hover:bg-gray-50"
                  )}
                >
                  <div className="w-8 h-8 rounded-full border border-[#d72322] bg-[#0a0a0a] flex items-center justify-center flex-shrink-0">
                    <span className="text-[12px] font-['Bebas_Neue'] text-white">{fighter.initials}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium text-[#0a0a0a] font-['Inter']">
                      {fighter.name}
                    </div>
                    <div className="text-[11px] text-[#857f78] font-['Inter']">
                      {fighter.record}
                    </div>
                  </div>
                  <div className="text-[11px] text-[#b8b2a8] font-['Inter']">
                    {fighter.weightClass}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selection & Action */}
          <div className="flex flex-col gap-3.5 mt-2">
            {selectedFighter && (
              <div className="bg-[#f0ebe1] rounded-[6px] p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#d72322] bg-[#0a0a0a] flex items-center justify-center flex-shrink-0">
                  <span className="text-[16px] font-['Bebas_Neue'] text-white">{selectedFighter.initials}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[16px] font-['Bebas_Neue'] text-[#0a0a0a] leading-tight uppercase">
                    {selectedFighter.name}
                  </div>
                  <div className="text-[11px] text-[#857f78] font-['Inter']">
                    {selectedFighter.record}
                  </div>
                </div>
              </div>
            )}
            <Dialog.Close asChild>
              <button 
                onClick={handleCompare}
                disabled={!selectedFighter}
                className="w-full bg-[#d72322] text-white py-2.5 rounded-[6px] text-[13px] font-medium font-['Inter'] hover:bg-[#b91c1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Now
              </button>
            </Dialog.Close>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
