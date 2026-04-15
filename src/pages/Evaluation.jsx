import { memo, useReducer, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import photo from "../assets/img1.jpg";
import { all_questions } from "../data/questions";

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const best_response_value = 2;

const max_questions = 20 / best_response_value;
const TOTAL_TIME = 1 * 60;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const initialState = {
  message: "",
  current: 1,
  level: 1,
  classe: 1,
  chapiter: 1,
  wons: 0,
  faileds: 0,
  total: 0,
  duration: 0,
  evaluating: false,
  finished: false,
  question: null,
  selectedChoice: null,
  questionsPassed: [],
  best_choice: false,
  questions: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        wons: 0,
        faileds: 0,
        total: 0,
        duration: 0,
        evaluating: true,
        finished: false,
        best_choice: false,
        question: null,
        selectedChoice: null,
        questionsPassed: [],
        message: "C'est partir !",
      };
    case "INIT":
      return {
        ...state,
        wons: 0,
        faileds: 0,
        total: 0,
        duration: 0,
        evaluating: true,
        finished: false,
        best_choice: false,
        questionsPassed: [],
        message: null,
        question:
          state.questions[Math.floor(Math.random() * state.questions.length)],
        selectedChoice: null,
        questionsPassed: [],
      };
    case "SET_SELECTED_CHOICE":
      return {
        ...state,
        selectedChoice: action.payload,
      };
    case "CONTNUE":
      return {
        ...state,
        message: "Voici la question suivante!",
        selectedChoice: null,
        questionsPassed: [...state.questionsPassed, state.question],
        question: state.questions.filter(
          (question) => question.id !== state.question.id,
        )[Math.floor(Math.random() * state.questions.length)],
      };
    case "UP_TO_NEXT":
      return {
        ...state,
        selectedChoice: null,
        faileds: state.faileds + 1,
        questionsPassed: [...state.questionsPassed, state.question],
        message: "On passe à la question suivante!",
        question: state.questions.filter(
          (question) => question.id !== state.question.id,
        )[Math.floor(Math.random() * state.questions.length)],
      };
    case "TERMINATED":
      return {
        ...state,
        finished: true,
        question: null,
        message: "Vous avez terminé votre évaluation",
        selectedChoice: null,
      };
    case "BEST_CHOICE":
      return {
        ...state,
        finished: false,
        total: state.total + best_response_value,
        wons: state.wons + 1,
        message: "Le choix est correct!",
        best_choice: true,
      };
    case "BAD_CHOICE":
      return {
        ...state,
        finished: false,
        faileds: state.faileds + 1,
        message: "Le choix est incorrect!",
        best_choice: false,
      };
    case "TIME_DELAYED":
      return {
        ...state,
        finished: true,
        message: "Le temps est épuisé!",
      };
    case "EXIT":
      return {
        ...state,
        total: 0,
        evaluating: false,
        question: null,
        message: "Vous avez déclaré forfait, la partie est terminée",
        faileds: 0,
        wons: 0,
        question: null,
        selectedChoice: null,
        questionsPassed: [],
        best_choice: false,
      };

    case "RESET":
      return {
        ...state,
        total: 0,
        faileds: 0,
        wons: 0,
        evaluating: true,
        message: "Evaluation réinitialisée!",
        question: null,
        selectedChoice: null,
        questionsPassed: [],
        best_choice: false,
      };
    default:
      return state;
  }
};

const shuffle = (array) => {
  const data = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [data[i], data[j]] = [data[j], data[i]];
  }

  return data;
};

function initialisation() {
  return {
    questions: all_questions,
  };
}

const Evaluation = memo(() => {
  const timeLeft = useRef(TOTAL_TIME);

  const [state, dispatch] = useReducer(reducer, initialState, initialisation);

  const choiceSelected = (choiceID) => {
    if (state.selectedChoice !== null) {
      return;
    }
    dispatch({ type: "SET_SELECTED_CHOICE", payload: choiceID });

    const best_response = state.question.best_choice;

    if (best_response === choiceID) {
      dispatch({ type: "BEST_CHOICE", payload: Number(state.question.points) });
    }
    if (best_response !== choiceID) {
      dispatch({ type: "BAD_CHOICE", payload: Number(choiceID) });
    }
  };

  useEffect(() => {
    if (state.finished) return;

    const timer = setInterval(() => {
      timeLeft.current -= 1;
      if (timeLeft.current <= 0) {
        clearInterval(timer);
        dispatch({ type: "TIME_DELAYED" });

        return 0;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.finished]);

  return (
    <div className="pt-36 dark:bg-gray-900 mx-auto px-6 min-h-screen w-4/5">
      {!state.evaluating && (
        <section className="flex justify-center">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="w-full z-10"
          >
            {/* Photo mobile — visible uniquement sur petit écran */}
            <motion.div
              variants={fadeUp}
              className="flex md:hidden justify-center mb-8"
            >
              <div className="relative w-36 h-36">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-green-500/40 animate-spin [animation-duration:18s]" />
                <img
                  src={photo}
                  alt="Image "
                  className="w-full h-full object-cover object-top rounded-full border-4 border-white dark:border-gray-900 shadow-xl"
                />
              </div>
            </motion.div>

            <div className="max-w-2xl">
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Tester vos compétences en quelques minutes
              </motion.div>

              {/* Identité */}
              <motion.div variants={fadeUp} className="mb-10">
                <p className="text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Vous êtes sur la page d'
                  <span className="text-green-500">évaluation</span>
                </p>
                <p className="font-mono text-green-500 text-base mt-1">
                  ~ Essayez de voir combien de points vous pouvez réunir
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                className="flex gap-4 flex-wrap mb-16"
              >
                <div
                  onClick={() => dispatch({ type: "START" })}
                  className="px-6 py-3 rounded-full bg-green-600 text-gray-100 font-medium hover:shadow-sm transition-all duration-200 hover:bg-orange-600 hover:text-black hover:shadow-gray-800 cursor-pointer animate-pulse"
                >
                  Démarrer mon évaluation maintenant →
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="flex gap-10">
                {[
                  { n: "12k", l: "visiteurs déjà testés" },
                  { n: "6 ans", l: "D'expérience" },
                  { n: "2000+", l: "termes scientifiques" },
                  { n: "Toute promotion", l: "Toute classe du secondaire" },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <p className="font-serif text-xl font-bold text-gray-900 dark:text-white">
                      {n}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Photo desktop — visible uniquement md et plus */}
          <motion.div
            className="hidden md:block "
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div className="w-100 h-80 border border-green-400 rounded-full">
              <img
                src={photo}
                alt="ZtweN Oströgrasdki"
                className="w-full h-full rounded-full object-cover object-top border-2 border-green-500 shadow-md shadow-gray-600 opacity-50"
              />
            </div>
          </motion.div>
        </section>
      )}

      {state.finished && (
        <div className="w-full flex flex-col">
          <motion.h4
            className="text-center uppercase text-4xl text-green-800 font-bold bg-green-300 rounded-full p-2 my-2"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            Partie terminée
          </motion.h4>
          <div className="w-full rounded-lg bg-gray-900 flex flex-col justify-center text-xl text-center text-gray-400">
            <motion.h5
              className="text-green-500"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
            >
              Vous avez repondu à {state.wons} questions correctement
            </motion.h5>
            <motion.h5
              className="text-red-500"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.7, ease: "easeOut" }}
            >
              Vous avez manqué à {state.faileds} questions
            </motion.h5>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2, ease: "easeOut" }}
              className="flex justify-center gap-x-3 w-full mt-3"
            >
              <div className="flex justify-center gap-2 flex-col rounded-3xl p-5 w-1/2 bg-gray-800">
                <span className="border-b">Taux de réussite </span>
                <span className="text-5xl text-gray-500 font-bold">
                  {Number(state.wons / max_questions) * 100}%
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.8, ease: "easeOut" }}
                className="flex justify-center gap-2 flex-col rounded-3xl p-5 w-1/2 bg-gray-800"
              >
                <span className="border-b">Note obtenue </span>
                <span className="text-5xl text-gray-500 font-bold">
                  {state.total} / {max_questions * best_response_value}
                </span>
              </motion.div>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 justify-end gap-x-2 my-3 text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 3.2, ease: "easeOut" }}
              onClick={() => dispatch({ type: "EXIT" })}
              className="px-6 py-3 rounded-full bg-orange-400 hover:bg-orange-600 text-gray-100 font-medium hover:shadow-sm transition-all duration-200 hover:shadow-gray-800 cursor-pointer col-span-1"
            >
              Quitter
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 4, ease: "easeOut" }}
              onClick={() => dispatch({ type: "INIT" })}
              className="px-6 py-3 rounded-full bg-blue-400 hover:bg-blue-600 text-gray-100 font-medium hover:shadow-sm transition-all duration-200 hover:shadow-gray-800 cursor-pointer col-span-1"
            >
              Nouvelle partie
            </motion.div>
          </div>
        </div>
      )}

      {state.finished === false && (
        <div className="w-full">
          {state.question != null && state.evaluating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              {state.message && state.best_choice === true && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="flex shadow-sm rounded-lg py-1 bg-green-400 text-green-900 text-center w-full justify-center items-center gap-y-3 my-2 text-sm font-semibold"
                >
                  {state.message}
                </motion.div>
              )}

              {state.message && state.best_choice === false && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="flex shadow-sm rounded-lg py-1 bg-red-300 text-red-700 text-center w-full justify-center items-center gap-y-3 my-2 text-sm font-semibold"
                >
                  {state.message}
                </motion.div>
              )}

              <div className="my-2 text-gray-400">
                <div className="flex flex-col border p-1.5 my-2 rounded-md border-green-500 gap-2">
                  <h5 className="border-b text-gray-900 flex justify-between items-center gap-x-2 text-lg font-semibold p-1 bg-green-500 rounded-full">
                    <span className="w-2/3">
                      <span className="rounded-full bg-white size-3.5 inline-block animate-pulse mr-1.5"></span>
                      <span>
                        {state.question.subject} | {state.question.classe} | SA
                        {state.question.chapiter}
                      </span>
                    </span>
                    <div className="flex items-center bg-gray-800 rounded-full w-1/3 text-center px-2.5">
                      <span className="text-gray-400 font-semibold block text-sm w-1/2">
                        Note actuelle:
                      </span>
                      <span className="font-bold block w-full text-green-300 rounded-xl">
                        {state.total} / 20
                      </span>
                    </div>
                  </h5>

                  <div className="flex flex-col">
                    <h6 className="flex flex-col justify-center items-center text-base font-semibold bg-gray-900 w-full">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3,
                          ease: "easeOut",
                        }}
                        className="flex flex-col justify-center items-center font-semibold shadow-sm shadow-green-600 rounded-xl p-2 my-2 bg-gray-900 w-full"
                      >
                        <span className="text-xl border-b-2">
                          <span>Question</span>
                          <span className="mx-2">
                            N° {state.questionsPassed.length + 1}
                          </span>
                        </span>
                        <span className="text-amber-400 p-3 text-center">
                          {state.question.question}
                        </span>
                      </motion.div>
                      <div className="flex justify-between w-full  text-center my-1.5">
                        <h5 className="w-1/5">
                          Temps restants : <span>{timeLeft.current}</span>{" "}
                          secondes
                        </h5>
                        <div className="flex justify-end gap-x-2 w-4/5  text-center my-1.5">
                          {state.questionsPassed.length !== max_questions &&
                            state.selectedChoice === null && (
                              <div
                                onClick={() => dispatch({ type: "UP_TO_NEXT" })}
                                className="px-6 py-1 rounded-full bg-sky-600 border border-gray-700 text-gray-100 font-medium hover:border-gray-950 transition-all duration-200 hover:bg-blue-400 hover:shadow-gray-900 hover:text-gray-900 cursor-pointer w-1/3"
                              >
                                Passer
                              </div>
                            )}
                          {state.questionsPassed.length < max_questions - 1 &&
                            state.selectedChoice !== null && (
                              <div
                                onClick={() => dispatch({ type: "CONTNUE" })}
                                className="px-6 py-1 rounded-full bg-transparent border border-gray-700 text-gray-100 font-medium hover:border-gray-950 transition-all duration-200 hover:bg-blue-400 hover:shadow-gray-900 hover:text-gray-900 cursor-pointer w-1/3"
                              >
                                Suivant
                              </div>
                            )}
                          {state.selectedChoice !== null &&
                            state.questionsPassed.length ===
                              max_questions - 1 && (
                              <div
                                onClick={() => dispatch({ type: "TERMINATED" })}
                                className="px-6 py-1 rounded-full bg-transparent border border-gray-700 text-gray-100 font-medium hover:border-gray-950 transition-all duration-200 hover:bg-blue-400 hover:shadow-gray-900 hover:text-gray-900 cursor-pointer w-1/3"
                              >
                                Terminé
                              </div>
                            )}
                        </div>
                      </div>
                    </h6>
                    <div className="flex flex-col font-mono font-semibold gap-2 min-h-50 text-base">
                      {shuffle(state.question.choises).map((choice, index) => (
                        <motion.div
                          key={choice.id}
                          onClick={() => choiceSelected(choice.id)}
                          className={`flex items-center gap-x-2 border cursor-pointer rounded-lg p-2 ${state.selectedChoice === null ? "hover:bg-gray-800 hover:text-sky-500" : ""} ${choice.id === state.selectedChoice && choice.id === state.question.best_choice ? "text-green-700" : choice.id === state.selectedChoice && choice.id !== state.question.best_choice ? "text-red-600" : state.selectedChoice !== null && choice.id === state.question.best_choice && choice.id !== state.selectedChoice ? "hidden" : state.selectedChoice !== null && choice.id !== state.selectedChoice ? "hidden" : ""}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: Number(0, 6 + index * 0.6),
                            ease: "easeOut",
                          }}
                        >
                          <span className="rounded-md px-3 py-2 border ">
                            Rép. {index + 1}
                          </span>
                          <span>{choice.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-end gap-x-2 text-center w-full">
                <div
                  onClick={() => dispatch({ type: "EXIT" })}
                  className="px-6 py-3 rounded-full bg-orange-400 hover:bg-orange-600 text-gray-100 font-medium hover:shadow-sm transition-all duration-200 hover:bg-orange-700 hover:shadow-gray-800 cursor-pointer col-span-1"
                >
                  Quitter
                </div>
                <div
                  onClick={() => dispatch({ type: "RESET" })}
                  className="px-6 py-3 rounded-full bg-gray-400 hover:bg-gray-600 text-gray-100 font-medium hover:shadow-sm transition-all duration-200 hover:bg-gray-700 hover:shadow-gray-800 cursor-pointer col-span-1"
                >
                  Reprendre
                </div>
                <div
                  onClick={() => dispatch({ type: "TERMINATED" })}
                  className="px-6 py-3 rounded-full bg-red-400 hover:bg-red-600 text-gray-100 font-medium hover:shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-gray-800 cursor-pointer col-span-1"
                >
                  Abandonner
                </div>
              </div>
            </motion.div>
          )}
          {state.question == null && state.evaluating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col w-3/5 mx-auto mt-32"
            >
              <h2 className="text-center text-4xl text-green-600 uppercase py-3 border-b border-green-600">
                Vous êtes prêt
              </h2>
              <div className="flex justify-center gap-x-2 text-center w-full items-center mt-5">
                <div
                  onClick={() => dispatch({ type: "EXIT" })}
                  className="px-6 py-3 rounded-full bg-orange-400  text-gray-100 font-medium hover:shadow-sm transition-all duration-200 hover:bg-orange-700 hover:shadow-gray-800 cursor-pointer w-1/2"
                >
                  Revenir en arrière
                </div>
                <div
                  onClick={() => dispatch({ type: "INIT" })}
                  className="px-6 py-3 rounded-full bg-blue-400 text-gray-100 font-medium hover:shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-gray-800 cursor-pointer w-1/2"
                >
                  Commencer
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
});

export default Evaluation;
