import React from "react";
import { User, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleTabsProps {
  role: "USER" | "ADMIN";
  setRole: (role: "USER" | "ADMIN") => void;
}

export function RoleTabs({ role, setRole }: RoleTabsProps) {
  return (
    <div className='w-full'>
      <div className='flex gap-2 items-center mb-0'>
        <button
          type='button'
          onClick={() => setRole("USER")}
          className={cn(
            "flex-1 flex justify-center items-center gap-2 py-3 px-6 rounded-t-lg transition-all border-b-2",
            role === "USER"
              ? "border-[#d72322] text-white"
              : "border-transparent text-[#555] hover:text-gray-300"
          )}>
          <User size={20} />
          <span className='font-medium text-lg'>User</span>
        </button>
        <button
          type='button'
          onClick={() => setRole("ADMIN")}
          className={cn(
            "flex-1 flex justify-center items-center gap-2 py-3 px-6 rounded-t-lg transition-all border-b-2",
            role === "ADMIN"
              ? "border-[#d72322] text-white"
              : "border-transparent text-[#555] hover:text-gray-300"
          )}>
          <ShieldCheck size={20} />
          <span className='font-medium text-lg'>Admin</span>
        </button>
      </div>
      <div className='h-[2px] w-full bg-[#1e1e1e] -mt-[2px] relative z-[-1]' />
    </div>
  );
}
