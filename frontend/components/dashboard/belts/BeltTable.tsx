"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface IBeltRecord {
  id: string | number;
  name: string;
  org: string;
  tier: string;
  division: string;
  heldSince: string;
  status: "Active" | "Vacant" | "Interim";
}

interface BeltTableProps {
  belts: IBeltRecord[];
}

/**
 * @component BeltTable
 * @description Specialized data table for championship belts with organization-specific styling.
 */
export function BeltTable({ belts }: BeltTableProps) {
  const getOrgStyles = (org: string) => {
    switch (org.toUpperCase()) {
      case "WBC":
        return "bg-[#dcfce7] text-[#166534]";
      case "WBA":
        return "bg-[#f3e8ff] text-[#6b21a8]";
      case "IBF":
        return "bg-[#e0f2fe] text-[#075985]";
      case "WBO":
        return "bg-[#d1fae5] text-[#065f46]";
      case "IBO":
        return "bg-[#ede9fe] text-[#5b21b6]";
      case "WBF":
        return "bg-[#ffedd5] text-[#9a3412]";
      case "IBA":
        return "bg-[#fef3c7] text-[#92400e]";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getTierStyles = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "intercontinental":
        return "bg-[#EEEDFE] text-[#26215C]";
      case "continental":
        return "bg-[#FAECE7] text-[#4A1B0C]";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#dcfce7] text-[#15803d]";
      case "Vacant":
        return "bg-[#fee2e2] text-[#b91c1c]";
      case "Interim":
        return "bg-[#fef08a] text-[#a16207]";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className='bg-white shadow-sm rounded-lg overflow-hidden border border-slate-100'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-slate-200 text-sm'>
          <thead className='bg-slate-50/50'>
            <tr>
              <th className='py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-[#656464] uppercase tracking-wider sm:pl-6'>
                Belt Name
              </th>
              <th className='px-3 py-3.5 text-center text-xs font-semibold text-[#656464] uppercase tracking-wider'>
                ORG
              </th>
              <th className='px-3 py-3.5 text-center text-xs font-semibold text-[#656464] uppercase tracking-wider'>
                Tier
              </th>
              <th className='px-3 py-3.5 text-left text-xs font-semibold text-[#656464] uppercase tracking-wider'>
                Division
              </th>
              <th className='px-3 py-3.5 text-left text-xs font-semibold text-[#656464] uppercase tracking-wider'>
                Held Since
              </th>
              <th className='px-3 py-3.5 text-center text-xs font-semibold text-[#656464] uppercase tracking-wider'>
                Status
              </th>
              <th className='py-3.5 pl-3 pr-4 text-center text-xs font-semibold text-[#656464] uppercase tracking-wider sm:pr-6'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 bg-white'>
            {belts.map((belt) => (
              <tr key={belt.id} className='hover:bg-slate-50 transition-colors'>
                <td className='whitespace-nowrap py-4 pl-4 pr-3 font-medium text-[12px]  text-[#0A0A0A] sm:pl-6'>
                  {belt.name}
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-center'>
                  <span
                    className={cn(
                      "inline-flex fontb items-center justify-center px-2 py-1 text-[10px] font-bold rounded uppercase",
                      getOrgStyles(belt.org),
                    )}>
                    {belt.org}
                  </span>
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-center'>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getTierStyles(belt.tier),
                    )}>
                    {belt.tier}
                  </span>
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-[#656464] text-[14px] font-normal'>
                  {belt.division}
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-[#857F78] text-[11px]'>
                  {belt.heldSince}
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-center'>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getStatusStyles(belt.status),
                    )}>
                    {belt.status}
                  </span>
                </td>
                <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-center sm:pr-6'>
                  <button className='text-primary hover:text-red-900 font-medium text-[11px]'>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
