"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * @component GeneralSettings
 * @description General system settings section.
 */
export function GeneralSettings() {
  return (
    <Card className='bg-white rounded-lg shadow-sm border border-slate-200'>
      <CardHeader className='px-6 py-6'>
        <CardTitle className='text-xl font-bold tracking-wide uppercase font-heading'>
          General Settings
        </CardTitle>
      </CardHeader>
      <CardContent className='px-6 pb-6 space-y-6'>
        {/* Site Name */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h3 className='text-sm font-bold tracking-wide'>Site Name</h3>
            <p className='text-xs text-slate-500'>
              The name displayed across the platform
            </p>
          </div>
          <div className='sm:w-64'>
            <Input
              className='w-full text-sm border-slate-200 rounded shadow-sm focus:ring-primary focus:border-primary px-3 py-2'
              defaultValue='Boxing Resume'
            />
          </div>
        </div>

        {/* Admin Email */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 pt-6'>
          <div>
            <h3 className='text-sm font-bold tracking-wide'>Admin Email</h3>
            <p className='text-xs text-slate-500'>
              Primary contact for system notifications
            </p>
          </div>
          <div className='sm:w-64'>
            <Input
              type='email'
              className='w-full text-sm border-slate-200 rounded shadow-sm focus:ring-primary focus:border-primary px-3 py-2'
              defaultValue='admin@boxingresume.com'
            />
          </div>
        </div>

        {/* Timezone */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 pt-6'>
          <div>
            <h3 className='text-sm font-bold tracking-wide'>Timezone</h3>
            <p className='text-xs text-slate-500'>
              Default timezone for events and schedules
            </p>
          </div>
          <div className='sm:w-64'>
            <Select defaultValue='BDT'>
              <SelectTrigger className='w-full text-sm border-slate-200 rounded shadow-sm focus:ring-primary focus:border-primary'>
                <SelectValue placeholder='Select timezone' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='BDT'>BDT</SelectItem>
                <SelectItem value='EST'>EST</SelectItem>
                <SelectItem value='PST'>PST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
