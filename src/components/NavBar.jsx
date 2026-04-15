import { memo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const links = [
  { to: "/", label: "Acceuil" },
  { to: "/compteur", label: "Compteur" },
  { to: "/les-utilisateurs", label: "Les membres" },
  { to: "/carte-membre", label: "Carte" },
  { to: "/evaluation", label: "Faire une évaluation" },
  { to: "/editer-mon-profil", label: "Editer profil" },
];
const Navbar = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all border-b duration-300
        ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm shadow-green-500 border-green-500"
            : "bg-transparent border-green-800"
        }`}
    >
      <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-bold text-lg text-gray-900 dark:text-white font-mono"
        >
          &lt;ZtweN.dev<span className="text-green-500">/</span>&gt;
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-green-500 hover:text-green-500 transition-all duration-200"
            aria-label="Changer de thème"
          >
            {theme === "light" ? "◑" : "○"}
          </button>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700"
            aria-label="Menu"
          >
            <span
              className={`block w-4 h-px bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <ul className="py-2">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "text-green-500"
                        : "text-gray-500 dark:text-gray-400 hover:text-green-500"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
});

export default Navbar;
