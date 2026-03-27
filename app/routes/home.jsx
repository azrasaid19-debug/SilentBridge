export default function Home() {
  return (
    <main>
      {/* ---------------- HERO SECTION ---------------- */}

      {/* Main landing section introducing the app */}
      <section
        aria-labelledby="home-heading"
        className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-20"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Main heading */}
          <h1
            id="home-heading"
            className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
          >
            Practice Sign Language
            <span className="text-teal-600 dark:text-teal-400">
              {" "}
              Without Forgetting
            </span>
          </h1>

          {/* Short description of what the app does */}
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
            SilentBridge helps learners store the signs they learn, review them
            regularly, and build confidence communicating with the deaf
            community.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex justify-center gap-6">
            {/* Primary action */}
            <a
              href="/register"
              aria-label="Create an account and start practicing sign language"
              className="bg-teal-600 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-teal-700 transition duration-300"
            >
              Start Practicing
            </a>

            {/* Secondary action */}
            <a
              href="/learn"
              aria-label="Explore sign language learning resources"
              className="border border-teal-600 text-teal-600 px-8 py-3 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900/40 transition duration-300"
            >
              Explore Learning
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}

      {/* Highlights what users can do in the app */}
      <section
        aria-labelledby="features-heading"
        className="py-20 bg-teal-50 dark:bg-teal-950/30"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            id="features-heading"
            className="text-3xl font-semibold text-center text-slate-800 dark:text-white mb-14"
          >
            How SilentBridge Helps You Learn
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="text-teal-600 text-3xl mb-4">✋</div>

              <h3 className="text-xl font-semibold mb-3">Save Signs</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Store the signs you learn along with descriptions, notes, and
                learning resources.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="text-teal-600 text-3xl mb-4">📊</div>

              <h3 className="text-xl font-semibold mb-3">Track Confidence</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Monitor how confident you feel with each sign so you know what
                to practice more.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="text-teal-600 text-3xl mb-4">🔁</div>

              <h3 className="text-xl font-semibold mb-3">Practice Anytime</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Review the signs you have saved whenever you want to refresh
                your memory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PURPOSE SECTION ---------------- */}

      {/* Explains the goal/mission behind the app */}
      <section
        aria-labelledby="purpose-heading"
        className="py-20 bg-teal-100/40 dark:bg-teal-900/20"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            id="purpose-heading"
            className="text-3xl font-semibold text-slate-800 dark:text-white mb-6"
          >
            Bridging Communication
          </h2>

          <p className="text-slate-700 dark:text-slate-300">
            SilentBridge was created to support sign language learners and
            encourage accessibility. By helping people practice consistently, we
            move one step closer to bridging the communication gap between the
            hearing community and the deaf community.
          </p>
        </div>
      </section>
    </main>
  );
}


// Add delete button for each sign
// Open a resource link option to only appear when one is 