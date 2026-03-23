import { useState } from "react";

export default function MySigns() {
  console.log("My Signs page loaded");

  // sample data (will come from backend later)
  const [signs, setSigns] = useState([
    {
      name: "Thank You",
      category: "Courtesy",
      confidence: "High",
      notes: "Move hand from chin outward.",
      video: "https://youtube.com",
    },
    {
      name: "Family",
      category: "Family",
      confidence: "Medium",
      notes: "Hands form a circle shape.",
      video: "https://youtube.com",
    },
    {
      name: "Monday",
      category: "Days",
      confidence: "Low",
      notes: "Gesture representing the first day.",
      video: "https://youtube.com",
    },
  ]);

  // controls UI states
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  /* ---------------- FILTER STATE ---------------- */

  const [filter, setFilter] = useState("All");

  // filter logic based on confidence
  const filteredSigns =
    filter === "All"
      ? signs
      : signs.filter((sign) => sign.confidence === filter);

  /* ---------------- FUNCTIONS ---------------- */

  // toggle showing extra details
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // start editing a specific sign
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditData(signs[index]);
  };

  // cancel editing
  const cancelEdit = () => {
    setEditingIndex(null);
  };

  // update form values
  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // save edited data
  const saveEdit = (index) => {
    const updatedSigns = [...signs];
    updatedSigns[index] = editData;
    setSigns(updatedSigns);
    setEditingIndex(null);
  };

  return (
    <div>
      {/* HERO SECTION */}

      <section className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            My Saved Signs
          </h1>

          <p className="text-slate-600 dark:text-slate-300">
            Review, edit, and continue practicing the signs you have learned.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}

      <section className="py-6 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-3 justify-center">
          {["All", "Low", "Medium", "High"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-5 py-2 rounded-xl border transition
              ${
                filter === level
                  ? "bg-teal-600 text-white border-teal-600"
                  : "border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30"
              }`}
              aria-pressed={filter === level}
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      {/* SIGNS GRID */}

      <section className="py-20 bg-teal-50 dark:bg-teal-950/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {filteredSigns.map((sign, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                {/* DEFAULT VIEW */}

                {editingIndex !== index && (
                  <>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                      {sign.name}
                    </h3>

                    <p className="text-sm text-slate-500 mb-1">
                      Category: {sign.category}
                    </p>

                    <p className="text-sm text-teal-600 font-medium mb-4">
                      Confidence: {sign.confidence}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleExpand(index)}
                        aria-expanded={expandedIndex === index}
                        className="text-sm px-3 py-1 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200"
                      >
                        {expandedIndex === index
                          ? "Hide Details"
                          : "View Details"}
                      </button>

                      <button
                        onClick={() => startEditing(index)}
                        className="text-sm px-3 py-1 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50"
                      >
                        Edit
                      </button>
                    </div>

                    {/* EXPANDED DETAILS */}

                    {expandedIndex === index && (
                      <div className="mt-4 border-t pt-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                          <strong>Notes:</strong> {sign.notes}
                        </p>

                        <a
                          href={sign.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-teal-600 underline"
                        >
                          Open Learning Resource
                        </a>
                      </div>
                    )}
                  </>
                )}

                {/* EDIT MODE */}

                {editingIndex === index && (
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-sm block mb-1">Sign Name</label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          handleEditChange("name", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-sm block mb-1">Category</label>
                      <input
                        type="text"
                        value={editData.category}
                        onChange={(e) =>
                          handleEditChange("category", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    {/* Confidence */}
                    <div>
                      <label className="text-sm block mb-1">Confidence</label>
                      <input
                        type="text"
                        value={editData.confidence}
                        onChange={(e) =>
                          handleEditChange("confidence", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="text-sm block mb-1">Notes</label>
                      <textarea
                        value={editData.notes}
                        onChange={(e) =>
                          handleEditChange("notes", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    {/* Video */}
                    <div>
                      <label className="text-sm block mb-1">
                        Resource Link
                      </label>
                      <input
                        type="text"
                        value={editData.video}
                        onChange={(e) =>
                          handleEditChange("video", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => saveEdit(index)}
                        className="px-3 py-1 bg-teal-600 text-white rounded-md"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 border rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
