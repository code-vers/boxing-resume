"use client";

import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { AddBeltDrawer } from "./AddBeltDrawer";

interface BeltToolbarProps {
  orgFilter: string;
  onOrgFilterChange: (value: string) => void;
}

const organizations = [
  "All ORG",
  "WBC",
  "WBA",
  "IBF",
  "WBO",
  "IBO",
  "WBF",
  "IBA",
];

/**
 * @component BeltToolbar
 * @description Toolbar for filtering by organization and adding new belts.
 */
export function BeltToolbar({
  orgFilter,
  onOrgFilterChange,
}: BeltToolbarProps) {
  const [isAddBeltOpen, setIsAddBeltOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
        {/* Filter Dropdown */}
        <div className='w-full sm:w-64 relative'>
          <select
            value={orgFilter}
            onChange={(e) => onOrgFilterChange(e.target.value)}
            className='appearance-none block w-full bg-white  text-[#857F78] py-2 pl-3 pr-10 rounded-md border border-[#d4cec4] leading-tight focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm font-medium'>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400'>
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Add Action */}
        <button
          onClick={() => setIsAddBeltOpen(true)}
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-primary hover:bg-btn-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 font-bebas focus:ring-primary transition-colors'>
          <Plus className='-ml-1 mr-2 h-5 w-5' />
          ADD NEW BELT
        </button>
      </div>

      <AddBeltDrawer
        isOpen={isAddBeltOpen}
        onClose={() => setIsAddBeltOpen(false)}
      />
    </>
  );
}
