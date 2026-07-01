import { useQuery } from '@tanstack/react-query';
import { getOrganizations, getDivisions, getTitles, getFighter } from '../api/rankings.api';

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

export const useTitles = (organizationId?: string) => {
  return useQuery({
    queryKey: ['rapid-titles', organizationId],
    queryFn: () => getTitles(organizationId),
  });
};

export const useFighter = (fighterId?: string) => {
  return useQuery({
    queryKey: ['rapid-fighter', fighterId],
    queryFn: () => getFighter(fighterId as string),
    enabled: !!fighterId,
  });
};
