"use client";

import React from "react";
import { statsAndReportsData } from "@/constants/seed-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

/**
 * @component PeopleDatabase
 * @description A comprehensive table showing roles, totals, and active status for platform personnel.
 */
export function PeopleDatabase() {
  const { peopleDatabase } = statsAndReportsData;

  return (
    <section data-purpose='people-database' className='space-y-4'>
      <h2 className='font-oswald mb-4 text-[18px] text-foreground  font-normal tracking-wide uppercase'>
        People Database
      </h2>
      <Card className='overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow className='bg-white hover:bg-white'>
              <TableHead className='font-oswald px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                Role
              </TableHead>
              <TableHead className='font-oswald px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                Total
              </TableHead>
              <TableHead className='font-oswald px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                Active
              </TableHead>
              <TableHead className='font-oswald px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                Most Notable
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white'>
            {peopleDatabase.map((row) => (
              <TableRow
                key={row.id}
                className='hover:bg-slate-50 border-b border-slate-100 last:border-0'>
                <TableCell className='px-6 py-4 text-sm  text-[#656464]'>
                  {row.role}
                </TableCell>
                <TableCell className='font-oswald px-6 py-4 text-sm font-bold text-slate-900'>
                  {row.total}
                </TableCell>
                <TableCell className='px-6 py-4 text-sm font-bold text-emerald-600'>
                  {row.active}
                </TableCell>
                <TableCell className='px-6 py-4 text-sm text-[#857F78]'>
                  {row.notable}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
