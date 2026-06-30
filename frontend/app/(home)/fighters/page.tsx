"use client";

import { useState, useMemo } from "react";
import AllFightersBanner from "@/components/website/all-fighters/AllFightersBanner";
import AllFightersSearch from "@/components/website/all-fighters/AllFightersSearch";
import AllFightersGrid from "@/components/website/all-fighters/AllFightersGrid";
import { allFighters } from "@/constants/seed-data";
import React from "react";

const FightersPage = () => {
    const [query, setQuery] = useState("");
    const [division, setDivision] = useState("All Division");
    const [country, setCountry] = useState("All Countries");
    const [rating, setRating] = useState("All Ratings");
    const [status, setStatus] = useState("all");

    // Calculate filtered fighters count for display
    const filteredCount = useMemo(() => {
        return allFighters.filter((fighter) => {
            const matchesSearch =
                !query ||
                fighter.firstName.toLowerCase().includes(query.toLowerCase()) ||
                fighter.lastName.toLowerCase().includes(query.toLowerCase()) ||
                (fighter.nickname &&
                    fighter.nickname
                        .toLowerCase()
                        .includes(query.toLowerCase()));

            const matchesDivision =
                division === "All Division" || fighter.division === division;

            const matchesCountry =
                country === "All Countries" || fighter.nationality === country;

            const matchesStatus = status === "all" || fighter.status === status;

            return (
                matchesSearch &&
                matchesDivision &&
                matchesCountry &&
                matchesStatus
            );
        }).length;
    }, [query, division, country, status]);

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
                totalFighters={allFighters.length}
                filteredCount={filteredCount}
            />
            <AllFightersGrid
                searchQuery={query}
                selectedDivision={division}
                selectedCountry={country}
                selectedStatus={status}
                selectedRating={rating}
                key={`${query}-${division}-${country}-${status}-${rating}`}
            />
        </div>
    );
};

export default FightersPage;