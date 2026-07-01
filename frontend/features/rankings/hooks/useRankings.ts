import { useQuery } from '@tanstack/react-query';
import { getOrganizations, getDivisions, getRankings } from '../api/rankings.api';

export const useOrganizations = () => {
  return useQuery({
    queryKey: ['rapid-organizations'],
    queryFn: getOrganizations,
  });
};

export const useDivisions = () => {
  return useQuery({
    queryKey: ['rapid-divisions'],
    queryFn: getDivisions,
  });
};

export const useRankings = (divisionId?: string) => {
  return useQuery({
    queryKey: ['rapid-rankings', divisionId],
    queryFn: () => getRankings(divisionId!),
    enabled: !!divisionId,
  });
};
