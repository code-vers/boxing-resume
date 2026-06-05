"use client";

import React from "react";

/**
 * @component UserHeader
 * @description Header for the User Management page with title and description.
 */
export function UserHeader() {
  return (
    <header className='mb-8'>
      <h1 className='text-3xl font-bold tracking-wide mb-2 uppercase font-heading'>
        User Management
      </h1>
      <p className='text-gray-500 text-sm'>
        Manage user accounts, roles, and permissions.
      </p>
    </header>
  );
}
