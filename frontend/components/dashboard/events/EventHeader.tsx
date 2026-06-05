"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddEventDrawer } from "./AddEventDrawer";

/**
 * @component EventHeader
 * @description Header for the Events Management page with title and add action.
 */
export function EventHeader() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 tracking-tight uppercase font-heading'>
            Events Management
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Manage boxing event schedules, venues, and broadcast details.
          </p>
        </div>

        <Button
          onClick={() => setIsAddEventOpen(true)}
          className='bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md text-sm font-bold uppercase tracking-wide flex items-center h-auto'>
          <Plus className='h-4 w-4 mr-2' strokeWidth={3} />
          Add New Event
        </Button>
      </div>

      <AddEventDrawer
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
      />
    </>
  );
}
