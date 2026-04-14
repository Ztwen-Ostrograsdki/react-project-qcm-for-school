import { memo, useState } from "react";
import "./App.css";
import Users from "./pages/Users";
import { Routes, Route } from "react-router-dom";
import Compteur from "./pages/Compteur";
import Carte from "./pages/Carte";
import NavBar from "./components/NavBar";
import { UserContext } from "./contexts/UserContext";
import UserDataFormManager from "./forms/UserDataFormManager";
import { CounterProvider } from "./contexts/CounterContext";

function App() {
  const [user, setUser] = useState({
    username: "Vincent",
    email: "ztwen@gmail.com",
    birthYear: 2000,
    avatar:
      "https://ui-avatars.com/api/?name=Vincent+Houndekindo&background=random",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CounterProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Compteur />} />
          <Route path="/compteur" element={<Compteur />} />
          <Route path="/les-utilisateurs" element={<Users />} />
          <Route path="/carte-membre" element={<Carte />} />
          <Route path="/editer-mon-profil" element={<UserDataFormManager />} />
        </Routes>
      </CounterProvider>
    </UserContext.Provider>
  );
}

export default memo(App);
