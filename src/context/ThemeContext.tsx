import { createContext } from "react";
import { THEME } from "../lib/const";
import type { Theme } from "../lib/types";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: THEME.LIGHT,
  toggleTheme: () => {},
});
