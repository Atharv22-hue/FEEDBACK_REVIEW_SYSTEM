import React, { useEffect, useState } from "react";
import axios from "axios";

const ApproveReview = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL || "http://localhost:5000/api/feedback"
        );
        console.log("Fetched Feedbacks:", response.data);
        setFeedbacks(response.data || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setError("Failed to load feedbacks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/feedback/${id}`, {
        status: "approved",
      });
      console.log(response.data);
      setFeedbacks((prev) =>
        prev.map((feedback) =>
          feedback._id === id ? { ...feedback, status: "approved" } : feedback
        )
      );
    } catch (error) {
      console.error("Error approving feedback:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to approve feedback.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      console.log(response.data);
      setFeedbacks((prev) => prev.filter((feedback) => feedback._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to delete feedback.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Manage Feedbacks
      </h2>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "16px", color: "#007BFF" }}>
          Loading feedback...
        </p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "#ff4d4d", fontSize: "16px" }}>
          {error}
        </p>
      ) : feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            style={{
              marginBottom: "15px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ margin: "5px 0" }}>
              <strong>Comment:</strong> {feedback.comment}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Rating:</strong> {feedback.rating}
            </p>
            <p style={{ margin: "5px 0", color: feedback.status === "approved" ? "green" : "orange" }}>
              <strong>Status:</strong>{" "}
              {feedback.status === "approved" ? "Approved" : "Pending"}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {feedback.status !== "approved" && (
                <button
                  onClick={() => handleApprove(feedback._id)}
                  style={{
                    padding: "10px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => handleDelete(feedback._id)}
                style={{
                  padding: "10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#666",
          }}
        >
          No feedbacks available. Please check back later.
        </p>
      )}
    </div>
  );
};

export default ApproveReview;
