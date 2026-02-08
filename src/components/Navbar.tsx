import useRoute from "../hooks/useRoute";
import { ROUTE } from "../lib/const";

const navLinks = [
  {
    label: "Home",
    route: ROUTE.HOME,
  },
  {
    label: "About",
    route: ROUTE.ABOUT,
  },
  {
    label: "guide",
    route: ROUTE.GUIDE,
  },
];

export default function Navbar() {
  const { route } = useRoute();

  return (
    <nav className="flex items-center justify-between">
      <ul className="flex gap-20 font-medium text-gray-600 dark:text-gray-400">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={
              route === link.route ? "text-blue-600" : "hover:text-purple-600"
            }
          >
            <a
              href={link.route}
              className={`focus-visible:outline-none ${route !== link.route ? "focus-visible:text-purple-600" : ""}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
