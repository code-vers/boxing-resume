/**
 * @interface IRecentActivity
 * @description Represents a single activity log entry in the dashboard.
 */
export interface IRecentActivity {
  id: string | number;
  /** Primary description of the action (e.g., "New fighter added") */
  content: string;
  /** User or system that performed the action (e.g., "Admin John") */
  user: string;
  /** Relative time string (e.g., "2m ago") */
  timestamp: string;
  /** Status or category determining the dot color */
  type: "fighter" | "result" | "belt" | "user" | "system";
}

/**
 * @interface IPendingReview
 * @description Represents an item awaiting administrative review.
 */
export interface IPendingReview {
  id: string | number;
  /** Category tag for the review item */
  category: "Fighter" | "Result" | "Belt" | "User";
  /** Descriptive text for the request */
  content: string;
}
