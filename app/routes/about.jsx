export default function About() {
  console.log("About page loaded");

  return (
    <main>
      {/* ---------------- HERO SECTION ---------------- */}

      {/* Intro section explaining what SilentBridge is */}
      <section
        aria-labelledby="about-heading"
        className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-24"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            id="about-heading"
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6"
          >
            About{" "}
            <span className="text-teal-600 dark:text-teal-400">
              SilentBridge
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300">
            SilentBridge is a learning companion designed to help people
            practice and retain sign language they have already learned. It
            helps learners stay consistent, organized, and confident when
            communicating with the deaf community.
          </p>
        </div>
      </section>

      {/* ---------------- CHALLENGES SECTION ---------------- */}

      {/* Highlights common struggles learners face */}
      <section
        aria-labelledby="challenge-heading"
        className="py-20 bg-teal-50 dark:bg-teal-950/30"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            id="challenge-heading"
            className="text-3xl font-semibold text-center text-slate-800 dark:text-white mb-14"
          >
            The Challenge Learners Face
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Challenge 1 */}
            <div className="bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">📚</div>

              <h3 className="text-xl font-semibold mb-3">
                Learning Happens Everywhere
              </h3>

              <p className="text-slate-600 dark:text-slate-300">
                Many people learn sign language through classes, workshops, or
                online videos but struggle to organize what they have learned
                afterward.
              </p>
            </div>

            {/* Challenge 2 */}
            <div className="bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">⏳</div>

              <h3 className="text-xl font-semibold mb-3">
                Practice Is Often Inconsistent
              </h3>

              <p className="text-slate-600 dark:text-slate-300">
                Without a structured way to review signs, learners gradually
                forget what they previously studied.
              </p>
            </div>

            {/* Challenge 3 */}
            <div className="bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">💬</div>

              <h3 className="text-xl font-semibold mb-3">
                Confidence Can Decrease
              </h3>

              <p className="text-slate-600 dark:text-slate-300">
                When signs are forgotten, people often lose confidence in using
                sign language in real conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SOLUTION SECTION ---------------- */}

      {/* Shows how the app helps solve those problems */}
      <section
        aria-labelledby="solution-heading"
        className="py-20 bg-white dark:bg-teal-950/20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            id="solution-heading"
            className="text-3xl font-semibold text-center text-slate-800 dark:text-white mb-14"
          >
            How SilentBridge Helps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <div className="bg-teal-50 dark:bg-slate-800/80 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">✍️</div>

              <h3 className="text-xl font-semibold mb-3">Save Signs</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Store signs with descriptions, notes, and reference videos so
                you can revisit them anytime.
              </p>
            </div>

            {/* Solution 2 */}
            <div className="bg-teal-50 dark:bg-slate-800/80 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">📊</div>

              <h3 className="text-xl font-semibold mb-3">Track Confidence</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Monitor how confident you feel with each sign so you know which
                ones need more practice.
              </p>
            </div>

            {/* Solution 3 */}
            <div className="bg-teal-50 dark:bg-slate-800/80 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">🔁</div>

              <h3 className="text-xl font-semibold mb-3">Practice Anytime</h3>

              <p className="text-slate-600 dark:text-slate-300">
                Review your saved signs whenever you want to refresh your memory
                and stay consistent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}

      {/* Final section encouraging users to take action */}
      <section
        aria-labelledby="mission-heading"
        className="py-20 bg-teal-100 dark:bg-teal-950/40"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            id="mission-heading"
            className="text-3xl font-semibold text-slate-800 dark:text-white mb-6"
          >
            Our Mission
          </h2>

          <p className="text-slate-700 dark:text-slate-300 mb-10">
            SilentBridge encourages consistent sign language practice and
            promotes accessibility awareness. Every sign learned helps bridge
            the communication gap between the hearing and deaf communities.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="/register"
              aria-label="Create an account to start using SilentBridge"
              className="bg-teal-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-teal-700 transition"
            >
              Create an Account
            </a>

            <a
              href="/learn"
              aria-label="Explore sign language learning resources"
              className="border border-teal-600 text-teal-600 px-8 py-3 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
            >
              Explore Learning
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
