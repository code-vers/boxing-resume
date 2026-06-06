'use client';

import React, { useState } from "react";
import TitleWithBelt from "@components/website/title-with-belt/TitleWithBelt";
import TitleFilters, { FilterState } from "@/components/website/title-with-belt/TitleFilters";
import TitleTable from "@/components/website/title-with-belt/TitleTable";

export default function Page() {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        tier: 'All',
        division: 'All Division',
        organization: 'All Organization',
    });

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    return (
        <main>
            <TitleWithBelt />
            <TitleFilters filters={filters} onFilterChange={handleFilterChange} />
            <TitleTable filters={filters} key={`${filters.search}-${filters.tier}-${filters.division}-${filters.organization}`} />
        </main>
    );
}
