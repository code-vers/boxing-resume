"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddUserDrawer } from "./AddUserDrawer";

/**
 * @component UserHeader
 * @description Header for the User Management page with title and add action.
 */
export function UserHeader() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <>
      <header className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-wide mb-2 uppercase font-heading text-gray-900'>
            User Management
          </h1>
          <p className='text-gray-500 text-sm'>
            Manage user accounts, roles, and permissions.
          </p>
        </div>

        <Button
          onClick={() => setIsAddUserOpen(true)}
          className='bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md text-sm font-bold uppercase tracking-wide flex items-center h-auto'>
          <Plus className='h-4 w-4 mr-2' strokeWidth={3} />
          Add New User
        </Button>
      </header>

      <AddUserDrawer
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
      />
    </>
  );
}
