"use client";

import React from "react";

/**
 * @component MatchRecordHeader
 * @description Header for the Match Records Management page.
 */
export function MatchRecordHeader() {
  return (
    <div className="mb-8">
      <h1 className="font-bebas text-4xl text-black mb-1 tracking-wider uppercase">
        FIGHT RESULTS
      </h1>
      <p className="text-slate-500 text-sm">
        Manage and track all professional boxing match results.
      </p>
    </div>
  );
}
