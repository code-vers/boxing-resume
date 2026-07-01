"use client";

import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRapidFighters } from "@/features/fighters/hooks/useFighters";
import { useDivisions } from "@/features/rankings/hooks/useRankings";
import type { ApiFighter } from "@/features/fighters/types";

interface AllFightersGridProps {
    searchQuery?: string;
    selectedDivision?: string;
    selectedCountry?: string;
    selectedStatus?: string;
    selectedRating?: string;
}

const AllFightersGrid = ({
    searchQuery = "",
    selectedDivision = "All Division",
    selectedCountry = "All Countries",
    selectedStatus = "all",
}: AllFightersGridProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedDivision, selectedCountry, selectedStatus]);

    // Fetch divisions list to map selected division name to its ID
    const { data: divisionsResponse } = useDivisions();
    const divisionsList = useMemo(() => divisionsResponse?.data || [], [divisionsResponse]);

    const selectedDivisionId = useMemo(() => {
        if (!selectedDivision || selectedDivision === 'All Division') return undefined;
        const found = divisionsList.find((d: any) => d.name === selectedDivision);
        return found ? found.id : undefined;
    }, [selectedDivision, divisionsList]);

    // Fetch paginated and filtered fighters directly from the RapidAPI
    const { data: apiResponse, isLoading, error } = useRapidFighters({
        page: currentPage,
        name: searchQuery || undefined,
        division_id: selectedDivisionId,
        nationality: selectedCountry === 'All Countries' ? undefined : selectedCountry
    });

    const paginatedFighters = useMemo<ApiFighter[]>(() => apiResponse?.data || [], [apiResponse]);
    const pagination = apiResponse?.pagination;
    const totalPages = pagination?.total_pages || 1;
    const totalItems = pagination?.total_items || 0;

    const pageSize = pagination?.items || 50;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(
        startIndex + paginatedFighters.length,
        totalItems,
    );

    const getAvatarInitials = (fighter: ApiFighter) => {
        return (
            (fighter.firstName?.charAt(0) || "") + (fighter.lastName?.charAt(0) || "")
        ).toUpperCase() || "B";
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const range = 1;

        pages.push(1);

        if (currentPage - range > 2) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - range);
        const end = Math.min(totalPages - 1, currentPage + range);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage + range < totalPages - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg border border-red-200">
                Failed to load fighters. Please check backend connection.
            </div>
        );
    }

    return (
        <div className="p-0 lg:py-14 lg:px-10">
            <section className="w-full bg-white rounded-2xl">
                <div className="mx-auto px-4 sm:px-6 py-12">
                    {/* Section Header */}
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold font-['Bebas_Neue'] uppercase tracking-[0.72px] text-[#0a0a0a]">
                            RECENT RESULTS
                        </h2>
                    </div>

                    {/* Results Count */}
                    <div className="text-xs sm:text-sm font-medium text-[#857f78] mb-4">
                        Showing{" "}
                        {totalItems === 0 ? 0 : startIndex + 1}–
                        {endIndex} of {totalItems}
                    </div>

                    {paginatedFighters.length > 0 ? (
                        <div className="space-y-6">
                            {/* Desktop Table View */}
                            <div className="hidden sm:block overflow-x-auto">
                                <div className="border-b border-[#f1ede1]">
                                    {/* Table Header */}
                                    <div className="flex border-b border-[#f1ede1]">
                                        <div className="w-[170px] shrink-0 pl-6 pr-4 py-4 text-left">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                Rank
                                            </p>
                                        </div>
                                        <div className="w-[244px] shrink-0 px-4 py-4 text-left">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                Fighter
                                            </p>
                                        </div>
                                        <div className="w-[159px] shrink-0 px-4 py-3 text-center">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                Nationality
                                            </p>
                                        </div>
                                        <div className="w-[150px] shrink-0 px-4 py-3 text-center">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                Division
                                            </p>
                                        </div>
                                        <div className="w-[175px] shrink-0 px-4 py-3 text-center">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                Record
                                            </p>
                                        </div>
                                        <div className="w-[157px] shrink-0 px-4 py-3 text-center">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                KOs
                                            </p>
                                        </div>
                                        <div className="w-[253px] shrink-0 px-4 py-3 text-center">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                Last 6
                                            </p>
                                        </div>
                                        <div className="w-[194px] shrink-0 px-4 py-3 text-center">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                Rating
                                            </p>
                                        </div>
                                        <div className="w-[269px] shrink-0 px-6 py-3 text-center">
                                            <p className="text-xs font-medium text-[#857f78] uppercase">
                                                Status
                                            </p>
                                        </div>
                                    </div>

                                    {/* Table Body */}
                                    {paginatedFighters.map((fighter: ApiFighter, index: number) => {
                                        const wins = fighter.record?.wins ?? fighter.wins ?? 0;
                                        const losses = fighter.record?.losses ?? fighter.losses ?? 0;
                                        const draws = fighter.record?.draws ?? fighter.draws ?? 0;

                                        return (
                                            <div
                                                key={index}
                                                className="flex border-b border-[#f1ede1] hover:bg-gray-50 transition-colors"
                                            >
                                                {/* Rank */}
                                                <div className="w-[170px] shrink-0 flex items-center pl-6 pr-4 py-4">
                                                    <p className="text-sm font-medium text-[#656464]">
                                                        {startIndex + index + 1}
                                                    </p>
                                                </div>

                                                {/* Fighter */}
                                                <div className="w-[244px] shrink-0 flex items-center gap-3 px-4 py-4">
                                                    <div className="h-9 w-9 rounded-full bg-[#0a0a0a] border border-[#d72322] flex items-center justify-center shrink-0">
                                                        <p className="text-xs font-bold text-white font-['Bebas_Neue']">
                                                            {getAvatarInitials(fighter)}
                                                        </p>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs sm:text-sm font-medium text-[#0a0a0a] truncate">
                                                            {fighter.firstName} {fighter.lastName}
                                                        </p>
                                                        {fighter.nickname && (
                                                            <p className="text-xs text-[#857f78] italic truncate">
                                                                &quot;{fighter.nickname}&quot;
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Nationality */}
                                                <div className="w-[159px] shrink-0 flex items-center justify-center px-4 py-4">
                                                    <p className="text-xs text-[#857f78]">
                                                        {fighter.nationality || "—"}
                                                    </p>
                                                </div>

                                                {/* Division */}
                                                <div className="w-[150px] shrink-0 flex items-center justify-center px-4 py-4">
                                                    <p className="text-xs sm:text-sm text-[#3d3b38] text-center">
                                                       {fighter?.division}
                                                    </p>
                                                </div>

                                                {/* Record */}
                                                <div className="w-[175px] shrink-0 flex items-center justify-center px-4 py-4">
                                                    <p className="text-xs sm:text-sm font-['Bebas_Neue']">
                                                        <span style={{ color: "#166534" }}>
                                                            {wins}
                                                        </span>
                                                        <span style={{ color: "#857f78" }}>
                                                            –
                                                        </span>
                                                        <span style={{ color: "#991b1b" }}>
                                                            {losses}
                                                        </span>
                                                        <span style={{ color: "#857f78" }}>
                                                            –
                                                        </span>
                                                        <span style={{ color: "#854d0e" }}>
                                                            {draws}
                                                        </span>
                                                    </p>
                                                </div>

                                                {/* KOs */}
                                                <div className="w-[157px] shrink-0 flex items-center justify-center px-4 py-4">
                                                    <p className="text-xs font-semibold text-slate-500">
                                                        missing
                                                    </p>
                                                </div>

                                                {/* Last 6 */}
                                                <div className="w-[253px] shrink-0 flex items-center justify-center px-4 py-4">
                                                    <p className="text-xs text-slate-500">
                                                        missing
                                                    </p>
                                                </div>

                                                {/* Rating */}
                                                <div className="w-[194px] shrink-0 flex items-center justify-center px-4 py-4">
                                                    <p className="text-xs text-slate-500">
                                                        missing
                                                    </p>
                                                </div>

                                                {/* Status */}
                                                <div className="w-[269px] shrink-0 flex items-center justify-center px-6 py-4">
                                                    <p className="text-xs text-slate-500">
                                                        missing
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="sm:hidden space-y-3">
                                {paginatedFighters.map((fighter: ApiFighter, index: number) => {
                                    const wins = fighter.record?.wins ?? fighter.wins ?? 0;
                                    const losses = fighter.record?.losses ?? fighter.losses ?? 0;
                                    const draws = fighter.record?.draws ?? fighter.draws ?? 0;

                                    return (
                                        <div
                                            key={fighter.id}
                                            className="border border-[#f1ede1] rounded-lg p-5 bg-white shadow-sm"
                                        >
                                            {/* Rank and Status */}
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-bold text-lg text-[#0a0a0a]">
                                                    #{startIndex + index + 1}
                                                </span>
                                                <p className="text-xs text-slate-500">
                                                    missing
                                                </p>
                                            </div>

                                            {/* Fighter Info */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="h-10 w-10 rounded-full bg-[#0a0a0a] border border-[#d72322] flex items-center justify-center shrink-0">
                                                    <p className="text-sm font-bold text-white font-['Bebas_Neue']">
                                                        {getAvatarInitials(fighter)}
                                                    </p>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-[#0a0a0a] truncate">
                                                        {fighter.firstName} {fighter.lastName}
                                                    </p>
                                                    {fighter.nickname && (
                                                        <p className="text-xs text-[#857f78] italic truncate">
                                                            &quot;{fighter.nickname}&quot;
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 gap-3 text-xs">
                                                <div>
                                                    <p className="text-[#857f78] font-medium mb-1">
                                                        Nationality
                                                    </p>
                                                    <p className="text-[#0a0a0a]">
                                                        {fighter.nationality || "—"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[#857f78] font-medium mb-1">
                                                        Division
                                                    </p>
                                                    <p className="text-[#0a0a0a]">
                                                        {fighter.division}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[#857f78] font-medium mb-1">
                                                        Record
                                                    </p>
                                                    <p className="text-[#0a0a0a] font-['Bebas_Neue']">
                                                        <span style={{ color: "#166534" }}>
                                                            {wins}
                                                        </span>
                                                        <span style={{ color: "#857f78" }}>
                                                            –
                                                        </span>
                                                        <span style={{ color: "#991b1b" }}>
                                                            {losses}
                                                        </span>
                                                        <span style={{ color: "#857f78" }}>
                                                            –
                                                        </span>
                                                        <span style={{ color: "#854d0e" }}>
                                                            {draws}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[#857f78] font-medium mb-1">
                                                        KOs
                                                    </p>
                                                    <p className="text-slate-500">
                                                        missing
                                                    </p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-[#857f78] font-medium mb-1">
                                                        Last 6
                                                    </p>
                                                    <p className="text-slate-500">
                                                        missing
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-40 items-center justify-center rounded-lg border border-[#f1ede1] bg-gray-50">
                            <p className="text-center text-[#857f78]">
                                No fighters found matching your search criteria.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center pt-8 border-t border-[#f1ede1] mt-8">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="h-8 px-4 flex items-center justify-center border border-[#d4cec4] rounded-md text-[13px] font-medium text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            Prev
                        </button>

                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((page, idx) => {
                                if (page === "...") {
                                    return (
                                        <span
                                            key={`dots-${idx}`}
                                            className="h-8 w-8 flex items-center justify-center text-[#857f78]"
                                        >
                                            ...
                                        </span>
                                    );
                                }

                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(Number(page))}
                                        className={cn(
                                            "h-8 w-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors",
                                            currentPage === page
                                                ? "bg-[#d72322] text-white"
                                                : "border border-transparent text-[#0a0a0a] hover:bg-gray-50",
                                        )}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                            }
                            disabled={currentPage === totalPages}
                            className="h-8 px-4 flex items-center justify-center border border-[#d4cec4] rounded-md text-[13px] font-medium text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllFightersGrid;
