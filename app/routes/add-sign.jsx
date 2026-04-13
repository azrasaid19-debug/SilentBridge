import { Form, redirect, useNavigation } from "react-router";
import { useState, useEffect } from "react";
import { createSign } from "../models/signs";
import { requireUser } from "../.server/session";

export async function action({ request }) {
  // React Router will send the form data here on POST.
  const formData = await request.formData();
  const userId = await requireUser(request);

  const signName = formData.get("signName");
  const category = formData.get("category");
  const customCategory = formData.get("customCategory");
  const description = formData.get("description");
  const resourceLink = formData.get("resourceLink");
  const notes = formData.get("notes");
  const confidence = formData.get("confidence");
  const image = formData.get("image");

  // Basic server-side validation (so users can't bypass client validation).
  if (!signName || !description || !confidence) {
    return null;
  }

  const finalCategory = category === "other" ? customCategory : category;

  if (!finalCategory || !finalCategory.toString().trim()) {
    return null;
  }

  await createSign(
    {
      // Model normalization maps these into DB fields.
      signName,
      category: finalCategory,
      description,
      resourceLink,
      notes,
      confidence,
      image,
    },
    userId,
  );

  // After saving, go to the list page (loader() will re-fetch from MongoDB).
  return redirect("/my-signs");
}

export default function AddSign() {
  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  const [signName, setSignName] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [notes, setNotes] = useState("");
  const [confidence, setConfidence] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");

  const navigation = useNavigation();

  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "ddhqhzyki",
        uploadPreset: "silentbridge_upload",
        sources: ["local", "url", "camera"],
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      },
    );
  };

  const handleClientSideValidation = (e) => {
    const finalCategory = category === "other" ? customCategory : category;

    if (!signName.trim()) {
      e.preventDefault();
      setError("Please enter the sign name.");
      return;
    }

    if (!finalCategory.trim()) {
      e.preventDefault();
      setError("Please select or enter a category.");
      return;
    }

    if (!description.trim()) {
      e.preventDefault();
      setError("Please enter a description for the sign.");
      return;
    }

    if (!confidence) {
      e.preventDefault();
      setError("Please select your confidence level.");
      return;
    }

    // If we reach here, validation passed: let the form submit normally.
    setError("");
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
          <Form
            method="post"
            onSubmit={handleClientSideValidation}
            className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 rounded-2xl shadow-xl p-10 space-y-6"
          >
            {/* SIGN NAME */}
            <div>
              <label htmlFor="signName" className="block font-medium mb-2">
                Sign Name <span className="text-red-500">*</span>
              </label>

              <input
                id="signName"
                name="signName"
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
                name="category"
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
                  name="customCategory"
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
                name="description"
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
                name="resourceLink"
                type="text"
                placeholder="Paste learning video link"
                value={resourceLink}
                onChange={(e) => setResourceLink(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block font-medium mb-2">
                Upload Image (optional)
              </label>

              <button
                type="button"
                onClick={openUploadWidget}
                className="w-full bg-white border border-teal-600 text-teal-600 py-3 rounded-xl hover:bg-teal-50 transition cursor-pointer"
              >
                Upload Image
              </button>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="mt-4 w-40 rounded"
                />
              )}
            </div>

            {/* NOTES */}
            <div>
              <label htmlFor="notes" className="block font-medium mb-2">
                Personal Notes
              </label>

              <textarea
                id="notes"
                name="notes"
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
                name="confidence"
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

            <input type="hidden" name="image" value={imageUrl} />

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting" ? "Saving..." : "Save Sign"}
            </button>
          </Form>
        </div>
      </section>
    </main>
  );
}
