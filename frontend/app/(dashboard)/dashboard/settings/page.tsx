"use client";

import React from "react";
import { SettingsHeader } from "@/components/dashboard/settings/SettingsHeader";
import { GeneralSettings } from "@/components/dashboard/settings/GeneralSettings";
import { SecuritySettings } from "@/components/dashboard/settings/SecuritySettings";
import { SettingsFooter } from "@/components/dashboard/settings/SettingsFooter";

/**
 * @page SettingsPage
 * @description Administrative page for system configuration and security preferences.
 */
export default function SettingsPage() {
  return (
    <div className='mx-auto max-w-5xl space-y-6 pb-10'>
      {/* 1. Page Header */}
      <SettingsHeader />

      {/* 2. Main Content Sections */}
      <main className='space-y-6'>
        {/* General Settings Section */}
        <GeneralSettings />

        {/* Security Settings Section */}
        <SecuritySettings />

        {/* Action Footer */}
        <SettingsFooter />
      </main>
    </div>
  );
}
