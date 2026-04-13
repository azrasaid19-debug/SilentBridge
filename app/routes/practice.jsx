import { useState, useEffect } from "react";
import { getSigns } from "../models/signs";

export async function loader() {
  // Load saved signs from MongoDB.
  // Practice then filters locally by confidence level.
  return await getSigns();
}

export default function Practice({ loaderData }) {
  // `loaderData` is the MongoDB result from our `loader()` above.
  const signs = loaderData || [];

  /* ---------------- STATE ---------------- */

  const [filter, setFilter] = useState("All");

  const filteredSigns =
    filter === "All"
      ? signs
      : signs.filter((sign) => sign.confidence === filter);

  if (filteredSigns.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No signs available</h2>
        <p>Add a sign to start practicing.</p>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // fallback to avoid undefined crash
  const currentSign = filteredSigns[currentIndex] || filteredSigns[0];

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  /* ---------------- ACTIONS ---------------- */

  const handleStart = () => {
    setIsRunning(true);
    setSessionEnded(false);
  };

  const handlePractice = () => {
    setPracticeCount((prev) => prev + 1);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);

    // 👉 ensure next sign is different
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * filteredSigns.length);
    } while (randomIndex === currentIndex && filteredSigns.length > 1);

    setCurrentIndex(randomIndex);
    setShowHint(false);
  };

  const handleNext = () => {
    if (filteredSigns.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredSigns.length);

    setCurrentIndex(randomIndex);
    setShowHint(false);
  };

  const handleEndSession = () => {
    setIsRunning(false);
    setSessionEnded(true);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentIndex(0);
    setShowHint(false);
  };

  /* ---------------- TIMER FORMAT ---------------- */

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;

  /* ---------------- SESSION SUMMARY ---------------- */

  if (sessionEnded) {
    return (
      <section className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-6">
            Practice Session Complete 🎉
          </h1>

          <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-10 rounded-2xl shadow-xl">
            <p className="text-lg mb-4">
              <strong>Signs Practiced:</strong> {practiceCount}
            </p>

            <p className="text-lg mb-6">
              <strong>Time Practiced:</strong> {formattedTime}
            </p>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Great job! Consistent practice strengthens memory.
            </p>

            <button
              onClick={() => {
                setSeconds(0);
                setPracticeCount(0);
                setSessionEnded(false);
              }}
              className="bg-teal-600 text-white px-8 py-3 rounded-xl hover:bg-teal-700 transition"
            >
              Start New Session
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* HERO SECTION */}

      <section className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Practice Your Signs
          </h1>

          <p className="text-slate-600 dark:text-slate-300">
            Try recalling the sign before revealing the hint.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS */}

      <section className="py-6 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-3 justify-center">
          {["All", "Low", "Medium", "High"].map((level) => (
            <button
              key={level}
              onClick={() => handleFilterChange(level)}
              aria-pressed={filter === level}
              className={`px-5 py-2 rounded-xl border transition
              ${
                filter === level
                  ? "bg-teal-600 text-white border-teal-600"
                  : "border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      {/* PRACTICE AREA */}

      <section className="py-12 bg-teal-50 dark:bg-teal-950/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* TIMER CARD */}

            <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 rounded-2xl shadow-md p-8 text-center">
              <h3 className="text-sm uppercase text-slate-500 mb-3">
                Practice Timer
              </h3>

              {/* aria-live so screen readers get updates */}
              <div
                className="text-4xl font-bold text-teal-600 mb-6"
                aria-live="polite"
              >
                {formattedTime}
              </div>

              {!isRunning && (
                <button
                  onClick={handleStart}
                  className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition"
                >
                  Start Practice
                </button>
              )}

              {isRunning && (
                <button
                  onClick={handleEndSession}
                  className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
                >
                  End Session
                </button>
              )}

              <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
                Signs practiced
              </p>

              <p className="text-2xl font-semibold text-teal-600">
                {practiceCount}
              </p>
            </div>

            {/* SIGN CARD */}

            <div className="md:col-span-2 bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 rounded-2xl shadow-xl p-10 text-center">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
                {currentSign?.name}
              </h2>

              {!showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  aria-label="Show hint for this sign"
                  className="mb-6 border border-teal-600 text-teal-600 px-6 py-2 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900/40 transition"
                >
                  View Hint
                </button>
              )}

              {showHint && (
                <div className="mb-6 text-slate-600 dark:text-slate-300">
                  <strong>Hint:</strong> {currentSign?.description}
                </div>
              )}

              {showSuccess && (
                <p className="text-teal-600 font-medium mb-4">
                  ✓ Sign practiced!
                </p>
              )}

              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePractice}
                  className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition"
                >
                  Mark Practiced
                </button>

                <button
                  onClick={handleNext}
                  className="border border-teal-400 text-teal-600 px-6 py-3 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-700 transition"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
