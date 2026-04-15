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
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Evaluation from "./pages/Evaluation";

function App() {
  const [user, setUser] = useState({
    username: "Vincent",
    email: "ztwen@gmail.com",
    birthYear: 2000,
    avatar:
      "https://ui-avatars.com/api/?name=Vincent+Houndekindo&background=random",
  });
  return (
    <ThemeProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <CounterProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compteur" element={<Compteur />} />
              <Route path="/les-utilisateurs" element={<Users />} />
              <Route path="/carte-membre" element={<Carte />} />
              <Route path="/evaluation" element={<Evaluation />} />
              <Route
                path="/editer-mon-profil"
                element={<UserDataFormManager />}
              />
            </Routes>
          </div>
        </CounterProvider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default memo(App);
