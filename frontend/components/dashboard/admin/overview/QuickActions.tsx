"use client";

import {
  Calendar,
  Clipboard,
  Crown,
  Plus,
  Trophy,
  UserPlus,
} from "lucide-react";

/**
 * @component QuickActions
 * @description Displays quick action buttons for common admin tasks.
 */
const QuickActions = () => {
  const actions = [
    { label: "Add Fighter", icon: Plus, href: "/dashboard/fighters/add" },
    {
      label: "Add Fight Result",
      icon: Clipboard,
      href: "/dashboard/results/add",
    },
    { label: "Update Belt", icon: Crown, href: "/dashboard/belts/update" },
    { label: "Add Event", icon: Calendar, href: "/dashboard/events/add" },
    {
      label: "Update Rankings",
      icon: Trophy,
      href: "/dashboard/rankings/update",
    },
    { label: "Add User", icon: UserPlus, href: "/dashboard/users/add" },
  ];

  return (
    <section className='flex flex-col py-6'>
      {/* Header */}
      <h2 className='mb-4 text-[13px] font-bold tracking-widest text-secondary uppercase'>
        Quick Actions
      </h2>

      {/* Actions Container */}
      <div className='flex flex-wrap gap-4'>
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.label}
              href={action.href}
              className='inline-flex items-center gap-2 rounded-lg bg-btn-primary px-4 py-2.5 font-medium text-white transition-all duration-200 hover:bg-btn-primary-hover active:scale-95'>
              <Icon size={18} className='shrink-0' />
              <span className='text-sm'>{action.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
