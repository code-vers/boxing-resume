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
const ratingOptions = ["All Ratings", "Top 10", "Top 25", "Top 50"];

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
    totalFighters,
    filteredCount,
}: AllFightersSearchProps) => {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery(query.trim());
    };

    return (
        <section className="w-full bg-white border-b border-[#e8e2d8] px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto w-full flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Search Form Box */}
                <form
                    className="w-full lg:w-1/3 shrink-0"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <label
                        htmlFor="all-fighters-search"
                        className="sr-only"
                    >
                        Search fighters by name
                    </label>
                    <div className="flex h-9 w-full items-center gap-3 rounded-[6px] border border-[#d4cec4] bg-white px-3 shadow-sm">
                        <Search
                            className="h-4 w-4 shrink-0 text-[#857f78]"
                            aria-hidden="true"
                        />
                        <Input
                            id="all-fighters-search"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search by name..."
                            autoComplete="off"
                            className="h-full flex-1 border-0 bg-transparent p-0 text-sm font-medium text-text-primary placeholder:text-text-placeholder focus-visible:ring-0 focus-visible:outline-none"
                        />
                    </div>
                </form>

                {/* Filters Content Area */}
                <div className="w-full lg:flex-1 space-y-4">
                    {/* Responsive Filter Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 items-center">
                        {/* Division Dropdown */}
                        <div className="w-full">
                            <label
                                htmlFor="division"
                                className="sr-only"
                            >
                                Division
                            </label>
                            <div className="flex h-9 items-center justify-between gap-2 rounded-[6px] border border-[#d4cec4] bg-white px-3 text-sm text-[#857f78]">
                                <select
                                    id="division"
                                    value={division}
                                    onChange={(event) =>
                                        setDivision(event.target.value)
                                    }
                                    className="h-full w-full border-0 bg-transparent text-sm text-[#857f78] outline-none appearance-none cursor-pointer"
                                >
                                    {divisionOptions.map((option) => (
                                        <option
                                            key={option}
                                            value={option}
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="h-4 w-4 text-[#857f78] pointer-events-none" />
                            </div>
                        </div>

                        {/* Country Dropdown */}
                        <div className="w-full">
                            <label
                                htmlFor="country"
                                className="sr-only"
                            >
                                Country
                            </label>
                            <div className="flex h-9 items-center justify-between gap-2 rounded-[6px] border border-[#d4cec4] bg-white px-3 text-sm text-[#857f78]">
                                <select
                                    id="country"
                                    value={country}
                                    onChange={(event) =>
                                        setCountry(event.target.value)
                                    }
                                    className="h-full w-full border-0 bg-transparent text-sm text-[#857f78] outline-none appearance-none cursor-pointer"
                                >
                                    {countryOptions.map((option) => (
                                        <option
                                            key={option}
                                            value={option}
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="h-4 w-4 text-[#857f78] pointer-events-none" />
                            </div>
                        </div>

                        {/* Ratings Dropdown */}
                        <div className="w-full">
                            <label
                                htmlFor="ratings"
                                className="sr-only"
                            >
                                Ratings
                            </label>
                            <div className="flex h-9 items-center justify-between gap-2 rounded-[6px] border border-[#d4cec4] bg-white px-3 text-sm text-[#857f78]">
                                <select
                                    id="ratings"
                                    value={rating}
                                    onChange={(event) =>
                                        setRating(event.target.value)
                                    }
                                    className="h-full w-full border-0 bg-transparent text-sm text-[#857f78] outline-none appearance-none cursor-pointer"
                                >
                                    {ratingOptions.map((option) => (
                                        <option
                                            key={option}
                                            value={option}
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="h-4 w-4 text-[#857f78] pointer-events-none" />
                            </div>
                        </div>

                        {/* Status Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:col-span-2 lg:col-span-1">
                            {statusOptions.map((option) => {
                                const isActive = status === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setStatus(option.value)}
                                        className={`inline-flex h-[26.5px] min-w-[36px] items-center justify-center rounded-full px-3 text-[11px] font-medium transition ${
                                            isActive
                                                ? "bg-[#d72322] text-white"
                                                : "border border-[#d4cec4] text-[#857f78] hover:bg-gray-50"
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                        {/* Info Row */}
                        <div className="flex justify-between items-center pt-1">
                            <p className="text-xs font-normal text-[#857f78]">
                                Showing {filteredCount === 0 ? 0 : "1–50"} of {filteredCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllFightersSearch;
