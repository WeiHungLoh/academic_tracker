import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Navbar from "./Navbar";
import AddAssignment from "./Assignment/AddAssignment";
import ViewAssignment from "./Assignment/ViewAssignment";
import AddExam from "./Exam/AddExam";
import ViewExam from "./Exam/ViewExam";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteChangeDetector />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addassignment" element={<AddAssignment />} />
          <Route path="/viewassignments" element={<ViewAssignment />} />
          <Route path="/addexam" element={<AddExam />} />
          <Route path="/viewexams" element={<ViewExam />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const RouteChangeDetector = () => {
  const location = useLocation();

  if (location.pathname !== "/" && location.pathname !== "/signup") {
    return <Navbar />;
  } else {
    return null;
  }
}

export default App;
