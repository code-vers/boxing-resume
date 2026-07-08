export interface ApiOrg {
  id: string;
  name: string;
  slug: string;
}

export interface ApiChampion {
  fighter_id: string | null;
  fighter_name: string;
  title_type: string | null;
  is_vacant: boolean;
}

export interface ApiRank {
  rank: number;
  fighter_id: string | null;
  fighter_name: string;
  is_vacant: boolean;
}

export interface ApiTitle {
  id: string;
  name: string;
  title_type: string;
  gender: string;
  division: {
    id: string;
    name: string;
    weight_lb: number | null;
    weight_kg: number | null;
  };
  organization: ApiOrg;
  fighter_id?: string;
  champion_id?: string;
  fighter?: any;
}

export interface ApiFighter {
  id: string;
  name: string;
  alias: string | null;
  gender: string;
  age: number | null;
  nationality: string | null;
  nationality_code: string | null;
  height?: string;
  reach?: string;
  stance?: string;
  date_of_birth?: string;
  status?: string;
  stats: {
    wins: number;
    losses: number;
    draws: number;
    total_rounds: number;
    ko_wins?: number;
    ko_losses?: number;
  };
  division: {
    id: string;
    name: string;
  };
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
  rankings: ApiRank[];
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

export interface ApiTitlesResponse {
  pagination: {
    page: number;
    items: number;
    total_pages: number;
    total_items: number;
  };
  data: ApiTitle[];
}

export interface ApiFighterResponse {
  data: ApiFighter;
}

export interface ApiOrganizationsResponse {
  data: ApiOrg[];
}

export interface ApiEvent {
  id: string;
  title: string;
  date: string;
  venue: string | null;
  location: string | null;
  broadcasters: Record<string, string>[] | null;
  broadcast: { country: string; broadcasters: string[] }[] | null;
  poster_image_url: string | null;
}

export interface ApiEventsResponse {
  pagination: {
    page: number;
    items: number;
    total_pages: number;
    total_items: number;
  };
  data: ApiEvent[];
}
