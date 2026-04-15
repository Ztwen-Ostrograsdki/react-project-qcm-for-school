import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import photo from "../assets/photo.jpg";

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Home = memo(() => {
  return (
    <div className="pt-16 bg-white dark:bg-gray-900 min-h-screen">
      {/* ===== HERO ===== */}
      <section className="max-w-5xl mx-auto px-6 min-h-[90vh] flex items-center relative overflow-hidden">
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
                alt="ZtweN Oströgrasdki"
                className="w-full h-full object-cover object-top rounded-full border-4 border-white dark:border-gray-900 shadow-xl"
              />
            </div>
          </motion.div>

          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Disponible pour missions & collaborations
            </motion.div>

            {/* Identité */}
            <motion.div variants={fadeUp} className="mb-10">
              <p className="text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                HOUNDEKINDO K. Vincent
              </p>
              <p className="font-mono text-green-500 text-base mt-1">
                ~ ZtweN Oströgrasdki Schröhamilzwei@
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mt-4 max-w-md">
                Développeur fullstack et artisan{" "}
                <span className="text-amber-500">Laravel</span> passionné,
                spécialisé en <span className="text-sky-400">React</span>,{" "}
                <span className="text-orange-500">Livewire</span>,{" "}
                <span className="text-green-600">VueJs</span>, et ecosystème
                <span className="text-yellow-200">JavaScript</span>. J'aime
                créer des produits soignés, accessibles et performants.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              className="flex gap-4 flex-wrap mb-16"
            >
              <Link
                to="/projects"
                className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/25"
              >
                Voir mes projets →
              </Link>
              <Link
                to="/evaluation"
                className="px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-500 font-medium transition-all duration-200"
              >
                Faire une évaluation
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-10">
              {[
                { n: "12+", l: "Projets livrés" },
                { n: "6 ans", l: "D'expérience" },
                { n: "8+", l: "Technologies" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
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
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-green-500/40 animate-spin [animation-duration:18s]" />
            <img
              src={photo}
              alt="ZtweN Oströgrasdki"
              className="w-full h-full object-cover object-top rounded-full border-4 border-white dark:border-gray-900 shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== MOTIVATION ===== */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="border-l-4 border-green-500 bg-gray-50 dark:bg-gray-800/50 rounded-r-2xl p-8">
          <h2 className="font-serif text-2xl flex items-center font-bold text-gray-900 dark:text-white mb-4 gap-x-2">
            <div className="flex justify-center items-center">
              <div className=" w-20 h-20">
                <div className="border-green-500/40" />
                <img
                  src={photo}
                  alt="ZtweN Oströgrasdki"
                  className="w-full h-full object-cover object-top rounded-full border-4 border-gray-800 dark:border-green-500 shadow-xl"
                />
              </div>
            </div>
            <span className="">
              Ce qui me <span className="text-green-500">motive</span>
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-6">
            Je suis animé par l'envie de construire des choses utiles. Chaque
            projet est une occasion d'apprendre, de collaborer et de pousser les
            limites de ce qu'on peut créer avec du code. Je crois que la qualité
            technique et l'attention au design se renforcent mutuellement.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Curiosité",
              "Créativité",
              "Objectivité",
              "Innovation",
              "Collaboration",
              "Impact",
              "Rigueur",
            ].map((v) => (
              <span
                key={v}
                className="px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export default Home;
