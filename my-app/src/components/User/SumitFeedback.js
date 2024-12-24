import React, { useState } from "react";
import api from "../../services/api";

const SubmitFeedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/feedback", { rating, comment });
      alert("Feedback submitted!");
      setRating(0);
      setComment("");
    } catch (err) {
      alert("Failed to submit feedback.");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Submit Feedback</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="rating" style={{ display: "block", marginBottom: "5px" }}>
          Rating:
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="comment" style={{ display: "block", marginBottom: "5px" }}>
          Comment:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows="4"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default SubmitFeedback;
