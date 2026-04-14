import { memo, useEffect } from "react";
import { useCounter } from "../contexts/CounterContext";

const Compteur = () => {
  const { state, dispatch } = useCounter();

  useEffect(() => {
    if (state.message === "") return;
    const timer = setTimeout(() => {
      dispatch({ type: "CLEAR_MESSAGE" });
    }, 500);
    return () => clearTimeout(timer);
  }, [state.message]);

  return (
    <div className="flex justify-center p-3 max-w-6xl  ">
      <div className="rounded-lg bg-gray-600 border p-2 w-2/3">
        <h3 className="text-center uppercase my-2 border-b ">
          Le comteur +{state.incr_step} et -{state.decr_step}
        </h3>
        {state.message && (
          <div className="text-center p-3 text-sm font-semibold bg-green-300 text-green-900 rounded-md shadow transition">
            <h5>{state.message}</h5>
          </div>
        )}
        <div className="my-2 grid grid-cols-3 justify-between gap-x-2 p-2 text-gray-900 font-semibold">
          <div className="gap-x-2 grid col-span-1 grid-cols-3 justify-between bg-red-200 rounded-md p-1">
            <div
              onClick={() => dispatch({ type: "DECREMENT" })}
              className="rounded-md p-2 border cursor-pointer hover:bg-orange-700 bg-orange-600 col-span-2"
            >
              Diminuer de
            </div>
            <select
              className="col-span-1 border rounded-md p-2 cursor-pointer"
              onChange={(e) =>
                dispatch({
                  type: "SET_DECR_STEP",
                  payload: Number(e.target.value),
                })
              }
              name="decr_step"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div
            onClick={() => dispatch({ type: "RESET" })}
            className="rounded-md p-2 border flex justify-center items-center bg-orange-300 hover:bg-orange-400 col-span-1 cursor-pointer"
          >
            <span className="text-gray-800">Réinitialiser</span>
            <span className="text-sm text-gray-800"> (Mettre à 0)</span>
          </div>
          <div className="col-span-1 grid gap-x-1 grid-cols-3 bg-blue-300 rounded-md p-1">
            <div
              onClick={() => dispatch({ type: "INCREMENT" })}
              className="rounded-md p-2 cursor-pointer hover:bg-blue-800 bg-blue-600 col-span-2"
            >
              <span>Augmenter de</span>
            </div>
            <select
              className="border rounded-md"
              onChange={(e) =>
                dispatch({
                  type: "SET_INCR_STEP",
                  payload: Number(e.target.value),
                })
              }
              name="incr_step"
              id=""
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>
        <div className="flex text-center flex-col justify-center items-center p-4">
          <span>La valeur est </span>
          <span className="text-9xl font-bold animate-pulse inline-block pt-0 pb-4 px-3 text-amber-400 rounded-xl bg-gray-500">
            {state.counter}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Compteur);
