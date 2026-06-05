# Pull Request: Admin Dashboard Design Synchronization & Management Pages Implementation

## Title
feat(admin): implement user, events, and settings management and synchronize dashboard design

## Description
This PR implements the missing "Events Management", "User Management", and "Settings" pages, and standardizes the visual design across all administrative dashboard pages based on the latest high-fidelity HTML prototypes.

### Key Changes

#### 1. Settings Implementation (New)
- Created a new administrative page at `/dashboard/settings`.
- Developed modular components in `components/dashboard/settings/`:
    - `SettingsHeader`: Page title and description.
    - `GeneralSettings`: Configuration for Site Name, Admin Email, and Timezone using Shadcn UI `Card`, `Input`, and `Select`.
    - `SecuritySettings`: Security preferences including Session Timeout, Password Reset, and a custom Toggle Switch for Two-Factor Authentication.
    - `SettingsFooter`: "Save Changes" action with signature design styling.

#### 2. User Management Implementation
- Created a new administrative page at `/dashboard/users`.
- Developed modular components in `components/dashboard/users/`:
    - `UserHeader`: Page title and description.
    - `UserStats`: Stat cards for Total Users, Active Today, New This Month, and Pending Verification with trend indicators.
    - `UserFilters`: Advanced filtering with separate groups for Search, Status, and Role to ensure visual clarity and spacious layout.
    - `UserTable`: High-fidelity data table for user accounts with role-based styling (signature red for Admins), status badges, and administrative actions.
- Created `User.types.ts` for standardized user data modeling.

#### 3. Events Management Implementation
- Created a new administrative page at `/dashboard/events`.
- Developed modular components in `components/dashboard/events/`:
    - `EventHeader`: Page title and "Add New Event" action.
    - `EventFilters`: Search functionality and status-based filtering.
    - `EventTable`: Data table displaying event details and administrative actions.

#### 4. Design Synchronization
- **Typography Standardized**: Applied 'Oswald' for headings and 'Inter' for body/table content across the dashboard.
- **Table UI Refinement**: Updated table headers in all management tables to use consistent semi-bold, uppercase styling.
- **Header Synchronization**: Updated `Belts` and `Rankings` page headers to match the new design system.
- **Filter Layout Refinement**: Optimized the spacing in `UserFilters` to keep Search, Status, and Role controls distinct and organized.

#### 5. Data & Technical Fixes
- Expanded `seed-data.ts` with comprehensive user and event data.
- **Resolved Build Error**: Fixed duplicate variable definitions in `seed-data.ts`.
- **TypeScript Type Safety**: Resolved a union type mismatch in `UserStats` and role comparison errors in `UserTable` by utilizing official `ROLES` constants.

### Visual Preview
- **Theme**: Red Primary (`#d72322`), Vintage Off-White Background (`#f1ede1`), and High-Contrast Grays.
- **Components**: Shadow-sm cards, rounded-lg borders, and professional typography.

### How to Test
1. Log in as an Admin.
2. Navigate to **User Management**, **Events Management**, and **Settings** via the sidebar.
3. Verify data display, stats accuracy, and filtering functionality.
4. Verify visual consistency across all dashboard management pages.
