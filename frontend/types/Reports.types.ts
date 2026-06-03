/**
 * @interface IPlatformMetric
 * @description Represents a single numeric metric for the reports dashboard.
 */
export interface IPlatformMetric {
  label: string;
  value: string | number;
  unit?: string;
}

/**
 * @interface IPlatformGrowthData
 * @description Data for the line chart showing platform growth.
 */
export interface IPlatformGrowthData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

/**
 * @interface IWeightClassBreakdown
 * @description Data for the horizontal bar chart showing distribution by weight class.
 */
export interface IWeightClassBreakdown {
  label: string;
  count: number;
}

/**
 * @interface IPeopleDatabaseRow
 * @description Represents a single row in the people database table.
 */
export interface IPeopleDatabaseRow {
  id: string | number;
  role: string;
  total: number;
  active: number;
  notable: string;
}

/**
 * @interface IReportsData
 * @description Complete data structure for the Stats & Reports page.
 */
export interface IReportsData {
  metrics: IPlatformMetric[];
  growth: IPlatformGrowthData;
  weightClassBreakdown: IWeightClassBreakdown[];
  peopleDatabase: IPeopleDatabaseRow[];
}
