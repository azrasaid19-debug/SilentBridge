import { Link } from "react-router";

export default function Community() {
  console.log("Community page loaded");

  return (
    <main>
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="bg-linear-to-b from-teal-100 to-white dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-24">
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* soft glow background effect */}
          <div className="absolute inset-0 -z-10 flex justify-center">
            <div className="w-125 h-125 bg-teal-400/20 dark:bg-teal-500/10 blur-[120px] rounded-full"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Building a More
            <span className="text-teal-600"> Inclusive Community</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300">
            SilentBridge is more than a tool for practicing signs. It is a
            reminder that communication should be accessible to everyone. Sign
            language creates connections, builds understanding, and helps people
            feel seen and included.
          </p>
        </div>
      </section>

      {/* ---------------- WHY COMMUNITY MATTERS ---------------- */}
      <section className="py-20 bg-teal-50 dark:bg-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-14 text-slate-800 dark:text-white">
            Why Community Matters
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* card 1 */}
            <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">
                Real People
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Sign language is a living language used by real communities
                around the world. Behind every sign are people, experiences, and
                stories that deserve to be understood.
              </p>
            </div>

            {/* card 2 */}
            <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">
                Inclusion
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                When hearing individuals learn even basic sign language, they
                create opportunities for more inclusive communication and mutual
                respect.
              </p>
            </div>

            {/* card 3 */}
            <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">
                Shared Understanding
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Communication is more than words. Sign language reminds us that
                understanding each other can take many forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STORIES SECTION ---------------- */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-14 text-slate-800 dark:text-white">
            Stories Behind Learning Sign Language
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* story 1 */}
            <div className="bg-teal-50 dark:bg-slate-900 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Many people first encounter sign language through a moment of
                curiosity; a class, a friend, or meeting someone from the deaf
                community. What begins as curiosity often grows into a deeper
                appreciation for communication beyond spoken words.
              </p>
              <span className="text-teal-600 font-medium">
                Every learner starts somewhere.
              </span>
            </div>

            {/* story 2 */}
            <div className="bg-teal-50 dark:bg-slate-900 border border-teal-100 dark:border-teal-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Even learning a few signs can create meaningful moments,
                greeting someone in their language, showing respect for their
                culture, or simply making communication more accessible.
              </p>
              <span className="text-teal-600 font-medium">
                Small efforts can build powerful connections.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="py-20 bg-teal-100 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-white mb-6">
            Start Your Sign Language Practice Journey
          </h2>

          <p className="text-slate-700 dark:text-slate-300 mb-10">
            SilentBridge was created to help learners remember the signs they
            learn and continue practicing over time. Join the platform and start
            building your personal sign language practice library.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              to="/register"
              className="bg-teal-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-teal-700 transition"
            >
              Create an Account
            </Link>

            <Link
              to="/learn"
              className="border border-teal-600 text-teal-600 px-8 py-3 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
            >
              Explore Learning
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- CLOSING MESSAGE ---------------- */}
      <section className="py-16 bg-teal-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
            Every Sign Builds a Bridge
          </h3>

          <p className="text-slate-600 dark:text-slate-300">
            SilentBridge exists to support learners who want to practice, stay
            curious, and help create a world where communication is accessible
            to everyone.
          </p>
        </div>
      </section>
    </main>
  );
}
