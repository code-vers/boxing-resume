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
import { IMatch, WinMethod } from "@/types/MatchRecords.types";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

interface MatchRecordTableProps {
  matches: IMatch[];
}

/**
 * @component MatchRecordTable
 * @description Main data table for managing match records.
 */
export function MatchRecordTable({ matches }: MatchRecordTableProps) {
  const getMethodBadge = (method: WinMethod) => {
    switch (method) {
      case WinMethod.KO:
      case WinMethod.TKO:
        return (
          <Badge className='bg-red-50 text-red-600 border-none shadow-none font-medium uppercase text-[10px] px-2 py-0.5'>
            {method}
          </Badge>
        );
      case WinMethod.SD:
      case WinMethod.MD:
        return (
          <Badge className='bg-yellow-50 text-yellow-600 border-none shadow-none font-bold uppercase text-[10px] px-2 py-0.5'>
            {method}
          </Badge>
        );
      case WinMethod.UD:
        return (
          <Badge className='bg-emerald-50 text-emerald-600 border-none shadow-none font-bold uppercase text-[10px] px-2 py-0.5'>
            {method}
          </Badge>
        );
      default:
        return (
          <Badge className='bg-slate-50 text-slate-600 border-none shadow-none font-bold uppercase text-[10px] px-2 py-0.5'>
            {method}
          </Badge>
        );
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-[#e8e2d8] overflow-hidden'>
      <div className='overflow-x-auto'>
        <Table className='whitespace-nowrap'>
          <TableHeader>
            <TableRow className='border-[#e8e2d8] hover:bg-transparent'>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider'>
                Date
              </TableHead>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider'>
                Winner
              </TableHead>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider'>
                Loser
              </TableHead>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider'>
                Method
              </TableHead>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider'>
                Rounds
              </TableHead>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider'>
                Weight
              </TableHead>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider text-center'>
                Title
              </TableHead>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider'>
                Event
              </TableHead>
              <TableHead className='px-6 py-4 text-left text-[12px] font-bold text-[#656464] uppercase tracking-wider'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='divide-y divide-slate-100'>
            {matches.length > 0 ? (
              matches.map((match) => (
                <TableRow
                  key={match.id}
                  className='hover:bg-slate-50/50 transition-colors border-[#e8e2d8]'>
                  <td className='px-6 py-5 text-[11px] text-[#857F78] font-normal'>
                    {format(new Date(match.date), "MMM d, yyyy")}
                  </td>
                  <td className='px-6 py-5'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-8 w-8 rounded-full bg-slate-100 overflow-hidden'>
                        {match.winner.image ? (
                          <Image
                            src={match.winner.image}
                            alt={match.winner.firstName}
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <div className='h-full w-full flex items-center justify-center text-xs font-bold text-slate-400'>
                            {match.winner.firstName[0]}
                          </div>
                        )}
                      </div>
                      <div className='ml-3'>
                        <div className='text-[12px] font-medium text-[#166534]'>
                          {match.winner.firstName} {match.winner.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-5'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-8 w-8 rounded-full bg-slate-100 overflow-hidden'>
                        {match.loser.image ? (
                          <Image
                            src={match.loser.image}
                            alt={match.loser.firstName}
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <div className='h-full w-full flex items-center justify-center text-xs font-bold text-slate-400'>
                            {match.loser.firstName[0]}
                          </div>
                        )}
                      </div>
                      <div className='ml-3'>
                        <div className='text-[12px] font-normal text-[#991B1B]'>
                          {match.loser.firstName} {match.loser.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-5 text-[10px]'>
                    {getMethodBadge(match.method)}
                  </td>
                  <td className='px-6 py-5 text-[11px] text-slate-900 font-normal'>
                    {match.round} / 12
                  </td>
                  <td className='px-6 py-5 text-[12px] text-slate-900 font-normal capitalize'>
                    {match.weight}
                  </td>
                  <td className='px-6 py-5 text-center'>
                    {match.title && match.title !== "Non-title" ? (
                      <Trophy className='h-4 w-4 text-primary mx-auto' />
                    ) : (
                      <span className='text-slate-300'>-</span>
                    )}
                  </td>
                  <td className='px-6 py-5 text-[11px] text-[#857F78] font-medium'>
                    {match.event.eventName}
                  </td>
                  <TableCell className='px-6 text-[11px] py-4 whitespace-nowrap text-sm font-medium'>
                    <button className='text-[#dc2626] text-[11px] hover:text-[#b91c1c] mr-3 font-semibold transition-colors'>
                      Edit
                    </button>
                    <button className='text-slate-600 text-[11px] hover:text-slate-900 mr-3 font-semibold transition-colors'>
                      View
                    </button>
                    <button className='text-[#dc2626] text-[11px] hover:text-[#b91c1c] font-semibold transition-colors'>
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className='hover:bg-transparent'>
                <TableCell
                  colSpan={9}
                  className='px-6 py-10 text-center text-sm font-medium text-[#656464]'>
                  No match records match the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
