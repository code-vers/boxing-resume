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

export const getRecentResultsApi = async (): Promise<any[]> => {
  try {
    // 1. Get Top 5 champions from rankings
    const rankingsRes = await boxingApiInstance.get('/rankings');
    const rankings = rankingsRes.data?.data || [];
    
    const championIds = new Set<string>();
    rankings.forEach((r: any) => {
      r.champions?.forEach((c: any) => {
        if (c.fighter_id && !c.is_vacant) championIds.add(c.fighter_id);
      });
    });
    
    // In sandbox we might only have a few, take up to 8 to ensure we get 5 results
    const topIds = Array.from(championIds).slice(0, 8);
    
    let allFights: any[] = [];
    
    // Fetch concurrently to speed up loading
    const promises = topIds.map(id => 
      boxingApiInstance.get(`/fights`, {
        params: { fighter_id: id, date_sort: 'DESC', page_size: 5 }
      }).catch(() => null)
    );
    
    const responses = await Promise.all(promises);
    
    responses.forEach(res => {
      const fights = res?.data?.data || [];
      const finished = fights.filter((f: any) => f.status === 'FINISHED' && f.results);
      if (finished.length > 0) {
        allFights.push(finished[0]); // get their most recent fight
      }
    });
    
    // Sort by date descending
    allFights.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Return top 5 recent results
    return allFights.slice(0, 5);
  } catch (error) {
    console.error("Error fetching recent results:", error);
    return [];
  }
};

export const getFeaturedFightersApi = async (): Promise<any[]> => {
  try {
    const rankingsRes = await boxingApiInstance.get('/rankings');
    const rankings = rankingsRes.data?.data || [];
    
    const championIds = new Set<string>();
    rankings.forEach((r: any) => {
      r.champions?.forEach((c: any) => {
        if (c.fighter_id && !c.is_vacant) championIds.add(c.fighter_id);
      });
    });
    
    const topIds = Array.from(championIds).slice(0, 4);
    
    const promises = topIds.map(id => 
      boxingApiInstance.get(`/fighters/${id}`).catch(() => null)
    );
    
    const responses = await Promise.all(promises);
    
    const featured = responses
      .filter(res => res?.data?.data)
      .map(res => {
        const f = res!.data.data;
        return {
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
        };
      });
      
    return featured;
  } catch (error) {
    console.error("Error fetching featured fighters:", error);
    return [];
  }
};


export const getStatsApi = async () => {
  try {
    const [fRes, fightsRes, titlesRes] = await Promise.all([
      boxingApiInstance.get('/fighters?page_size=1').catch(() => null),
      boxingApiInstance.get('/fights?page_size=1').catch(() => null),
      boxingApiInstance.get('/titles').catch(() => null),
    ]);

    return [
      { value: fRes?.data?.pagination?.total_items ? fRes.data.pagination.total_items.toLocaleString() : 'N/A', label: 'Fighters' },
      { value: fightsRes?.data?.pagination?.total_items ? fightsRes.data.pagination.total_items.toLocaleString() : 'N/A', label: 'Bouts' },
      { value: 'N/A', label: 'Active' },
      { value: 'N/A', label: 'Countries' },
      { value: titlesRes?.data?.data?.length ? titlesRes.data.data.length.toString() : 'N/A', label: 'Titles Tracked' },
    ];
  } catch (error) {
    return [
      { value: 'N/A', label: 'Fighters' },
      { value: 'N/A', label: 'Bouts' },
      { value: 'N/A', label: 'Active' },
      { value: 'N/A', label: 'Countries' },
      { value: 'N/A', label: 'Titles Tracked' },
    ];
  }
};



