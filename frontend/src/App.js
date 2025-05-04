import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Navbar from "./Navbar";
import AddAssignment from "./AddAssignment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteChangeDetector />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addassignment" element={<AddAssignment />} />
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
