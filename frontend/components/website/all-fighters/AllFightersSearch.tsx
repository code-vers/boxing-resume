"use client";

import { type FormEvent } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const divisionOptions = [
  "All Division",
  "Heavyweight",
  "Middleweight",
  "Lightweight",
];
const countryOptions = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Mexico",
];
const ratingOptions = ["Ratings", "Top 10", "Top 25", "Top 50"];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;

interface AllFightersSearchProps {
  query: string;
  setQuery: (value: string) => void;
  division: string;
  setDivision: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  rating: string;
  setRating: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  totalFighters: number;
  filteredCount: number;
}

const AllFightersSearch = ({
  query,
  setQuery,
  division,
  setDivision,
  country,
  setCountry,
  rating,
  setRating,
  status,
  setStatus,
  filteredCount,
}: AllFightersSearchProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(query.trim());
  };

  return (
    <section className="w-full bg-white border-b border-[#e8e2d8] px-4 sm:px-6 lg:px-12 py-3.5">
      <div className="mx-auto">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6">
          {/* Search Box */}
          <form
            className="w-full xl:w-[480px] 2xl:w-[582px] shrink-0"
            onSubmit={handleSubmit}
          >
            <div className="flex h-[38px] w-full items-center gap-2 rounded-[6px] border border-[#d4cec4] bg-white px-3 shadow-sm">
              <Search className="h-4 w-4 shrink-0 text-[#857f78]" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name..."
                className="h-full flex-1 border-0 bg-transparent p-0 text-[13px] font-medium text-[#0a0a0a] placeholder:text-[#857f78] focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>
          </form>

          {/* Filters Area */}
          <div className="flex flex-col sm:flex-row flex-1 items-center gap-3 xl:gap-4 2xl:gap-6">
            {/* Division */}
            <div className="relative w-full sm:w-[200px] 2xl:w-[262px] shrink-0">
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="h-[36px] w-full rounded-[6px] border border-[#d4cec4] bg-white px-3 pr-8 text-[13px] text-[#857f78] outline-none appearance-none cursor-pointer focus:border-[#d72322] transition-colors"
              >
                {divisionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#857f78] pointer-events-none" />
            </div>

            {/* Country */}
            <div className="relative w-full sm:w-[220px] 2xl:w-[290px] shrink-0">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-[36px] w-full rounded-[6px] border border-[#d4cec4] bg-white px-3 pr-8 text-[13px] text-[#857f78] outline-none appearance-none cursor-pointer focus:border-[#d72322] transition-colors"
              >
                {countryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#857f78] pointer-events-none" />
            </div>

            <div className="flex items-center gap-3 xl:gap-4 2xl:gap-6 w-full justify-between xl:justify-start">
              {/* Status Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(opt.value)}
                    className={`h-[26.5px] px-4 rounded-full text-[11px] font-medium transition-colors ${
                      status === opt.value
                        ? "bg-[#d72322] text-white"
                        : "border border-[#d4cec4] text-[#857f78] hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Ratings */}
              <div className="relative w-[120px] 2xl:w-[161px] shrink-0">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="h-[36px] w-full rounded-[6px] border border-[#d4cec4] bg-white px-3 pr-8 text-[13px] text-[#857f78] outline-none appearance-none cursor-pointer focus:border-[#d72322] transition-colors"
                >
                  {ratingOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#857f78] pointer-events-none" />
              </div>

              {/* Results count */}
              <p className="text-[11px] text-[#857f78] whitespace-nowrap hidden sm:block">
                Showing 1–50 of {filteredCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllFightersSearch;
