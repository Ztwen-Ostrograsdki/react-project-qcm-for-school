import { useContext, createContext, useReducer } from "react";

const initialState = {
  message: "",
  decr_step: 1,
  incr_step: 1,
  counter: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + state.incr_step,
        message: "Le compteur a augmenté",
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - state.decr_step,
        message: "Le compteur a diminué",
      };
    case "SET_DECR_STEP":
      return {
        ...state,
        decr_step: action.payload,
        message: "La décrémentation est passée à " + action.payload,
      };
    case "CLEAR_MESSAGE":
      return { ...state, message: "" };
    case "SET_INCR_STEP":
      return {
        ...state,
        incr_step: action.payload,
        message: "L'incrémentation est passée à " + action.payload,
      };
    case "RESET":
      return { ...state, counter: 0, message: "Compteur réinitialisé!" };
    default:
      return state;
  }
};

export const CounterContext = createContext(null);

export const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
