"use client";

import React from "react";

/**
 * @component SettingsHeader
 * @description Header for the Settings page with title and description.
 */
export function SettingsHeader() {
  return (
    <header className='mb-8'>
      <h1 className='text-3xl font-bold tracking-tight mb-2 uppercase font-heading'>
        Settings
      </h1>
      <p className='text-sm text-slate-500'>
        System configuration and preferences
      </p>
    </header>
  );
}
