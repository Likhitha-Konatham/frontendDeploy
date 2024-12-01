import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Bookmarks from "./pages/Bookmarks";
import ViewBookmarks from "./pages/ViewBookmarks";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import BookInfo from "./pages/BookInfoPage";
import BookInformationPage from "./pages/BookInformationPage";
import AudioBookPlayer from "./pages/AudioBookPlayer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GenreSelection from "./pages/GenreSelect";
import ProtectedRoute from "./Routing/PrivateRouting";
import NotFound from "./components/NotFound.js";
import { getToken } from "./storage/Storage"; // Adjust path based on your project structure

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Re-check authentication when the component mounts

  function NotFoundWrapper() {
    const location = useLocation(); // Get the current location (i.e., URL path)
    return <NotFound location={location} />;
  }

  return (
    <Router>
      <div className="pagesall">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/genre" element={<GenreSelection />} />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Dashboard}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute
                element={Bookmarks}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/view-bookmarks"
            element={
              <ProtectedRoute
                element={ViewBookmarks}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute
                element={Library}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                element={Settings}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/book-info/:genre/:bookId"
            element={
              <ProtectedRoute
                element={BookInfo}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/book-info/:bookId"
            element={
              <ProtectedRoute
                element={BookInformationPage}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/audiobook-player"
            element={
              <ProtectedRoute
                element={AudioBookPlayer}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          {/* Catch-All Redirect */}
           <Route path="*" element={<NotFoundWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
