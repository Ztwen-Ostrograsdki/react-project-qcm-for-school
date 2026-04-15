import { memo, useState } from "react";
import useFetch from "../hooks/useFetch";

const Users = () => {
  const [hoveredUserId, setHoveredUserId] = useState(null);

  const [search, setSearch] = useState("");

  const hoveredClass = "underline bg-gray-500 text-gray-900";

  const {
    data: users,
    setData: setUsers,
    isLoading,
    error,
  } = useFetch("/users");

  const filterUsers = (user) => {
    const keyword = search.toLowerCase();
    return Object.values(user).some((value) =>
      String(value).toLowerCase().includes(keyword),
    );
  };

  const filteredUsers = users.filter(filterUsers);

  const setHovered = (userId) => {
    setHoveredUserId(userId);
  };

  const resetHovered = () => {
    setHoveredUserId(null);
  };
  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="pt-20 dark:bg-gray-900 mx-auto px-6 min-h-screen relative overflow-hidden flex justify-center flex-col gap-y-2 items-center p-3 w-full shadow-xs rounded-base border-default">
      {error && (
        <h5 className="w-full animate-pulse rounded-md p-2 text-red-800 bg-red-400  text-center">
          Une erreur est survenue : <span className="underline">{error}</span>
        </h5>
      )}
      <form className="items-center justify-center bg-transparent w-full mx-auto text-sky-400">
        <label
          htmlFor="search"
          className="block mb-2.5 text-sm font-medium text-heading sr-only "
        >
          Search
        </label>
        <div className="">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-2 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body rounded-md"
            placeholder="Renseigner les mots clés..."
            required
          />
        </div>
      </form>
      {filteredUsers.length > 0 && (
        <div>
          <table className="w-full text-sm text-left rtl:text-right text-body table">
            <thead className="text-sm text-body bg-orange-400 rounded-md text-orange-900">
              <tr className="border border-gray-500">
                <th
                  scope="col"
                  className="px-6 py-2 font-medium border border-gray-200"
                >
                  N°
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 font-medium border border-gray-200"
                >
                  Utilisateur
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 font-medium border border-gray-200"
                >
                  Pseudo
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 font-medium border border-gray-200"
                >
                  email
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 font-medium border border-gray-200"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  onMouseEnter={() => setHovered(user.id)}
                  key={user.id}
                  onMouseLeave={() => resetHovered()}
                  className={`cursor-pointer border-default border ${hoveredUserId === user.id ? hoveredClass : ""}`}
                >
                  <th
                    scope="row"
                    className="px-6 py-2 border font-medium text-heading whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-2 border">{user.name}</td>
                  <td className="px-6 py-2 border">{user.username}</td>
                  <td className="px-6 py-2 border">{user.email}</td>
                  <td className="px-6 py-2 border">
                    <span
                      className="font-medium text-fg-brand hover:underline border bg-red-600 hover:bg-red-800 text-white cursor-pointer rounded-sm p-1.5 px-3"
                      onClick={() => deleteUser(user.id)}
                    >
                      Supprimer
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="justify-between items-center my-1.5 text-right w-full bg-orange-400">
            <span></span>
            <h5 className="font-semibold text-orange-900 text-right">
              {filteredUsers.length} données trouvée(s)!
            </h5>
          </div>
        </div>
      )}

      {filteredUsers.length === 0 && !isLoading && (
        <div className="flex justify-center items-center m-3 ">
          <h5 className="animate-pulse font-semibold text-orange-400">
            Ouppps aucune donnée trouvée!!!
          </h5>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center m-3 ">
          <h5 className="animate-pulse font-semibold text-gray-300">
            Chargement en cours....
          </h5>
        </div>
      )}
    </div>
  );
};

export default memo(Users);
