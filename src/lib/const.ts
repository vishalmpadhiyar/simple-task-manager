export const STORAGE_KEYS = {
  TASKS: "tasks",
  THEME: "theme",
} as const;

export const THEME = {
  LIGHT: "",
  DARK: "dark",
} as const;

export const ROUTE = {
  HOME: "/",
  ABOUT: "/about",
  GUIDE: "/guide",
} as const;

export const FILTERS = {
  ALL: "all",
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export const SORTING = {
  NEWEST: "newest",
  OLDEST: "oldest",
  LAST_UPDATED: "last_updated",
} as const;
