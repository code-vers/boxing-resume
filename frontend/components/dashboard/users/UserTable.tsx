"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IUser, UserStatus } from "@/types/User.types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface UserTableProps {
  users: IUser[];
}

/**
 * @component UserTable
 * @description Data table for managing user accounts.
 */
export function UserTable({ users }: UserTableProps) {
  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return (
          <Badge className='bg-green-100 text-green-800 border-none shadow-none font-medium px-2 py-0.5 rounded-full text-[10px]'>
            Active
          </Badge>
        );
      case UserStatus.SUSPENDED:
        return (
          <Badge className='bg-red-100 text-red-800 border-none shadow-none font-medium px-2 py-0.5 rounded-full text-[10px]'>
            Suspended
          </Badge>
        );
      case UserStatus.PENDING:
        return (
          <Badge className='bg-yellow-100 text-yellow-800 border-none shadow-none font-medium px-2 py-0.5 rounded-full text-[10px]'>
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className='bg-gray-100 text-gray-800 border-none shadow-none font-medium px-2 py-0.5 rounded-full text-[10px]'>
            {status}
          </Badge>
        );
    }
  };

  const getRoleBadge = (role: string) => {
    const isAdmin = role.toUpperCase() === "ADMIN";
    return (
      <span
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide",
          isAdmin ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600",
        )}>
        {role}
      </span>
    );
  };

  return (
    <section>
      <h2 className='text-xl text-[#0A0A0A]  font-bold tracking-wide mb-4 font-heading'>
        All Users
      </h2>
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table className='min-w-full text-sm text-left'>
            <TableHeader className='text-xs text-gray-500 font-semibold uppercase bg-white border-b border-gray-100'>
              <TableRow className='border border-[#e8e2d8] hover:bg-transparent border-none'>
                <TableHead className='px-4 py-3 w-10 text-center'>
                  <input
                    type='checkbox'
                    className='rounded border-gray-300 text-gray-900 focus:ring-gray-900'
                  />
                </TableHead>
                <TableHead className='px-4 py-3'>USER</TableHead>
                <TableHead className='px-4 py-3'>EMAIL</TableHead>
                <TableHead className='px-4 py-3 text-center'>ROLE</TableHead>
                <TableHead className='px-4 py-3 text-center'>
                  SUBMISSIONS
                </TableHead>
                <TableHead className='px-4 py-3 text-center'>JOINED</TableHead>
                <TableHead className='px-4 py-3 text-center'>Status</TableHead>
                <TableHead className='px-4 py-3 text-right'>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='divide-y divide-gray-100'>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className='hover:bg-gray-50 border border-[#e8e2d8]'>
                    <TableCell className='px-4 py-4 text-center'>
                      <input
                        type='checkbox'
                        className='rounded border-gray-300 text-gray-900 focus:ring-gray-900'
                      />
                    </TableCell>
                    <TableCell className='px-4 py-4 flex items-center gap-3'>
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs",
                          user.role === "ADMIN" && "shadow-[0_0_0_2px_#d72322]",
                        )}>
                        {user.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className='font-medium text-gray-900'>
                          {user.username}
                        </div>
                        <div className='text-gray-500 text-xs italic'>
                          {user.fullName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='px-4 py-4 text-gray-600'>
                      {user.email}
                    </TableCell>
                    <TableCell className='px-4 py-4 text-center'>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell className='px-4 py-4 text-center font-medium'>
                      {user.submissions}
                    </TableCell>
                    <TableCell className='px-4 py-4 text-center text-gray-600'>
                      {format(new Date(user.joinedDate), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className='px-4 py-4 text-center'>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell className='px-4 py-4 text-right text-xs space-x-2'>
                      <button className='text-red-500 hover:underline'>
                        Edit
                      </button>
                      <button className='text-gray-600 hover:underline'>
                        Suspend
                      </button>
                      <button className='text-blue-500 hover:underline'>
                        Verify
                      </button>
                      <button className='text-red-500 hover:underline'>
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className='px-4 py-10 text-center text-sm font-medium text-gray-500'>
                    No users found matching the filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
