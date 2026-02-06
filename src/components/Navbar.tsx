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
  return (
    <nav className="flex items-center justify-between">
      <ul className="flex gap-20">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a href={link.route}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
