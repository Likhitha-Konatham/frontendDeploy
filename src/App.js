import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Bookmarks from "./pages/Bookmarks";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import BookInfo from "./pages/BookInfoPage";
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
          <Route path="bookmarks" element ={<Bookmarks />} />
          <Route path="library" element ={<Library />} />
          <Route path="settings" element ={<Settings />} />
          <Route path="/genre" element={<GenreSelection />} />
          <Route path="/book-info" element={<BookInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
