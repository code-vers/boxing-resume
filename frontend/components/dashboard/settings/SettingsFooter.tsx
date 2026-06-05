"use client";

import React from "react";
import { Button } from "@/components/ui/button";

/**
 * @component SettingsFooter
 * @description Action buttons for the Settings page.
 */
export function SettingsFooter() {
  return (
    <div className='flex justify-end pt-4 pb-12'>
      <Button className='bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded text-sm tracking-widest transition-colors shadow-sm font-bold uppercase font-heading h-auto'>
        Save Changes
      </Button>
    </div>
  );
}
