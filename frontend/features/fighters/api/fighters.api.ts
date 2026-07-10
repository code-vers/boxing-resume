import { axiosInstance } from "@/features/authentication/api/axios.instance";
import { boxingApiInstance } from "@/features/rankings/api/axios.instance";
import { ApiResponse } from "@/features/authentication/types/auth.types";
import { ApiFighter } from "../types";

export interface FetchFightersParams {
  page: number;
  name?: string;
  division_id?: string;
  nationality?: string;
}

/**
 * Fetch all fighters from the local backend.
 * 
 * @returns {Promise<ApiResponse<ApiFighter[]>>} - The backend response containing list of fighters.
 */
export const getFightersApi = async (): Promise<ApiResponse<ApiFighter[]>> => {
  const response = await axiosInstance.get<ApiResponse<ApiFighter[]>>("/fighters");
  return response.data;
};

/**
 * Fetch fighters from the RapidAPI v2 endpoint.
 * Dynamically detects if the API key is a sandbox key that ignores pagination parameters.
 * - If sandbox key: returns 25 items per page (no duplicates).
 * - If production key: merges two consecutive pages to return 50 items per page.
 */
export const getRapidFightersApi = async (params: FetchFightersParams): Promise<any> => {
  const { page, name, division_id, nationality } = params;

  const queryParams1: Record<string, any> = { page_num: 2 * page - 1 };
  const queryParams2: Record<string, any> = { page_num: 2 * page };

  if (name) {
    queryParams1.name = name;
    queryParams2.name = name;
  }
  if (division_id && division_id !== 'all' && division_id !== 'All Division') {
    queryParams1.division_id = division_id;
    queryParams2.division_id = division_id;
  }
  if (nationality && nationality !== 'all' && nationality !== 'All Countries') {
    queryParams1.nationality = nationality;
    queryParams2.nationality = nationality;
  }

  // Fetch both consecutive pages concurrently
  const [res1, res2] = await Promise.all([
    boxingApiInstance.get("/fighters", { params: queryParams1 }),
    boxingApiInstance.get("/fighters", { params: queryParams2 }).catch(() => ({ data: { data: [] } }))
  ]);

  const data1 = res1.data?.data || [];
  const data2 = res2.data?.data || [];

  // Check if it is a sandbox key (i.e., both pages return identical results due to ignored page parameter)
  const isSandboxKey = data1.length > 0 && data2.length > 0 && data1[0].id === data2[0].id;

  // If it's a sandbox key, do not merge (since it's a duplicate of page 1), just use page 1's 25 items
  const finalData = isSandboxKey ? data1 : [...data1, ...data2];
  const itemsPerPage = isSandboxKey ? 25 : 50;

  // Map RapidAPI response fields to the frontend's expected properties
  const formattedFighters = finalData.map((f: any) => ({
    id: f.id,
    firstName: f.name?.split(" ")[0] || "",
    lastName: f.name?.split(" ").slice(1).join(" ") || "",
    nickname: f.nickname || f.alias || "",
    nationality: f.nationality || "",
    division: f.division?.name || "",
    wins: f.stats?.wins || 0,
    losses: f.stats?.losses || 0,
    draws: f.stats?.draws || 0,
    status: f.stance || "active",
  }));

  const totalItems = res1.data?.pagination?.total_items || formattedFighters.length;

  return {
    success: true,
    message: "Fighters fetched successfully",
    data: formattedFighters,
    pagination: {
      page,
      items: itemsPerPage, // Dynamically returns 25 or 50 depending on sandbox status
      total_pages: Math.ceil(totalItems / itemsPerPage),
      total_items: totalItems
    }
  };
};

export const getRapidFighterProfileApi = async (id: string): Promise<any> => {
  const { data } = await boxingApiInstance.get(`/fighters/${id}`);
  return data;
};

export const getRapidFighterFightsApi = async (id: string): Promise<any> => {
  const { data } = await boxingApiInstance.get(`/fights`, {
    params: { fighter_id: id, date_sort: 'DESC' }
  });
  return data;
};

