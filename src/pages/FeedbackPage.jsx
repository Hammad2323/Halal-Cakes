import React, { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

const StarRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover ?? value) >= n;
        return (
          <button
            key={n}
            type="button"
            aria-label={`${n} star`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(n)}
            className="p-1"
          >
            <Star
              className={`w-7 h-7 transition-transform ${
                active
                  ? "fill-pink-500 stroke-pink-500 scale-105"
                  : "stroke-gray-400"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

const FeedbackPage = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const [allRatings, setAllRatings] = useState([]);
  const [fiveStarFeedback, setFiveStarFeedback] = useState([]);


  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem("allRatings") || "[]");
      const f = JSON.parse(localStorage.getItem("fiveStarFeedback") || "[]");
      setAllRatings(r);
      setFiveStarFeedback(f);
    } catch {
      
    }
  }, []);

  const saveToStorage = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

  
  const enforceLimit = (list, key) => {
    if (list.length >= 50) {
      const fresh = []; 
      saveToStorage(key, fresh);
      return fresh;
    }
    return list;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;

    const id = Date.now();
    const date = new Date().toISOString();

    
    let nextRatings = [
      { id, name: name.trim(), rating, date },
      ...allRatings,
    ];
    nextRatings = enforceLimit(nextRatings, "allRatings");
    setAllRatings(nextRatings);
    saveToStorage("allRatings", nextRatings);

    
    if (rating === 5 && text.trim()) {
      let nextFb = [
        {
          id,
          name: name.trim() || "Anonymous",
          text: text.trim(),
          rating: 5,
          date,
        },
        ...fiveStarFeedback,
      ];
      nextFb = enforceLimit(nextFb, "fiveStarFeedback");
      setFiveStarFeedback(nextFb);
      saveToStorage("fiveStarFeedback", nextFb);
    }

    
    setName("");
    setRating(0);
    setText("");
  };

  
  const removeRating = (id) => {
    const updated = allRatings.filter((r) => r.id !== id);
    setAllRatings(updated);
    saveToStorage("allRatings", updated);
  };

  
  const removeFeedback = (id) => {
    const updated = fiveStarFeedback.filter((f) => f.id !== id);
    setFiveStarFeedback(updated);
    saveToStorage("fiveStarFeedback", updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-700">
          Share Your Feedback
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Rate your experience from 1 to 5 stars. Written feedback is saved only
          for 5★ reviews.
        </p>

        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your name (optional)
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="e.g. Aisha"
            />
          </div>

          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your rating
            </label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          {rating === 5 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your feedback (optional)
              </label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-xl border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Write what you loved…"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 shadow-md transition"
            disabled={!rating}
          >
            Submit Feedback
          </button>
        </form>

        
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-pink-700">
            Customer Feedback (5★)
          </h2>
          {fiveStarFeedback.length === 0 ? (
            <p className="text-gray-600 mt-2">No 5★ written feedback yet.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {fiveStarFeedback.map((fb) => (
                <div
                  key={fb.id}
                  className="relative rounded-xl border border-pink-100 p-4 shadow-sm bg-white"
                >
                  <button
                    onClick={() => removeFeedback(fb.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-pink-500 stroke-pink-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-800">{fb.text}</p>
                  <div className="mt-3 text-xs text-gray-500">
                    — {fb.name} · {new Date(fb.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        
        <section className="mt-10">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Ratings
          </h3>
          {allRatings.length === 0 ? (
            <p className="text-gray-600 mt-2">No ratings yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {allRatings.map((r) => (
                <li
                  key={r.id}
                  className="relative flex items-center justify-between rounded-lg bg-pink-50 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`w-4 h-4 ${
                            n <= r.rating
                              ? "fill-pink-500 stroke-pink-500"
                              : "stroke-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-700">
                      {r.name || "Anonymous"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => removeRating(r.id)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default FeedbackPage;
