export interface ApiFightParticipant {
  fighter_id?: string | null;
  name?: string | null;
  full_name?: string | null;
  fighter_name?: string | null;
  winner?: boolean;
}

export interface ApiFightResult {
  outcome: string;
  round: string | number | null;
}

export interface ApiFightDivision {
  id: string;
  name: string;
  weight_lb?: number | null;
  weight_kg?: number | null;
}

export interface ApiFightEvent {
  id: string;
  title: string;
  date?: string | null;
  location?: string | null;
  poster_image_url?: string | null;
}

export interface ApiFightTitle {
  id: string;
  name: string;
}

export interface ApiFight {
  id: string;
  title: string;
  date: string;
  status: 'FINISHED' | 'LIVE' | 'NOT_STARTED' | string;
  fighters?: {
    fighter_1?: ApiFightParticipant | null;
    fighter_2?: ApiFightParticipant | null;
  } | null;
  results?: ApiFightResult | null;
  scheduled_rounds?: string | number | null;
  division?: ApiFightDivision | null;
  event?: ApiFightEvent | null;
  titles?: ApiFightTitle[] | null;
  location?: string | null;
  venue?: string | null;
}

export interface ApiFightResultsResponse {
  pagination?: {
    page: number;
    items: number;
    total_pages: number;
    total_items: number;
  };
  error?: Record<string, unknown>;
  data?: ApiFight[];
}

export interface FightResultsData {
  results: ApiFight[];
  totalAvailable: number;
}
