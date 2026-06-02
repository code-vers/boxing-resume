/**
 * Enum representing the professional status of a fighter.
 */
export enum FighterStatus {
  ACTIVE = "active",   // Currently competing
  INACTIVE = "inactive", // Not currently competing but not retired
  RETIRED = "retired", // Finished professional career
}

/**
 * Enum representing the boxing stance of a fighter.
 */
export enum Stance {
  ORTHODOX = "orthodox", // Left hand and foot forward
  SOUTHPAW = "southpaw", // Right hand and foot forward
  SWITCH = "switch",     // Capable of fighting in both stances
}

/**
 * Interface for creating or updating a fighter's record (POST/PUT).
 */
export interface FighterPost {
  firstName: string;     // Fighter's first name
  lastName: string;      // Fighter's last name
  nickname?: string;     // Optional ring name or nickname
  image?: string;        // URL to the fighter's profile image
  nationality?: string;  // Country the fighter represents
  birthDate?: Date;      // Date of birth
  division: string;      // Weight class (e.g., "Heavyweight")
  stance?: Stance;       // Primary boxing stance
  height?: string;       // Fighter's height (e.g., "6' 3\"")
  reach?: string;        // Fighter's arm span (e.g., "78\"")
  status: FighterStatus; // Professional status
  record?: {             // Career statistics
    wins: number;
    losses: number;
    draws: number;
  };
  ko_rate?: number;      // Knockout percentage
}

/**
 * Interface for retrieving fighter data (GET).
 */
export interface FighterGet {
  id: number | string;   // Unique identifier
  firstName: string;
  lastName: string;
  nickname?: string;
  image?: string;
  nationality?: string;
  birthDate?: Date;
  division: string;
  stance?: Stance;
  height?: string;
  reach?: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  ko_rate: number;
  status: FighterStatus;
  createdAt: Date;       // Timestamp when the record was created
  updatedAt: Date;       // Timestamp of the last update
}
