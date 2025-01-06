import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/header";
import SubmitFeedback from './components/User/SumitFeedback.js';
import ViewReviews from "./components/User/ViewReviews";
import ApproveReview from "./components/admin/ApproveReview";

const App = () => {
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
  };

  return (
    <Router>
      <Header />
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<><SubmitFeedback /><ViewReviews /></>} />
          <Route path="/admin" element={<ApproveReview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
