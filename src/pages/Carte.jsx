import { memo, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const Carte = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="flex justify-center flex-col gap-y-2 items-center p-3 max-w-6xl">
      <div className="rounded-lg bg-gray-800 border p-2 w-1/3">
        <h3 className="text-center uppercase my-2 border-b">carte de membre</h3>
        <div className="flex flex-col text-orange-500">
          <h4 className="flex gap-x-2">
            <span className="text-gray-300">Nom :</span>
            <span>{user.username}</span>
          </h4>
          <h6 className="text-orange-500">
            <span className="text-gray-300">Email : </span>
            <span>{user.email}</span>
          </h6>
        </div>
        <div className="">
          <span className="text-gray-300">Age : </span>
          <span className="text-orange-500"> {2026 - user.birthYear} </span> ans
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <Link
          to="/editer-mon-profil"
          className="block py-2 px-3 border border-gray-800 text-gray-200 bg-green-700 hover:bg-green-900 rounded w-1/3 text-center"
        >
          Editer mon profil
        </Link>
      </div>
    </div>
  );
};

export default memo(Carte);
