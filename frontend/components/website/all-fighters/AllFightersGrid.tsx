"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allFighters } from "@/constants/seed-data";
import type { IFighter } from "@/types/Fighter.types";

const ITEMS_PER_PAGE = 50;

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
  selectedRating = "All Ratings",
}: AllFightersGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter fighters based on search and selected filters
  const filteredFighters = useMemo(() => {
    return allFighters.filter((fighter) => {
      const matchesSearch =
        !searchQuery ||
        fighter.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fighter.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fighter.nickname &&
          fighter.nickname
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      const matchesDivision =
        selectedDivision === "All Division" ||
        fighter.division === selectedDivision;

      const matchesCountry =
        selectedCountry === "All Countries" ||
        fighter.nationality === selectedCountry;

      const matchesStatus =
        selectedStatus === "all" || fighter.status === selectedStatus;

      return (
        matchesSearch &&
        matchesDivision &&
        matchesCountry &&
        matchesStatus
      );
    });
  }, [searchQuery, selectedDivision, selectedCountry, selectedStatus]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFighters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredFighters.length);
  const paginatedFighters = filteredFighters.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDivision, selectedCountry, selectedStatus]);

  const getAvatarInitials = (fighter: IFighter) => {
    return (fighter.firstName.charAt(0) + fighter.lastName.charAt(0)).toUpperCase();
  };

  const getRecordColors = (record: { wins: number; losses: number; draws: number }) => {
    return [
      { value: record.wins, color: "#166534" },
      { value: record.losses, color: "#991b1b" },
      { value: record.draws, color: "#854d0e" },
    ];
  };

  // Generate mock "Last 6" results (green squares)
  const getLastSixResults = () => {
    return Array.from({ length: 6 }, () => true);
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0a0a0a]">
            RECENT RESULTS
          </h2>
        </div>

        {/* Results Count */}
        <div className="text-xs sm:text-sm font-medium text-[#857f78] mb-4">
          Showing {filteredFighters.length === 0 ? 0 : startIndex + 1}–
          {endIndex} of {filteredFighters.length}
        </div>

        {filteredFighters.length > 0 ? (
          <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <div className="border-b border-[#f1ede1]">
                {/* Table Header */}
                <div className="flex border-b border-[#f1ede1]">
                  <div className="w-[170px] shrink-0 pl-6 pr-4 py-3 text-left">
                    <p className="text-xs font-medium text-[#857f78] uppercase">Rank</p>
                  </div>
                  <div className="w-[244px] shrink-0 px-4 py-3 text-left">
                    <p className="text-xs font-medium text-[#857f78] uppercase">Fighter</p>
                  </div>
                  <div className="w-[159px] shrink-0 px-4 py-3 text-center">
                    <p className="text-xs font-medium text-[#857f78] uppercase">Nationality</p>
                  </div>
                  <div className="w-[150px] shrink-0 px-4 py-3 text-center">
                    <p className="text-xs font-medium text-[#857f78] uppercase">Division</p>
                  </div>
                  <div className="w-[175px] shrink-0 px-4 py-3 text-center">
                    <p className="text-xs font-medium text-[#857f78] uppercase">Record</p>
                  </div>
                  <div className="w-[157px] shrink-0 px-4 py-3 text-center">
                    <p className="text-xs font-medium text-[#857f78] uppercase">KOs</p>
                  </div>
                  <div className="w-[253px] shrink-0 px-4 py-3 text-center">
                    <p className="text-xs font-medium text-[#857f78] uppercase">Last 6</p>
                  </div>
                  <div className="w-[194px] shrink-0 px-4 py-3 text-center">
                    <p className="text-xs font-medium text-[#857f78] uppercase">Rating</p>
                  </div>
                  <div className="w-[269px] shrink-0 px-6 py-3 text-center">
                    <p className="text-xs font-medium text-[#857f78] uppercase">Status</p>
                  </div>
                </div>

                {/* Table Body */}
                {paginatedFighters.map((fighter, index) => (
                  <div key={fighter.id} className="flex border-b border-[#f1ede1] hover:bg-gray-50 transition-colors">
                    {/* Rank */}
                    <div className="w-[170px] shrink-0 flex items-center pl-6 pr-4 py-3">
                      <p className="text-sm font-medium text-[#656464]">
                        {startIndex + index + 1}
                      </p>
                    </div>

                    {/* Fighter */}
                    <div className="w-[244px] shrink-0 flex items-center gap-3 px-4 py-3">
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
                            "{fighter.nickname}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Nationality */}
                    <div className="w-[159px] shrink-0 flex items-center justify-center px-4 py-3">
                      <p className="text-xs text-[#857f78]">
                        {fighter.nationality || "—"}
                      </p>
                    </div>

                    {/* Division */}
                    <div className="w-[150px] shrink-0 flex items-center justify-center px-4 py-3">
                      <p className="text-xs sm:text-sm text-[#3d3b38]">
                        {fighter.division}
                      </p>
                    </div>

                    {/* Record */}
                    <div className="w-[175px] shrink-0 flex items-center justify-center px-4 py-3">
                      <p className="text-xs sm:text-sm font-['Bebas_Neue']">
                        <span style={{ color: "#166534" }}>{fighter.record.wins}</span>
                        <span style={{ color: "#857f78" }}>–</span>
                        <span style={{ color: "#991b1b" }}>{fighter.record.losses}</span>
                        <span style={{ color: "#857f78" }}>–</span>
                        <span style={{ color: "#854d0e" }}>{fighter.record.draws}</span>
                      </p>
                    </div>

                    {/* KOs */}
                    <div className="w-[157px] shrink-0 flex items-center justify-center px-4 py-3">
                      <p className="text-sm font-medium text-[#656464]">
                        {Math.round(fighter.ko_rate)}
                      </p>
                    </div>

                    {/* Last 6 */}
                    <div className="w-[253px] shrink-0 flex items-center justify-center px-4 py-3">
                      <div className="flex gap-[2px]">
                        {getLastSixResults().map((_, i) => (
                          <div
                            key={i}
                            className="h-3 w-3 rounded-sm"
                            style={{ backgroundColor: "#166534" }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="w-[194px] shrink-0 flex items-center justify-center px-4 py-3">
                      <p className="text-sm font-bold font-['Bebas_Neue'] text-[#0a0a0a]">
                        {Math.floor(Math.random() * 2000) + 1000}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="w-[269px] shrink-0 flex items-center justify-center px-6 py-3">
                      <div className="bg-[#dcfce7] px-2 py-1 rounded-full">
                        <p className="text-xs font-medium text-[#166534] capitalize">
                          {fighter.status === "active" ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
              {paginatedFighters.map((fighter, index) => (
                <div
                  key={fighter.id}
                  className="border border-[#f1ede1] rounded-lg p-4 bg-white"
                >
                  {/* Rank and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg text-[#0a0a0a]">
                      #{startIndex + index + 1}
                    </span>
                    <div className="bg-[#dcfce7] px-2 py-1 rounded-full">
                      <p className="text-xs font-medium text-[#166534] capitalize">
                        {fighter.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>
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
                          "{fighter.nickname}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[#857f78] font-medium mb-1">Nationality</p>
                      <p className="text-[#0a0a0a]">{fighter.nationality || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[#857f78] font-medium mb-1">Division</p>
                      <p className="text-[#0a0a0a]">{fighter.division}</p>
                    </div>
                    <div>
                      <p className="text-[#857f78] font-medium mb-1">Record</p>
                      <p className="text-[#0a0a0a] font-['Bebas_Neue']">
                        <span style={{ color: "#166534" }}>{fighter.record.wins}</span>
                        <span style={{ color: "#857f78" }}>–</span>
                        <span style={{ color: "#991b1b" }}>{fighter.record.losses}</span>
                        <span style={{ color: "#857f78" }}>–</span>
                        <span style={{ color: "#854d0e" }}>{fighter.record.draws}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[#857f78] font-medium mb-1">KOs</p>
                      <p className="text-[#0a0a0a]">{Math.round(fighter.ko_rate)}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#857f78] font-medium mb-1">Last 6</p>
                      <div className="flex gap-[2px]">
                        {getLastSixResults().map((_, i) => (
                          <div
                            key={i}
                            className="h-2 w-2 rounded-sm"
                            style={{ backgroundColor: "#166534" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-[#f1ede1]">
              <div className="text-xs sm:text-sm font-medium text-[#857f78]">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-9 w-9 flex items-center justify-center border border-[#d4cec4] rounded-lg text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 flex items-center justify-center border border-[#d4cec4] rounded-lg text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
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
  );
};

export default AllFightersGrid;
