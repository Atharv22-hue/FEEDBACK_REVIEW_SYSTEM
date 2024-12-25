import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("https://feedback-review-system-2.onrender.com");
        console.log("Fetched Data:", data);
        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      }
    };
    fetchReviews();
  }, []);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Average Rating:{" "}
        <span style={{ color: "#007BFF" }}>{averageRating}</span>
      </h3>

      {error ? (
        <p
          style={{
            color: "#ff4d4d",
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          {error}
        </p>
      ) : reviews.length > 0 ? (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
          }}
        >
          {reviews.map((review) => (
            <li
              key={review._id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p style={{ margin: "5px 0" }}>
                <strong style={{ color: "#333" }}>Rating:</strong>{" "}
                <span style={{ color: "#007BFF" }}>{review.rating}</span>
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong style={{ color: "#333" }}>Comment:</strong>{" "}
                {review.comment}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#666",
          }}
        >
          No reviews available.
        </p>
      )}
    </div>
  );
};

export default ViewReviews;
