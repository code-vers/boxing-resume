"use client";

import React from "react";
import { fighters } from "@/constants/seed-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FighterStatus } from "@/types/Fighter.types";
import { cn } from "@/lib/utils";

/**
 * @component FighterTable
 * @description Main data table for managing fighters, displaying key stats and actions.
 */
export function FighterTable() {
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
            {fighters.map((fighter) => (
              <TableRow key={fighter.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {fighter.image ? (
                        <img className="h-10 w-10 rounded-full object-cover border border-slate-100" src={fighter.image} alt="" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          {fighter.firstName[0]}
                        </div>
                      )}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                  {fighter.division}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className="text-emerald-600">{fighter.record.wins}</span>-
                  <span className="text-red-600">{fighter.record.losses}</span>-
                  <span className="text-slate-900">{fighter.record.draws}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 font-oswald">
                  {fighter.ko_rate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    className={cn(
                      "px-2.5 py-0.5 rounded-full font-medium text-[11px] shadow-none",
                      fighter.status === FighterStatus.ACTIVE 
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {fighter.status.charAt(0).toUpperCase() + fighter.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  2 days ago
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-[#dc2626] hover:text-[#b91c1c] mr-3 font-semibold transition-colors">Edit</button>
                  <button className="text-slate-600 hover:text-slate-900 mr-3 font-semibold transition-colors">View</button>
                  <button className="text-[#dc2626] hover:text-[#b91c1c] font-semibold transition-colors">Delete</button>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
