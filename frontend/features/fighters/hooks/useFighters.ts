import { useQuery } from "@tanstack/react-query";
import { getFightersApi, getRapidFightersApi, FetchFightersParams } from "../api/fighters.api";

/**
 * Custom hook to fetch fighters list from the local backend using TanStack React Query.
 */
export const useFighters = () => {
  return useQuery({
    queryKey: ["fighters"],
    queryFn: getFightersApi,
  });
};

/**
 * Custom hook to fetch fighters list from RapidAPI using TanStack React Query.
 */
export const useRapidFighters = (params: FetchFightersParams) => {
  return useQuery({
    queryKey: ["rapid-fighters", params],
    queryFn: () => getRapidFightersApi(params),
  });
};
