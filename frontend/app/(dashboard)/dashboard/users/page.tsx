"use client";

import React, { useMemo, useState } from "react";
import { UserHeader } from "@/components/dashboard/users/UserHeader";
import { UserStats } from "@/components/dashboard/users/UserStats";
import {
  UserFilterValues,
  UserFilters,
} from "@/components/dashboard/users/UserFilters";
import { UserTable } from "@/components/dashboard/users/UserTable";
import {
  users as seedUsers,
  userManagementStats,
} from "@/constants/seed-data";

const initialFilters: UserFilterValues = {
  search: "",
  status: "all",
  role: "all",
};

/**
 * @page UserManagementPage
 * @description Administrative page for managing user accounts, roles, and permissions.
 */
export default function UserManagementPage() {
  const [filters, setFilters] = useState<UserFilterValues>(initialFilters);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return seedUsers.filter((user) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [user.username, user.fullName, user.email]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        filters.status === "all" || user.status === filters.status;

      const matchesRole = filters.role === "all" || user.role === filters.role;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [filters]);

  return (
    <div className='mx-auto space-y-6 pb-10'>
      {/* 1. Page Header */}
      <UserHeader />

      {/* 2. Stats Row */}
      <UserStats stats={userManagementStats} />

      {/* 3. Search & Filtering Controls */}
      <UserFilters values={filters} onChange={setFilters} />

      {/* 4. Data Table */}
      <UserTable users={filteredUsers} />
    </div>
  );
}
