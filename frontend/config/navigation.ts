import { ROLES, type Role } from "../constants/roles";
import {
  LayoutDashboard,
  Users,
  Settings,
  Briefcase,
  FileText,
  BarChart3,
  Dumbbell,
  Trophy,
  Zap,
  Calendar,
  PiggyBank,
  LogOut,
} from "lucide-react";

export const DASHBOARD_NAVIGATION: Record<
  Role,
  { label: string; href: string; icon: any }[]
> = {
  [ROLES.USER]: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Profile", href: "/dashboard/profile", icon: Users },
  ],
  [ROLES.MANAGER]: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Team", href: "/dashboard/team", icon: Users },
    { label: "Projects", href: "/dashboard/projects", icon: Briefcase },
  ],
  [ROLES.ADMIN]: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Stats & Reports", href: "/dashboard/reports", icon: BarChart3 },
    {
      label: "Fighter Management",
      href: "/dashboard/fighters",
      icon: Dumbbell,
    },
    { label: "Match Records", href: "/dashboard/matches", icon: Trophy },
    { label: "Bouts & Rings", href: "/dashboard/bouts", icon: Zap },
    { label: "Rankings", href: "/dashboard/rankings", icon: Trophy },
    { label: "Events Management", href: "/dashboard/events", icon: Calendar },
    { label: "User Management", href: "/dashboard/users", icon: Users },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
};
