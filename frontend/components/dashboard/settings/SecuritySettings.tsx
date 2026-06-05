"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * @component SecuritySettings
 * @description Security configuration section.
 */
export function SecuritySettings() {
  const [tfaEnabled, setTfaEnabled] = useState(false);

  return (
    <Card className='bg-white rounded-lg shadow-sm border border-[#e8e2d8]'>
      <CardHeader className='px-6 py-6'>
        <CardTitle className='text-[18px] font-bebas text-[#0A0A0A] tracking-wide uppercase '>
          Security
        </CardTitle>
      </CardHeader>
      <CardContent className='px-6 pb-6 space-y-6'>
        {/* Session Timeout */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h3 className='text-[12px] font-medium text-[#0A0A0A]   tracking-wide'>
              Session Timeout
            </h3>
            <p className='text-[11px] font-normal text-[#857F78]'>
              Auto-logout after inactivity (minutes)
            </p>
          </div>
          <div className='sm:w-32'>
            <Input
              type='number'
              className='w-full text-sm border-slate-200 rounded shadow-sm focus:ring-primary focus:border-primary px-3 py-2 text-right'
              defaultValue='90'
            />
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 pt-6'>
          <div>
            <h3 className='text-[12px] font-medium   tracking-wide'>
              Two-Factor Authentication
            </h3>
            <p className='text-[11px] font-normal text-[#857F78]'>
              Require 2FA for all admin accounts
            </p>
          </div>
          <div className='flex items-center justify-end sm:w-32'>
            {/* Toggle Switch */}
            <button
              type='button'
              onClick={() => setTfaEnabled(!tfaEnabled)}
              className={cn(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                tfaEnabled ? "bg-primary" : "bg-slate-200",
              )}
              role='switch'
              aria-checked={tfaEnabled}>
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  tfaEnabled ? "translate-x-5" : "translate-x-0",
                )}
              />
            </button>
          </div>
        </div>

        {/* Password Reset Required */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 pt-6'>
          <div>
            <h3 className='text-[12px] font-medium   tracking-wide'>
              Password Reset Required
            </h3>
            <p className='text-[11px] font-normal text-[#857F78]'>
              Days before password must be changed
            </p>
          </div>
          <div className='sm:w-32'>
            <Input
              type='number'
              className='w-full text-sm border-[#d4cec4] placeholder:text-[12px] placeholder:text-[#857F78] text-[12px] rounded focus:ring-primary focus:border-primary px-3 py-2 text-right'
              defaultValue='90'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
