import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Bookmarks from "./pages/Bookmarks";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import BookInfo from "./pages/BookInfoPage";
import AudioBookPlayer from "./pages/AudioBookPlayer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GenreSelection from "./pages/GenreSelect";
import ViewBookmarks from "./pages/ViewBookmarks";
import ProtectedRoute from "./Routing/PrivateRouting"; // Import ProtectedRoute
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="pagesall">
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/bookmarks" element={<ProtectedRoute element={Bookmarks} />} />
          <Route path="/library" element={<ProtectedRoute element={Library} />} />
          <Route path="/settings" element={<ProtectedRoute element={Settings} />} />
          <Route path="/genre" element={<ProtectedRoute element={GenreSelection} />} />
          <Route path="/book-info/:genre/:bookId" element={<ProtectedRoute element={BookInfo} />} />
          <Route path="/audiobook-player" element={<ProtectedRoute element={AudioBookPlayer} />} />
          <Route path="/view-bookmarks" element={<ProtectedRoute element={ViewBookmarks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
