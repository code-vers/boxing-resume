"use client";

import React from "react";
import { IRanking } from "@/types/Ranking.types";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface RankingTableProps {
  rankings: IRanking[];
}

/**
 * @component RankingTable
 * @description High-fidelity data table for fighter rankings.
 */
export function RankingTable({ rankings }: RankingTableProps) {
  // Mock "Last 6" results (Emerald for Win, Red for Loss, Yellow for Draw)
  const mockLast6 = [
    ["W", "W", "W", "W", "W", "W"],
    ["W", "W", "W", "W", "L", "D"],
    ["W", "W", "W", "W", "W", "W"],
    ["W", "W", "W", "W", "W", "W"],
  ];

  return (
    <div className='bg-white shadow-sm rounded-lg overflow-hidden border border-slate-100'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-slate-200 text-sm'>
          <thead className='bg-white'>
            <tr className='text-[12px]'>
              <th className='px-6 py-4 text-left font-semibold text-[#656464] uppercase tracking-wider '>
                Rank
              </th>
              <th className='px-6 py-4 text-left font-semibold text-[#656464] uppercase tracking-wider'>
                Fighter
              </th>
              <th className='px-6 py-4 text-center font-semibold text-[#656464] uppercase tracking-wider w-28'>
                Record
              </th>
              <th className='px-6 py-4 text-[12px] text-center font-semibold text-[#656464] uppercase tracking-wider w-24'>
                KOs
              </th>
              <th className='px-6 py-4 text-[12px] text-center font-semibold text-[#656464] uppercase tracking-wider w-32'>
                Last 6
              </th>
              <th className='px-6 py-4 text-[12px] text-center font-semibold text-[#656464] uppercase tracking-wider w-24'>
                Rating
              </th>
              <th className='px-6 py-4 text-[12px] text-center font-semibold text-[#656464] uppercase tracking-wider w-24'>
                Change
              </th>
              <th className='px-6 py-4 text-[12px] text-center font-semibold text-[#656464] uppercase tracking-wider w-28'>
                Status
              </th>
              <th className='px-6 py-4 text-[12px] text-right font-semibold text-[#656464] uppercase tracking-wider w-24'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-slate-100'>
            {rankings.map((row, index) => {
              const last6 = mockLast6[index % mockLast6.length];
              const initials = `${row.fighter.firstName[0]}${row.fighter.lastName[0]}`;

              return (
                <tr
                  key={row.id}
                  className='hover:bg-slate-50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap text-slate-500 font-medium'>
                    {row.rank}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm overflow-hidden'>
                        {row.fighter.image ? (
                          <Image
                            src={row.fighter.image}
                            height={200}
                            width={200}
                            alt=''
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          initials
                        )}
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-bold text-slate-900'>
                          {row.fighter.firstName} {row.fighter.lastName}
                        </div>
                        <div className='text-xs text-slate-500 italic'>
                          {row.fighter.nickname || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center font-mono'>
                    <span className='text-emerald-600 font-bold'>
                      {row.record.wins}
                    </span>
                    -<span className='text-slate-400'>{row.record.losses}</span>
                    -<span className='text-slate-400'>{row.record.draws}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center text-slate-500 font-medium'>
                    {row.record.wins > 0
                      ? ((row.record.wins * row.ko_rate) / 100).toFixed(0)
                      : 0}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <div className='flex items-center justify-center gap-1'>
                      {last6.map((res, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-3 h-3 rounded-sm",
                            res === "W"
                              ? "bg-emerald-500"
                              : res === "L"
                                ? "bg-primary"
                                : "bg-yellow-400",
                          )}
                          title={
                            res === "W" ? "Win" : res === "L" ? "Loss" : "Draw"
                          }
                        />
                      ))}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center font-bold text-slate-900'>
                    {row.rating}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    {index % 4 === 0 ? (
                      <span className='inline-flex items-center text-emerald-600 text-xs font-bold'>
                        <ArrowUp size={12} className='mr-0.5' strokeWidth={3} />
                        +12
                      </span>
                    ) : index % 4 === 1 ? (
                      <span className='inline-flex items-center text-primary text-xs font-bold'>
                        <ArrowDown
                          size={12}
                          className='mr-0.5'
                          strokeWidth={3}
                        />
                        -5
                      </span>
                    ) : index % 4 === 3 ? (
                      <span className='inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-primary'>
                        NEW
                      </span>
                    ) : (
                      <span className='text-slate-300 font-bold'>-</span>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <Badge className='bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none shadow-none text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full'>
                      Active
                    </Badge>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <button className='text-primary hover:text-red-700 font-bold text-[11px] uppercase transition-colors'>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
