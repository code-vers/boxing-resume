"use client";

import React, { useMemo, useState } from "react";
import { EventHeader } from "@/components/dashboard/events/EventHeader";
import {
  EventFilterValues,
  EventFilters,
} from "@/components/dashboard/events/EventFilters";
import { EventTable } from "@/components/dashboard/events/EventTable";
import { events as seedEvents } from "@/constants/seed-data";

const initialFilters: EventFilterValues = {
  search: "",
  status: "all",
};

/**
 * @page EventManagementPage
 * @description Administrative page for managing boxing events.
 */
export default function EventManagementPage() {
  const [filters, setFilters] = useState<EventFilterValues>(initialFilters);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return seedEvents.filter((event) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [event.eventName, event.mainBout, event.venue, event.broadcast]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        filters.status === "all" || event.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [filters]);

  return (
    <div className='mx-auto space-y-6 pb-10 overflow-x-hidden'>
      {/* 1. Page Header with Actions */}
      <EventHeader />

      {/* 2. Search & Filtering Controls */}
      <EventFilters values={filters} onChange={setFilters} />

      {/* 3. Data Table */}
      <EventTable events={filteredEvents} />
    </div>
  );
}
// oxymoron
