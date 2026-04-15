import { memo, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const UserDataFormManager = () => {
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    birthYear: user.birthYear,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({ ...user, ...form });
  };

  return (
    <div className="bg-gray-800 w-3/5 pt-30 dark:bg-gray-900 mx-auto px-6 min-h-screen relative overflow-hidden">
      <form
        className="form flex flex-col gap-y-2 items-center justify-center border p-3 border-sky-600 rounded-lg "
        onSubmit={handleSubmit}
      >
        <div className="text-gray-500 border-b w-full">
          <h5 className="p-2">
            Edition des données de{" "}
            <span className="text-orange-600">{user.email}</span>
          </h5>
        </div>
        <div className="flex flex-col gap-y-1.5 justify-start w-full">
          <div className="flex flex-col gap-y-1.5 justify-start w-full">
            <label className="text-amber-600 border-b" htmlFor="username">
              Votre pseudo
            </label>
            <input
              className="p-2 border rounded-md bg-gray-700 text-gray-400 font-semibold focus:text-gray-200"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-y-1.5 justify-start w-full">
            <label className="text-amber-600 border-b" htmlFor="birthYear">
              Votre Année de naissance
            </label>
            <input
              className="p-2 border rounded-md bg-gray-700 text-gray-400 font-semibold focus:text-gray-200"
              name="birthYear"
              id="birthYear"
              value={form.birthYear}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-y-1.5 justify-start w-full">
            <label className="text-amber-600 border-b" htmlFor="email">
              Votre email
            </label>
            <input
              className="p-2 border rounded-md bg-gray-700 text-gray-400 font-semibold focus:text-gray-200"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="border w-full p-2 rounded-sm bg-blue-700 hover:bg-blue-900 text-gray-200 font-semibold cursor-pointer mt-4"
          type="submit"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default memo(UserDataFormManager);
