import { useQuery } from '@tanstack/react-query';
import { boxingApiInstance } from '../api/axios.instance';

export interface EnrichedData {
  nationality: string | null;
  record: string | null;
  kos: number | null;
  lastSix: string;
  status: 'Active' | 'Inactive' | 'N/A';
}

/**
 * @hook useFighterEnrichment
 * @description Lazily fetches and caches profile and fight history details
 * for a single fighter. This drastically reduces the initial API request
 * overhead from 1200+ requests to just 100 per page, preventing HTTP 429 errors.
 */
export const useFighterEnrichment = (fighterId: string, enabled = true) => {
  return useQuery<EnrichedData, Error>({
    queryKey: ['fighter-enrichment', fighterId],
    queryFn: async () => {
      // Parallel fetch to minimize latency
      const [profileRes, fightsRes] = await Promise.all([
        boxingApiInstance.get(`/fighters/${fighterId}`).catch(() => null),
        boxingApiInstance.get(`/fights`, {
          params: { fighter_id: fighterId, date_sort: 'DESC', page_size: 6 }
        }).catch(() => null)
      ]);

      const profile = profileRes?.data?.data ?? profileRes?.data ?? null;
      const fights   = fightsRes?.data?.data   ?? [];

      // Extract Nationality
      const nationality = profile?.nationality ?? profile?.nationality_code ?? null;

      // Extract Record
      const wins   = profile?.stats?.wins   ?? profile?.stats?.win;
      const losses = profile?.stats?.losses ?? profile?.stats?.loss;
      const draws  = profile?.stats?.draws  ?? profile?.stats?.draw;
      const record = (wins !== undefined && losses !== undefined && draws !== undefined)
        ? `${wins}-${losses}-${draws}`
        : null;

      // Extract KOs
      const kos = profile?.stats?.ko_wins != null ? Number(profile.stats.ko_wins) : null;

      // Build Last 6
      let lastSix = 'N/A';
      if (Array.isArray(fights) && fights.length > 0) {
        const finished = fights.filter((f: any) => f?.status === 'FINISHED' && f?.results != null);
        if (finished.length > 0) {
          const recent = finished.slice(0, 6);
          const outcomes: string[] = [];
          
          recent.forEach((fight: any) => {
            const f1 = fight?.fighters?.fighter_1;
            const f2 = fight?.fighters?.fighter_2;
            const outcome = fight?.results?.outcome ?? '';
            
            if (outcome.toUpperCase() === 'NC') {
              outcomes.push('NC');
              return;
            }

            const isF1 = f1?.fighter_id === fighterId;
            const isF2 = f2?.fighter_id === fighterId;
            if (!isF1 && !isF2) return;

            const target   = isF1 ? f1 : f2;
            const opponent = isF1 ? f2 : f1;

            if (target?.winner === true)        outcomes.push('W');
            else if (opponent?.winner === true) outcomes.push('L');
            else                                outcomes.push('D');
          });

          if (outcomes.length > 0) {
            outcomes.reverse();
            lastSix = outcomes.join('-');
          }
        }
      }

      // Build Status (heuristic)
      let status: 'Active' | 'Inactive' | 'N/A' = 'N/A';
      if (Array.isArray(fights) && fights.length > 0) {
        const mostRecent = fights.find((f: any) => f?.status === 'FINISHED' && f?.date);
        if (mostRecent?.date) {
          try {
            const fightDate = new Date(mostRecent.date);
            const now = new Date();
            const diffMonths = (now.getTime() - fightDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
            status = diffMonths > 18 ? 'Inactive' : 'Active';
          } catch {
            status = 'N/A';
          }
        }
      }

      return {
        nationality,
        record,
        kos,
        lastSix,
        status,
      };
    },
    enabled: !!fighterId && enabled,
    staleTime: 15 * 60 * 1000, // 15 mins fresh
    gcTime: 60 * 60 * 1000,    // 1 hour cache
    retry: 2,
    retryDelay: (attempt) => Math.pow(2, attempt) * 1000,
  });
};
