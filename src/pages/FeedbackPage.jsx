import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

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
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "reviews"), orderBy("date", "desc"), limit(20))
        );
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchData();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;

    const date = new Date().toISOString();

    try {
      const newReview = {
        name: name.trim() || "Anonymous",
        rating,
        text: rating === 5 && text.trim() ? text.trim() : "", // ✅ only save text if 5★
        date,
      };

      const docRef = await addDoc(collection(db, "reviews"), newReview);

      setReviews((prev) => [{ id: docRef.id, ...newReview }, ...prev]);

      // Reset form
      setName("");
      setRating(0);
      setText("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  
  const totalRatings = reviews.length;
  const averageRating =
    totalRatings > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / totalRatings
        ).toFixed(1)
      : 0;

  const starCounts = [5, 4, 3, 2, 1].map(
    (n) => reviews.filter((r) => r.rating === n).length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-700">
          Customer Reviews
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Honest reviews from our valued customers.
        </p>

      
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          <div className="text-center md:text-left">
            <div className="text-5xl md:text-6xl font-extrabold text-pink-600">
              {averageRating}
            </div>
            <div className="flex justify-center md:justify-start mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`w-6 h-6 ${
                    n <= Math.round(averageRating)
                      ? "fill-pink-500 stroke-pink-500"
                      : "stroke-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-500 mt-1 text-sm">
              {totalRatings} total reviews
            </div>
          </div>

        
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, i) => {
              const count = starCounts[i];
              const percent = totalRatings ? (count / totalRatings) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-5 text-sm font-medium text-gray-700">
                    {star}
                  </span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500 rounded-full"
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
                placeholder="Tell us what you loved…"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 shadow-md transition"
            disabled={!rating}
          >
            Submit Review
          </button>
        </form>

        
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-pink-700">Latest Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600 mt-2">No reviews yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-pink-100 p-4 shadow-sm bg-white"
                >
                  <div className="flex items-center gap-2 mb-2">
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
                    <span className="text-sm text-gray-700">
                      {r.name || "Anonymous"}
                    </span>
                  </div>
                  {r.text && <p className="text-gray-800">{r.text}</p>}
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(r.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FeedbackPage;
