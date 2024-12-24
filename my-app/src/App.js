import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/header";
import SubmitFeedback from "./components/User/SumitFeedback";
import ViewReviews from "./components/User/ViewReviews";
import ApproveReview from "./components/admin/ApproveReview";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<><SubmitFeedback /><ViewReviews /></>} />
        <Route path="/admin" element={<ApproveReview />} />
      </Routes>
    </Router>
  );
};

export default App;
