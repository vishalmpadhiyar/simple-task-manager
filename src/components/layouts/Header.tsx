import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import Navbar from "../Navbar";
import { ROUTE, THEME } from "../../lib/const";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:bg-blue-950 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between py-2 min-h-16">
        <a href={ROUTE.HOME}>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Task Manager
          </span>
          <p className="text-xs text-gray-500 dark:text-white">
            Organize your work, boost your productivity
          </p>
        </a>
        <Navbar />
        <button
          onClick={toggleTheme}
          className="cursor-pointer rounded-full border border-gray-200 hover:bg-gray-200 dark:border-white dark:hover:bg-purple-600 p-2"
        >
          {theme === THEME.DARK ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-white" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-white" />
          )}
        </button>
      </div>
    </header>
  );
}
