import { boxingApiInstance } from './axios.instance';
import { ApiOrganizationsResponse, ApiTitlesResponse, ApiFighterResponse, ApiEventsResponse } from '../types';

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

export const getRankings = async (divisionId?: string) => {
  let url = `/rankings`;
  if (divisionId && divisionId !== 'All') {
    url += `?division_id=${divisionId}`;
  }
  const { data } = await boxingApiInstance.get(url);
  return data;
};

export const getAllRankings = async (): Promise<any[]> => {
  try {
    // 1. Fetch first page to get total_pages
    const firstPageRes = await boxingApiInstance.get('/rankings?page_size=50');
    const firstPageData = firstPageRes.data;
    
    let allRankings = [...(firstPageData.data || [])];
    const totalPages = firstPageData.pagination?.total_pages || 1;

    // 2. If there are more pages, fetch them concurrently
    if (totalPages > 1) {
      const pagePromises = [];
      for (let i = 2; i <= totalPages; i++) {
        pagePromises.push(boxingApiInstance.get(`/rankings?page_size=50&page_num=${i}`));
      }
      
      const responses = await Promise.all(pagePromises);
      responses.forEach(res => {
        if (res.data && res.data.data) {
          allRankings = allRankings.concat(res.data.data);
        }
      });
    }

    return allRankings;
  } catch (error) {
    console.error("Error fetching all rankings:", error);
    return [];
  }
};

export const getTitleFights = async (titleId: string): Promise<any[]> => {
  try {
    const res = await boxingApiInstance.get(`/fights?title_id=${titleId}&date_sort=DESC`);
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching title fights:", error);
    return [];
  }
};
