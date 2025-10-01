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

  // Load from storage
  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem("allRatings") || "[]");
      const f = JSON.parse(localStorage.getItem("fiveStarFeedback") || "[]");
      setAllRatings(r);
      setFiveStarFeedback(f);
    } catch {}
  }, []);

  const saveToStorage = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

  const enforceLimit = (list, key) => {
    if (list.length > 50) {
      const fresh = list.slice(0, 50); // keep only 50
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

    // save rating
    let nextRatings = [{ id, name: name.trim(), rating, date }, ...allRatings];
    nextRatings = enforceLimit(nextRatings, "allRatings");
    setAllRatings(nextRatings);
    saveToStorage("allRatings", nextRatings);

    // save text feedback if 5 stars
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

    // reset form
    setName("");
    setRating(0);
    setText("");
  };

  // remove rating
  const removeRating = (id) => {
    const updated = allRatings.filter((r) => r.id !== id);
    setAllRatings(updated);
    saveToStorage("allRatings", updated);
  };

  // remove feedback
  const removeFeedback = (id) => {
    const updated = fiveStarFeedback.filter((f) => f.id !== id);
    setFiveStarFeedback(updated);
    saveToStorage("fiveStarFeedback", updated);
  };

  // ====== Rating breakdown logic =======
  const totalRatings = allRatings.length;
  const averageRating =
    totalRatings > 0
      ? (
          allRatings.reduce((acc, r) => acc + r.rating, 0) / totalRatings
        ).toFixed(1)
      : 0;

  const starCounts = [1, 2, 3, 4, 5].map(
    (n) => allRatings.filter((r) => r.rating === n).length
  );

  const renderStars = (value) => {
    const val = parseFloat(value);
    const fullStars = Math.floor(val);
    const hasHalf = val - fullStars >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-6 h-6 fill-pink-500 stroke-pink-500"
        />
      );
    }
    if (hasHalf) {
      stars.push(
        <Star
          key="half"
          className="w-6 h-6 fill-pink-200 stroke-pink-500"
        />
      );
    }
    while (stars.length < 5) {
      stars.push(
        <Star
          key={`empty-${stars.length}`}
          className="w-6 h-6 stroke-gray-300"
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-700">
          Customer Ratings & Feedback
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Rate your experience from 1 to 5 stars.
        </p>

        {/* Rating breakdown */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left */}
          <div className="text-center md:text-left">
            <div className="text-5xl md:text-6xl font-extrabold text-pink-600">
              {averageRating}
            </div>
            <div className="flex justify-center md:justify-start mt-2">
              {renderStars(averageRating)}
            </div>
            <div className="text-gray-500 mt-1 text-sm">
              {totalRatings} ratings total
            </div>
          </div>

          {/* Right */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = starCounts[star - 1];
              const percent =
                totalRatings > 0 ? (count / totalRatings) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-5 text-sm font-medium text-gray-700">
                    {star}
                  </span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-right text-sm text-gray-500">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
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

        {/* 5-star feedback */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-pink-700">
            Customer 5★ Feedback
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

        {/* Recent ratings */}
        <section className="mt-10">
          <h3 className="text-lg font-semibold text-gray-800">Recent Ratings</h3>
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
