export interface ApiOrg {
  id: string;
  name: string;
  slug: string;
}

export interface ApiChampion {
  fighter_id: string;
  fighter_name: string;
  title_type: string;
  is_vacant: boolean;
}

export interface ApiRankingItem {
  id: string;
  organization: ApiOrg;
  division: {
    id: string;
    name: string;
    weight_lb: number | null;
    weight_kg: number | null;
  };
  gender: string;
  champions: ApiChampion[];
}

export interface ApiRankingsResponse {
  pagination: {
    page: number;
    items: number;
    total_pages: number;
    total_items: number;
  };
  data: ApiRankingItem[];
}

export interface ApiOrganizationsResponse {
  data: ApiOrg[];
}
