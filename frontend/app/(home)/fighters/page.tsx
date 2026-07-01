"use client";

import { useState, useMemo } from "react";
import AllFightersBanner from "@/components/website/all-fighters/AllFightersBanner";
import AllFightersSearch from "@/components/website/all-fighters/AllFightersSearch";
import AllFightersGrid from "@/components/website/all-fighters/AllFightersGrid";
import { useRapidFighters } from "@/features/fighters/hooks/useFighters";
import { useDivisions } from "@/features/rankings/hooks/useRankings";
import React from "react";

const FightersPage = () => {
    const [query, setQuery] = useState("");
    const [division, setDivision] = useState("All Division");
    const [country, setCountry] = useState("All Countries");
    const [rating, setRating] = useState("All Ratings");
    const [status, setStatus] = useState("all");

    // Fetch divisions list to map selected division name to its ID
    const { data: divisionsResponse } = useDivisions();
    const divisionsList = useMemo(() => divisionsResponse?.data || [], [divisionsResponse]);

    const selectedDivisionId = useMemo(() => {
        if (!division || division === 'All Division') return undefined;
        const found = divisionsList.find((d: any) => d.name === division);
        return found ? found.id : undefined;
    }, [division, divisionsList]);

    // Query filtered counts dynamically from the RapidAPI
    const { data: apiResponse, isLoading } = useRapidFighters({
        page: 1,
        name: query || undefined,
        division_id: selectedDivisionId,
        nationality: country === 'All Countries' ? undefined : country
    });

    // Query grand total count from RapidAPI
    const { data: totalResponse } = useRapidFighters({ page: 1 });

    const totalFighters = totalResponse?.pagination?.total_items || 32619;
    const filteredCount = apiResponse?.pagination?.total_items || 0;

    return (
        <div>
            <AllFightersBanner />
            <AllFightersSearch
                query={query}
                setQuery={setQuery}
                division={division}
                setDivision={setDivision}
                country={country}
                setCountry={setCountry}
                rating={rating}
                setRating={setRating}
                status={status}
                setStatus={setStatus}
                totalFighters={totalFighters}
                filteredCount={filteredCount}
            />
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : (
                <AllFightersGrid
                    searchQuery={query}
                    selectedDivision={division}
                    selectedCountry={country}
                    selectedStatus={status}
                    selectedRating={rating}
                    key={`${query}-${division}-${country}-${status}-${rating}`}
                />
            )}
        </div>
    );
};

export default FightersPage;