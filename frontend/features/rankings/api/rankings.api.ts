import { boxingApiInstance } from './axios.instance';
import { ApiOrganizationsResponse, ApiTitlesResponse, ApiFighterResponse, ApiEventsResponse, ApiRankingsResponse } from '../types';

export const getOrganizations = async (): Promise<ApiOrganizationsResponse> => {
  const { data } = await boxingApiInstance.get<ApiOrganizationsResponse>('/organizations');
  return data;
};

export const getDivisions = async (): Promise<{ data: { id: string; name: string }[] }> => {
  const { data } = await boxingApiInstance.get('/divisions');
  // Filter out Unclassified
  return { data: data.data.filter((d: any) => d.name !== 'Unclassified') };
};

export const getTitles = async (organizationId?: string): Promise<ApiTitlesResponse> => {
  let url = `/titles`;
  if (organizationId && organizationId !== 'All') {
    url += `?organization_id=${organizationId}`;
  }
  const { data } = await boxingApiInstance.get<ApiTitlesResponse>(url);
  return data;
};

export const getFighter = async (fighterId: string): Promise<ApiFighterResponse> => {
  const { data } = await boxingApiInstance.get<ApiFighterResponse>(`/fighters/${fighterId}`);
  return data;
};

export const getEvents = async (): Promise<ApiEventsResponse> => {
  const { data } = await boxingApiInstance.get<ApiEventsResponse>('/events');
  return data;
};

export const getRankings = async (divisionId?: string): Promise<ApiRankingsResponse> => {
  const { data } = await boxingApiInstance.get<ApiRankingsResponse>(`/rankings?division_id=${divisionId}`);
  
  // Extract all unique fighter IDs from the rankings
  const fighterIds = new Set<string>();
  data.data.forEach(org => {
    org.rankings?.forEach(r => {
      if (r.fighter_id && !r.is_vacant) {
        fighterIds.add(r.fighter_id);
      }
    });
  });

  if (fighterIds.size > 0) {
    try {
      const idsParam = Array.from(fighterIds).join(',');
      const fightersRes = await boxingApiInstance.get(`/fighters?ids=${idsParam}`);
      const fightersMap = new Map();
      
      fightersRes.data.data.forEach((f: { id: string; [key: string]: unknown }) => {
        fightersMap.set(f.id, f);
      });

      // Hydrate rankings with fighter details
      data.data.forEach(org => {
        org.rankings = org.rankings?.map(r => {
          if (r.fighter_id && fightersMap.has(r.fighter_id)) {
            const fDetails = fightersMap.get(r.fighter_id);
            return {
              ...r,
              fighter_details: {
                stats: fDetails.stats,
                nickname: fDetails.nickname,
                alias: fDetails.alias
              }
            };
          }
          return r;
        });
      });
    } catch (e) {
      console.error("Failed to fetch bulk fighter details", e);
    }
  }
  return data;
};
