import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useCounter } from "../contexts/CounterContext";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const { state } = useCounter();
  return (
    <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            React - Apprentissage
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link
                to="/compteur"
                className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Le compteur
                {state.counter !== 0 && (
                  <span className="mx-1 rounded-full bg-gray-600 text-green-200 p-2 py-0.5">
                    {state.counter}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/les-utilisateurs"
                className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
              >
                Les membres
              </Link>
            </li>
            <li>
              <Link
                to="/carte-membre"
                className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
              >
                Carte de membre
              </Link>
            </li>
          </ul>
        </div>
        <button
          type="button"
          className="flex items-center text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
          id="user-menu-button"
        >
          <img
            className="w-8 h-8 rounded-full"
            src={user.avatar}
            alt="user photo"
          ></img>
          <span className="flex flex-col text-sm text-orange-500">
            <span>{user.username}</span>
            <small>{user.email}</small>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default memo(NavBar);
