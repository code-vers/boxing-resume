import { useQuery } from "@tanstack/react-query";
import { getFightersApi, getRapidFightersApi, FetchFightersParams, getRapidFighterProfileApi, getRapidFighterFightsApi } from "../api/fighters.api";

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

/**
 * Custom hook to fetch individual fighter profile from RapidAPI using TanStack React Query.
 */
export const useRapidFighterProfile = (id: string) => {
  return useQuery({
    queryKey: ["rapid-fighter-profile", id],
    queryFn: () => getRapidFighterProfileApi(id),
    enabled: !!id,
  });
};

/**
 * Custom hook to fetch individual fighter fights history from RapidAPI using TanStack React Query.
 */
export const useRapidFighterFights = (id: string) => {
  return useQuery({
    queryKey: ["rapid-fighter-fights", id],
    queryFn: () => getRapidFighterFightsApi(id),
    enabled: !!id,
  });
};

