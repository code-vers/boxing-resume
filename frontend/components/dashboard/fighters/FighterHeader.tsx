"use client";

import React from "react";

/**
 * @component FighterHeader
 * @description Header for the Fighter Management page.
 */
export function FighterHeader() {
  return (
    <header className="mb-8">
      <div>
        <h1 className="font-bebas text-4xl text-black mb-1 tracking-wider uppercase">
          FIGHTER MANAGEMENT
        </h1>
        <p className="text-slate-500 text-sm">
          Add, edit, and manage all fighter profiles and statistics.
        </p>
      </div>
    </header>
  );
}
