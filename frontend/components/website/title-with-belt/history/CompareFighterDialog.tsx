'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Fighter {
  id: string;
  name: string;
  initials: string;
  record: string;
  weightClass: string;
}

const RECENT_FIGHTERS: Fighter[] = [
  { id: '1', name: 'Tyson Fury', initials: 'TF', record: '34-1-1', weightClass: 'Heavyweight' },
  { id: '2', name: 'Oleksandr Usyk', initials: 'OU', record: '22-0-0', weightClass: 'Heavyweight' },
  { id: '3', name: 'Dmitry Bivol', initials: 'DB', record: '23-0-0', weightClass: 'Light Heavyweight' },
];

interface CompareFighterDialogProps {
  currentFighter: {
    name: string;
    initials: string;
    record: string;
  };
  trigger: React.ReactNode;
}

export default function CompareFighterDialog({ currentFighter, trigger }: CompareFighterDialogProps) {
  const [selectedFighter, setSelectedFighter] = React.useState<Fighter | null>(RECENT_FIGHTERS[0]);

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
              className="w-full bg-white border border-[#d4cec4] rounded-[6px] py-2.5 pl-10 pr-4 text-[13px] font-['Inter'] text-[#0a0a0a] placeholder:text-[#857f78] focus:outline-none focus:ring-1 focus:ring-[#d72322]"
              placeholder="Search fighter to compare..."
            />
          </div>

          {/* Recently Compared */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-['Inter'] text-[#857f78] tracking-[0.8px] uppercase">
              RECENTLY COMPARED
            </span>
            <div className="flex flex-col gap-1 max-h-[164px] overflow-y-auto pr-1">
              {RECENT_FIGHTERS.map((fighter) => (
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
            <button className="w-full bg-[#d72322] text-white py-2.5 rounded-[6px] text-[13px] font-medium font-['Inter'] hover:bg-[#b91c1c] transition-colors">
              Compare Now
            </button>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
