// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

export default api;
// Dans tes composants
import api from "../api/axios";

const res = await api.get("/users"); // → appelle .../users
// const res = await api.post("/posts", {}); // → appelle .../posts

import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "RESET":
      return { ...state, count: 0 };
    case "SET_STEP":
      return { ...state, step: action.payload };
    default:
      return state;
  }
};

const Compteur = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Compteur : {state.count}</p>
      <p>Pas : {state.step}</p>

      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>

      <input
        type="number"
        value={state.step}
        onChange={(e) =>
          dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
        }
      />
    </div>
  );
};
