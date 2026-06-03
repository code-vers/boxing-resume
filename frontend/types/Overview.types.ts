/**
 * @interface IStatCard
 * @description Represents a single statistics card in the dashboard overview.
 */
export interface IStatCard {
  /** Label for the statistic (e.g., "Total Fighters") */
  label: string;
  /** The primary numeric value to display */
  value: string | number;
  /** Optional trend information */
  trend?: {
    /** Numeric or text representation of the change (e.g., "+12") */
    value: string | number;
    /** Label for the trend period (e.g., "this week") */
    label: string;
    /** Direction of the trend to determine color/icon */
    type: "up" | "down" | "stable";
  };
  /** Icon or emoji representing the category */
  icon: string;
  /** Category or source of the data (e.g., "Database") */
  source: string;
}

/**
 * @interface IOverviewData
 * @description Data structure for the entire dashboard overview section.
 */
export interface IOverviewData {
  /** Title for the overview section */
  title: string;
  /** Array of stat cards to display in the grid */
  stats: IStatCard[];
}
