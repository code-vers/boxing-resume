import { boxingApiInstance } from './axios.instance';
import { ApiOrganizationsResponse, ApiRankingsResponse } from '../types';

export const getOrganizations = async (): Promise<ApiOrganizationsResponse> => {
  const { data } = await boxingApiInstance.get<ApiOrganizationsResponse>('/organizations');
  return data;
};

export const getDivisions = async (): Promise<{ data: { id: string; name: string }[] }> => {
  const { data } = await boxingApiInstance.get('/divisions');
  // Filter out Unclassified
  return { data: data.data.filter((d: any) => d.name !== 'Unclassified') };
};

export const getRankings = async (divisionId: string): Promise<ApiRankingsResponse> => {
  const { data } = await boxingApiInstance.get<ApiRankingsResponse>(`/rankings?division_id=${divisionId}`);
  return data;
};
