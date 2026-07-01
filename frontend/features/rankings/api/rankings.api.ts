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
