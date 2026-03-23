import { Link } from "react-router";

export default function Dashboard() {
  console.log("Dashboard loaded");

  return (
    <main>
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Welcome Back
            <span className="text-teal-600 dark:text-teal-400"> 👋</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            This is your personal learning space. Here you can save new signs,
            review the ones you already know, and practice regularly so you
            continue building confidence communicating in sign language.
          </p>
        </div>
      </section>

      {/* ---------------- QUICK ACTIONS ---------------- */}
      <section className="py-20 bg-teal-50 dark:bg-teal-950/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-slate-800 dark:text-white mb-14">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* add sign card */}
            <Link
              to="/add-sign"
              className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="text-3xl text-teal-600 mb-4">✍️</div>

              <h3 className="text-xl font-semibold mb-3">Add a New Sign</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Save a sign you recently learned with descriptions, notes,
                videos, and your confidence level.
              </p>
            </Link>

            {/* my signs card */}
            <Link
              to="/my-signs"
              className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="text-3xl text-teal-600 mb-4">📚</div>

              <h3 className="text-xl font-semibold mb-3">My Signs</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Review the signs you have saved and refresh your memory whenever
                you want.
              </p>
            </Link>

            {/* practice card */}
            <Link
              to="/practice"
              className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="text-3xl text-teal-600 mb-4">🔁</div>

              <h3 className="text-xl font-semibold mb-3">Practice Signs</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Practice the signs you have learned and strengthen your
                confidence through repetition.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- LEARNING PROGRESS ---------------- */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-white mb-6">
            Your Learning Journey
          </h2>

          <p className="text-slate-600 dark:text-slate-300">
            Every sign you add and every practice session helps reinforce your
            memory. Over time, SilentBridge becomes your personal library of
            sign language knowledge.
          </p>

          <p className="text-slate-600 dark:text-slate-300 mt-4">
            Continue adding new signs and revisiting the ones you have learned
            to build stronger communication skills.
          </p>
        </div>
      </section>

      {/* ---------------- MOTIVATION SECTION ---------------- */}
      <section className="py-16 bg-teal-100/40 dark:bg-teal-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
            Consistency Builds Confidence
          </h3>

          <p className="text-slate-700 dark:text-slate-300">
            Sign language becomes easier with practice. Even reviewing a few
            signs every day helps strengthen memory and communication ability.
          </p>
        </div>
      </section>
    </main>
  );
}
