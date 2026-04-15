import { memo } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const Footer = memo(() => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="ZtweN Oströgrasdki.dev" className="h-10 " />
        </NavLink>
        <span className="font-mono font-bold text-gray-900 dark:text-white hidden">
          &lt;ZtweN.dev<span className="text-green-500">/</span>&gt;
        </span>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {[
            { to: "/", label: "Home" },
            { to: "/compteur", label: "Compteur" },
            { to: "/les-utilisateurs", label: "Users" },
            { to: "/carte-membre", label: "Carte" },
            { to: "/editer-mon-profil", label: "UserDataFormManager" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="text-sm text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-400">© {year} — Tous droits réservés</p>
      </div>
    </footer>
  );
});

export default Footer;
