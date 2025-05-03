import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Authentication from "./Authentication";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
