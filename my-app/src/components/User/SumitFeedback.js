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
        maxWidth: "90%",
        margin: "10px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Submit Feedback
      </h3>
      
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="rating" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
          Rating (1-5):
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
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="comment" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
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
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "none",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          display: "block",
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default SubmitFeedback;
