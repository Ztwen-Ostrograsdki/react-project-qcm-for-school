import { memo, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const UserDataUpdater = () => {
  const { user, setUser } = useContext(UserContext);

  const [donnees, setDonnees] = useState({
    pseudo: user.username,
  });

  const [message, setMessage] = useState("Une donnée a été modifiée");

  const updateValue = (e) => {
    setDonnees({ ...donnees, [e.target.name]: e.target.value });
  };

  const flasher = (m) => {
    setMessage(m);
  };

  const clear = (inputName = null) => {
    return inputName
      ? setDonnees({ ...donnees, [inputName]: null })
      : setDonnees({});
  };

  return (
    <form>
      <input
        type="text"
        name="pseudo"
        value={donnees.pseudo}
        onChange={updateValue}
      />
    </form>
  );
};

export default memo(UserDataUpdater);
