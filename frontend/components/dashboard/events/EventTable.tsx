"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IEvent, EventStatus } from "@/types/Event.types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventTableProps {
  events: IEvent[];
}

/**
 * @component EventTable
 * @description Data table for displaying boxing events.
 */
export function EventTable({ events }: EventTableProps) {
  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case EventStatus.UPCOMING:
        return (
          <Badge className='bg-yellow-100 text-yellow-800 border-none shadow-none font-medium px-2.5 py-0.5 rounded-full text-xs'>
            Upcoming
          </Badge>
        );
      case EventStatus.ONGOING:
        return (
          <Badge className='bg-blue-100 text-blue-800 border-none shadow-none font-medium px-2.5 py-0.5 rounded-full text-xs'>
            Live
          </Badge>
        );
      case EventStatus.COMPLETED:
        return (
          <Badge className='bg-green-100 text-green-800 border-none shadow-none font-medium px-2.5 py-0.5 rounded-full text-xs'>
            Completed
          </Badge>
        );
      default:
        return (
          <Badge className='bg-gray-100 text-gray-800 border-none shadow-none font-medium px-2.5 py-0.5 rounded-full text-xs'>
            {status}
          </Badge>
        );
    }
  };

  return (
    <section>
      <h2 className='text-2xl font-bold text-gray-900 tracking-tight mb-4 font-heading'>
        Recent Results
      </h2>
      <div className='bg-white rounded-md shadow-sm overflow-hidden border border-gray-100'>
        <div className='overflow-x-auto'>
          <Table className='min-w-full divide-y divide-gray-200 text-sm'>
            <TableHeader className='bg-white border-b border-gray-200'>
              <TableRow className='hover:bg-transparent border-none'>
                <TableHead className='px-6 py-4 text-left font-sans font-semibold text-[#555] text-[0.75rem] uppercase tracking-wider'>
                  Event Name
                </TableHead>
                <TableHead className='px-6 py-4 text-left font-sans font-semibold text-[#555] text-[0.75rem] uppercase tracking-wider'>
                  Main Bout
                </TableHead>
                <TableHead className='px-6 py-4 text-left font-sans font-semibold text-[#555] text-[0.75rem] uppercase tracking-wider'>
                  Venue
                </TableHead>
                <TableHead className='px-6 py-4 text-center font-sans font-semibold text-[#555] text-[0.75rem] uppercase tracking-wider'>
                  Bouts
                </TableHead>
                <TableHead className='px-6 py-4 text-left font-sans font-semibold text-[#555] text-[0.75rem] uppercase tracking-wider'>
                  Broadcast
                </TableHead>
                <TableHead className='px-6 py-4 text-left font-sans font-semibold text-[#555] text-[0.75rem] uppercase tracking-wider'>
                  Date
                </TableHead>
                <TableHead className='px-6 py-4 text-left font-sans font-semibold text-[#555] text-[0.75rem] uppercase tracking-wider'>
                  Status
                </TableHead>
                <TableHead className='px-6 py-4 text-left font-sans font-semibold text-[#555] text-[0.75rem] uppercase tracking-wider'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='bg-white divide-y divide-gray-100'>
              {events.length > 0 ? (
                events.map((event) => (
                  <TableRow key={event.id} className='hover:bg-gray-50 border-none'>
                    <TableCell className='px-6 py-4 whitespace-nowrap font-medium text-gray-900'>
                      {event.eventName}
                    </TableCell>
                    <TableCell className='px-6 py-4 whitespace-nowrap text-gray-600'>
                      {event.mainBout}
                    </TableCell>
                    <TableCell className='px-6 py-4 whitespace-nowrap text-gray-600'>
                      {event.venue}
                    </TableCell>
                    <TableCell className='px-6 py-4 whitespace-nowrap text-center font-medium'>
                      {event.bouts}
                    </TableCell>
                    <TableCell className='px-6 py-4 whitespace-nowrap text-gray-500'>
                      {event.broadcast}
                    </TableCell>
                    <TableCell className='px-6 py-4 whitespace-nowrap text-gray-400 text-xs'>
                      {format(new Date(event.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(event.status)}
                    </TableCell>
                    <TableCell className='px-6 py-4 whitespace-nowrap text-xs space-x-3 font-medium'>
                      <button className='text-primary hover:underline'>Edit</button>
                      <button className='text-gray-600 hover:underline'>Build Card</button>
                      <button className='text-blue-600 hover:underline'>Photos</button>
                      <button className='text-primary hover:underline'>Cancel</button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className='px-6 py-10 text-center text-sm font-medium text-gray-500'>
                    No events found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
