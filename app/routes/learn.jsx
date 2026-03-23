import { Link } from "react-router";

export default function Learn() {
  console.log("Learn page loaded");

  const resources = [
    {
      category: "Alphabet",
      description: "Learn the Kenyan Sign Language alphabet.",
      videoId: "WNigt-vfTX0",
    },
    {
      category: "Greetings",
      description: "Common greetings used in everyday conversation.",
      videoId: "dLx-fHpLXyY",
    },
    {
      category: "Courtesy Words",
      description:
        "Important polite expressions like please, thank you and sorry.",
      videoId: "ore-1PHe2Bg",
    },
    {
      category: "Family Members",
      description:
        "Learn how to sign family relationships such as mother, father and siblings.",
      videoId: "3AbBytts82o",
    },
    {
      category: "Days of the Week",
      description: "Signs for the days of the week in Kenyan Sign Language.",
      videoId: "svAGM1k0wNc",
    },
    {
      category: "Animals",
      description: "Learn how to sign common animals in Kenyan Sign Language.",
      videoId: "OKAbdj0JXko",
    },
  ];

  return (
    <main>
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Learn
            <span className="text-teal-600 dark:text-teal-400">
              {" "}
              Kenyan Sign Language
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300">
            Start learning Kenyan Sign Language through curated videos. After
            learning a sign, store it in SilentBridge and practice it regularly
            so you never forget.
          </p>
        </div>
      </section>

      {/* ---------------- VIDEO GRID ---------------- */}
      <section className="py-20 bg-teal-50 dark:bg-teal-950/30">
        <div className="max-w-6xl mx-auto px-6">
          {/* responsive grid layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-teal-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {/* video embed */}
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${resource.videoId}`}
                    title={resource.category}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>

                {/* text content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    {resource.category}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {resource.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="py-20 bg-teal-100 dark:bg-teal-950/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-white mb-6">
            Start Practicing What You Learn
          </h2>

          <p className="text-slate-700 dark:text-slate-300 mb-10">
            Once you learn a sign, add it to SilentBridge so you can review it
            later, track your confidence, and practice consistently.
          </p>

          <div className="flex justify-center">
            <Link
              to="/register"
              className="bg-teal-600 text-white px-10 py-3 rounded-xl shadow-md hover:bg-teal-700 transition"
            >
              Start Practicing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
