'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { boxingApiInstance } from '@/features/rankings/api/axios.instance';
import { Badge } from '@/components/ui/badge';
import { Loader2, Globe, Dumbbell, Calendar, Ruler, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FighterProfileModalProps {
  fighterId: string | null;
  onClose: () => void;
}

const getAvatarInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return 'B';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export function FighterProfileModal({ fighterId, onClose }: FighterProfileModalProps) {
  const isOpen = !!fighterId;

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['fighter-profile-modal', fighterId],
    queryFn: async () => {
      if (!fighterId) return null;
      const res = await boxingApiInstance.get(`/fighters/${fighterId}`);
      return res.data?.data ?? res.data ?? null;
    },
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
  });

  const record = profile?.stats
    ? `${profile.stats.wins ?? 0}–${profile.stats.losses ?? 0}–${profile.stats.draws ?? 0}`
    : '—';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] overflow-y-auto max-h-[90vh] bg-white border border-[#e8e2d8] rounded-[24px] p-6 shadow-2xl">
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="h-8 w-8 text-[#d72322] animate-spin" />
            <p className="text-sm font-medium text-[#857f78]">Loading fighter profile...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center py-12">
            <p className="text-red-500 font-semibold mb-2">Failed to load profile</p>
            <p className="text-xs text-gray-500">{(error as Error).message}</p>
          </div>
        )}

        {/* Profile Content */}
        {!isLoading && profile && (
          <>
            <DialogHeader className="flex flex-col items-center text-center pb-4 border-b border-[#f1ede1] gap-3">
              {/* Profile Avatar */}
              <div className="h-16 w-16 rounded-full bg-[#0a0a0a] border-2 border-[#d72322] flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-white font-['Bebas_Neue'] tracking-wider">
                  {getAvatarInitials(profile.name || 'Unknown')}
                </span>
              </div>

              <div>
                <DialogTitle className="text-2xl font-black text-[#0a0a0a] font-['Bebas_Neue'] tracking-wide uppercase">
                  {profile.name}
                </DialogTitle>
                {profile.alias && (
                  <DialogDescription className="text-sm font-medium italic text-[#857f78] mt-0.5">
                    &ldquo;{profile.alias}&rdquo;
                  </DialogDescription>
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-1">
                <Badge className={cn(
                  'rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                  profile.stance
                    ? 'bg-[#faf8f4] text-[#857f78] border-[#d4cec4]'
                    : 'bg-gray-100 text-gray-800'
                )}>
                  {profile.stance || 'Active Professional'}
                </Badge>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4 text-sm">
              {/* Box 1: Record */}
              <div className="bg-[#faf8f4] border border-[#e8e2d8] rounded-xl p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#857f78] uppercase tracking-wider mb-2">
                  <Award className="h-4 w-4 text-[#d72322]" />
                  <span>Fight Record</span>
                </div>
                <div>
                  <span className="text-2xl font-black font-['Bebas_Neue'] tracking-wide text-[#0a0a0a]">
                    {record}
                  </span>
                  <div className="text-[11px] text-[#857f78] mt-1 font-medium">
                    {profile.stats?.total_rounds ?? 0} total rounds fought
                  </div>
                </div>
              </div>

              {/* Box 2: Division */}
              <div className="bg-[#faf8f4] border border-[#e8e2d8] rounded-xl p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#857f78] uppercase tracking-wider mb-2">
                  <Dumbbell className="h-4 w-4 text-[#d72322]" />
                  <span>Division</span>
                </div>
                <div>
                  <span className="text-base font-bold text-[#0a0a0a] block truncate">
                    {profile.division?.name ?? '—'}
                  </span>
                  <span className="text-xs text-[#857f78] font-medium">
                    {profile.division?.weight_lb ? `${profile.division.weight_lb} lbs` : 'Unlimited weight'}
                  </span>
                </div>
              </div>

              {/* Box 3: Nationality */}
              <div className="bg-[#faf8f4] border border-[#e8e2d8] rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#857f78] uppercase tracking-wider mb-2">
                  <Globe className="h-4 w-4 text-[#d72322]" />
                  <span>Nationality</span>
                </div>
                <div className="text-base font-bold text-[#0a0a0a]">
                  {profile.nationality ?? '—'}
                </div>
                <div className="text-xs text-[#857f78] font-medium mt-0.5">
                  Code: {profile.nationality_code ?? '—'}
                </div>
              </div>

              {/* Box 4: Age & Debut */}
              <div className="bg-[#faf8f4] border border-[#e8e2d8] rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#857f78] uppercase tracking-wider mb-2">
                  <Calendar className="h-4 w-4 text-[#d72322]" />
                  <span>Age & Debut</span>
                </div>
                <div className="text-base font-bold text-[#0a0a0a]">
                  {profile.age ? `${profile.age} Years Old` : 'Age: —'}
                </div>
                <div className="text-xs text-[#857f78] font-medium mt-0.5">
                  Pro Debut: {profile.debut ?? '—'}
                </div>
              </div>

              {/* Box 5: Physical Stats */}
              <div className="bg-[#faf8f4] border border-[#e8e2d8] rounded-xl p-3.5 col-span-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#857f78] uppercase tracking-wider mb-2">
                  <Ruler className="h-4 w-4 text-[#d72322]" />
                  <span>Biometrics & Stance</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
                  <div className="bg-white border border-[#e8e2d8] rounded-lg p-2">
                    <span className="text-[10px] text-[#857f78] block uppercase font-bold">Height</span>
                    <span className="text-sm font-bold text-[#0a0a0a] block mt-0.5 truncate">
                      {profile.height_ft || profile.height || '—'}
                    </span>
                  </div>
                  <div className="bg-white border border-[#e8e2d8] rounded-lg p-2">
                    <span className="text-[10px] text-[#857f78] block uppercase font-bold">Reach</span>
                    <span className="text-sm font-bold text-[#0a0a0a] block mt-0.5 truncate">
                      {profile.reach || '—'}
                    </span>
                  </div>
                  <div className="bg-white border border-[#e8e2d8] rounded-lg p-2">
                    <span className="text-[10px] text-[#857f78] block uppercase font-bold">Stance</span>
                    <span className="text-sm font-bold text-[#0a0a0a] block mt-0.5 capitalize truncate">
                      {profile.stance || '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-[#f1ede1]">
              <button
                onClick={onClose}
                className="h-9 px-5 bg-[#0a0a0a] text-white hover:bg-[#d72322] rounded-lg text-xs font-bold font-['Bebas_Neue'] tracking-wide uppercase transition-colors"
              >
                Close Profile
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
