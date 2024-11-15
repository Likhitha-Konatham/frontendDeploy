import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenreSelection from "./pages/GenreSelect";

function App() {
  return (
    <Router>
      <div className="pagesall">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/genre" element={<GenreSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
