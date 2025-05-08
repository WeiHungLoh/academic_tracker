import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Navbar from "./Navbar";
import AddAssignment from "./Assignment/AddAssignment";
import ViewAssignment from "./Assignment/ViewAssignment";
import AddExam from "./Exam/AddExam";
import ViewExam from "./Exam/ViewExam";
import ProtectedRoutes from "./ProtectedRoutes";
import InvalidPage from "./InvalidPage"

function App() {
  const location = useLocation();
  // Stores all routes except for sign in and sign up 
  const navbarRoutes = ["/addassignment", "/viewassignments", "/addexam", "/viewexams"];
  const showNavbar = navbarRoutes.includes(location.pathname);

  return (
    <div className="App">
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/addassignment" element={<AddAssignment />} />
            <Route path="/viewassignments" element={<ViewAssignment />} />
            <Route path="/addexam" element={<AddExam />} />
            <Route path="/viewexams" element={<ViewExam />} />
            <Route path="*" element={<InvalidPage />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
