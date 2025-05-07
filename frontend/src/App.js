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

function App() {
  const RouteChangeDetector = () => {
    const location = useLocation();
  
    if (location.pathname !== "/" && location.pathname !== "/signup") {
      return <Navbar />;
    } else {
      return null;
    }
  }  

  return (
    <div className="App">
        <RouteChangeDetector />
        <Routes>
          <Route path="/" element={<SignIn />} />
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addassignment" element={<AddAssignment />} />
            <Route path="/viewassignments" element={<ViewAssignment />} />
            <Route path="/addexam" element={<AddExam />} />
            <Route path="/viewexams" element={<ViewExam />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
