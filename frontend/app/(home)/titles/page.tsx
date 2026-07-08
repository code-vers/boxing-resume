'use client';

import React, { useState } from "react";
import TitleWithBelt from "@components/website/title-with-belt/TitleWithBelt";
import TitleFilters, { FilterState } from "@/components/website/title-with-belt/TitleFilters";
import TitleTable, { BeltRow } from "@/components/website/title-with-belt/TitleTable";
import TitleHistoryBanner from "@/components/website/title-with-belt/history/TitleHistoryBanner";
import TitleCurrentHolder from "@/components/website/title-with-belt/history/TitleCurrentHolder";
import TitleHistoryTable from "@/components/website/title-with-belt/history/TitleHistoryTable";
import TitleBeltInfo from "@/components/website/title-with-belt/history/TitleBeltInfo";

export default function Page() {
    const [selectedBelt, setSelectedBelt] = useState<BeltRow | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        tier: 'All',
        division: 'All Division',
        organization: 'All Organization',
    });

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    if (selectedBelt) {
        return (
            <main className="bg-[#f1ede1] min-h-screen pb-20">
                <TitleHistoryBanner 
                    beltName={selectedBelt.beltName} 
                    onBack={() => setSelectedBelt(null)} 
                />
                <TitleCurrentHolder 
                    holderName={selectedBelt.holderName}
                    holderInitials={selectedBelt.holderInitials}
                    heldSince={selectedBelt.heldSince}
                    holderId={selectedBelt.holderId}
                />
                <TitleHistoryTable titleId={selectedBelt.id} selectedBelt={selectedBelt} />
                <TitleBeltInfo selectedBelt={selectedBelt} />
            </main>
        );
    }

    return (
        <main>
            <TitleWithBelt />
            <TitleFilters filters={filters} onFilterChange={handleFilterChange} />
            <TitleTable 
                filters={filters} 
                onHistoryClick={setSelectedBelt}
            />
        </main>
    );
}
