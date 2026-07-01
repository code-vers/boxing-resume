"use client"

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
import { ApiFighter } from "@/features/fighters/types";
import { cn } from "@/lib/utils";
import { useFighters } from "@/features/fighters/hooks/useFighters";

interface FighterTableProps {
  fighters: ApiFighter[];
}

/**
 * @component FighterTable
 * @description Main data table for managing fighters, displaying key stats and actions.
 */
export function FighterTable({ fighters }: FighterTableProps) {

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-white">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Fighter
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Division
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Record
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                KO Rate
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Last Updated
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-slate-100">
            {fighters.length > 0 ? (
              fighters.map((fighter) => {
                const wins = fighter.record?.wins ?? fighter.wins ?? 0;
                const losses = fighter.record?.losses ?? fighter.losses ?? 0;
                const draws = fighter.record?.draws ?? fighter.draws ?? 0;

                return (
                  <TableRow key={fighter.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                            {fighter.firstName[0]}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-slate-900">
                            {fighter.firstName} {fighter.lastName}
                          </div>
                          <div className="text-xs text-slate-500 italic">
                            {fighter.nickname || "No Alias"}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>{fighter.nationality === "Mexico" ? "🇲🇽" : "🇺🇸"}</span> {fighter.nationality || "N/A"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {fighter.division}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className="text-emerald-600">{wins}</span>-
                      <span className="text-red-600">{losses}</span>-
                      <span className="text-slate-900">{draws}</span>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-500">
                      missing
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      missing
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      missing
                    </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#dc2626] hover:text-[#b91c1c] mr-3 font-semibold transition-colors">
                      Edit
                    </button>
                    <button className="text-slate-600 hover:text-slate-900 mr-3 font-semibold transition-colors">
                      View
                    </button>
                    <button className="text-[#dc2626] hover:text-[#b91c1c] font-semibold transition-colors">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="px-6 py-10 text-center text-sm font-medium text-slate-500">
                  No fighters match the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
