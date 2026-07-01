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
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page to 1 when filters change
    const handleFilterChange = (setter: (val: string) => void, value: string) => {
        setter(value);
        setCurrentPage(1);
    };

    // Fetch divisions list to map selected division name to its ID
    const { data: divisionsResponse } = useDivisions();
    const divisionsList = useMemo(() => divisionsResponse?.data || [], [divisionsResponse]);

    const selectedDivisionId = useMemo(() => {
        if (!division || division === 'All Division') return undefined;
        const found = divisionsList.find((d: any) => d.name === division);
        return found ? found.id : undefined;
    }, [division, divisionsList]);

    // Single source of truth query to load data dynamically from the RapidAPI
    const { data: apiResponse, isLoading, error } = useRapidFighters({
        page: currentPage,
        name: query || undefined,
        division_id: selectedDivisionId,
        nationality: country === 'All Countries' ? undefined : country
    });

    const totalFighters = 32619; // Safe static fallback for total database size to save a query
    const filteredCount = apiResponse?.pagination?.total_items || 0;

    return (
        <div>
            <AllFightersBanner />
            <AllFightersSearch
                query={query}
                setQuery={(val) => handleFilterChange(setQuery, val)}
                division={division}
                setDivision={(val) => handleFilterChange(setDivision, val)}
                country={country}
                setCountry={(val) => handleFilterChange(setCountry, val)}
                rating={rating}
                setRating={setRating}
                status={status}
                setStatus={(val) => handleFilterChange(setStatus, val)}
                totalFighters={totalFighters}
                filteredCount={filteredCount}
            />
            <AllFightersGrid
                paginatedFighters={apiResponse?.data || []}
                pagination={apiResponse?.pagination}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default FightersPage;