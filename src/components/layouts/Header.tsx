import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import Navbar from "../Navbar";
import { ROUTE, THEME } from "../../lib/const";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50">
      <div className="max-h-16 border-b border-gray-200 bg-white text-black dark:bg-slate-900 dark:border-gray-600 dark:text-white">
        <div className="max-w-7xl mx-auto py-2 px-4 md:px-6 lg:px-8 flex items-center justify-between">
          <a href={ROUTE.HOME}>
            <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Task Manager
            </span>
            <p className="text-xs text-gray-500 dark:text-white">
              Organize your work, boost your productivity
            </p>
          </a>
          <Navbar />
          <button
            onClick={toggleTheme}
            className="p-2 cursor-pointer rounded-full border border-gray-200 hover:bg-gray-200 dark:border-white dark:hover:bg-linear-to-r from-purple-600 to-blue-600"
          >
            {theme === THEME.DARK ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-white" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
