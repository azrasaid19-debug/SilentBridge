import { useState } from "react";

export default function AddSign() {
  const [signName, setSignName] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [notes, setNotes] = useState("");
  const [confidence, setConfidence] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const finalCategory = category === "other" ? customCategory : category;

    if (!signName.trim()) {
      setError("Please enter the sign name.");
      return;
    }

    if (!finalCategory.trim()) {
      setError("Please select or enter a category.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description for the sign.");
      return;
    }

    if (!confidence) {
      setError("Please select your confidence level.");
      return;
    }

    console.log("Sign submitted:", {
      signName,
      category: finalCategory,
      description,
      resourceLink,
      notes,
      confidence,
    });

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);

    setSignName("");
    setCategory("");
    setCustomCategory("");
    setDescription("");
    setResourceLink("");
    setNotes("");
    setConfidence("");
  };

  return (
    <main>
      {/* HERO */}
      <section className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Add New Sign
          </h1>

          <p className="text-slate-600 dark:text-slate-300">
            Save a sign you learned so you can review and practice it later.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 bg-teal-50 dark:bg-teal-950/30">
        <div className="max-w-2xl mx-auto px-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 rounded-2xl shadow-xl p-10 space-y-6"
          >
            {/* SIGN NAME */}
            <div>
              <label htmlFor="signName" className="block font-medium mb-2">
                Sign Name <span className="text-red-500">*</span>
              </label>

              <input
                id="signName"
                type="text"
                required
                aria-required="true"
                placeholder="Example: Thank You"
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className="block font-medium mb-2">
                Category <span className="text-red-500">*</span>
              </label>

              <select
                id="category"
                required
                aria-required="true"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 appearance-none"
              >
                <option value="">Select category</option>
                <option value="greetings">Greetings</option>
                <option value="daily communication">Daily Communication</option>
                <option value="family">Family</option>
                <option value="health">Health</option>
                <option value="religion">Religion</option>
                <option value="verbs">Verbs / Actions</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="education">Education</option>
                <option value="emotions">Emotions</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* CUSTOM CATEGORY */}
            {category === "other" && (
              <div>
                <label
                  htmlFor="customCategory"
                  className="block font-medium mb-2"
                >
                  Custom Category <span className="text-red-500">*</span>
                </label>

                <input
                  id="customCategory"
                  type="text"
                  required
                  aria-required="true"
                  placeholder="Enter your category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700"
                />
              </div>
            )}

            {/* DESCRIPTION */}
            <div>
              <label htmlFor="description" className="block font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                required
                aria-required="true"
                placeholder="Describe how the sign is performed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* RESOURCE */}
            <div>
              <label htmlFor="resourceLink" className="block font-medium mb-2">
                YouTube / Resource Link
              </label>

              <input
                id="resourceLink"
                type="text"
                placeholder="Paste learning video link"
                value={resourceLink}
                onChange={(e) => setResourceLink(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* NOTES */}
            <div>
              <label htmlFor="notes" className="block font-medium mb-2">
                Personal Notes
              </label>

              <textarea
                id="notes"
                placeholder="Notes to help remember this sign"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* CONFIDENCE */}
            <div>
              <label htmlFor="confidence" className="block font-medium mb-2">
                Confidence Level <span className="text-red-500">*</span>
              </label>

              <select
                id="confidence"
                required
                aria-required="true"
                value={confidence}
                onChange={(e) => setConfidence(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 appearance-none"
              >
                <option value="">Select confidence</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {error && (
              <p role="alert" className="text-red-500 text-sm font-medium">
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition"
            >
              Save Sign
            </button>
          </form>
        </div>
      </section>

      {success && (
        <div
          role="status"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          ✓ Sign saved successfully
        </div>
      )}
    </main>
  );
}
