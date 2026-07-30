import { useQuery } from '@tanstack/react-query';

import { getAllFightResultsApi } from '@/features/results/api/results.api';

export const useFightResults = () =>
  useQuery({
    queryKey: ['fight-results'],
    queryFn: getAllFightResultsApi,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
