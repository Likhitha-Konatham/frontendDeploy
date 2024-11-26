import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Bookmarks from "./pages/Bookmarks";
import ViewBookmarks from "./pages/ViewBookmarks";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import BookInfo from "./pages/BookInfoPage";
import AudioBookPlayer from "./pages/AudioBookPlayer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GenreSelection from "./pages/GenreSelect";
import ProtectedRoute from "./Routing/PrivateRouting";
import { getToken } from "./storage/Storage"; // Adjust path based on your project structure

function App() {
  const [isAuthenticated] = useState(!!getToken());

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
          {/* <Route
            path="/genre"
            element={
              <ProtectedRoute
                element={GenreSelection}
                isAuthenticated={isAuthenticated}
              />
            }
          /> */}
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
            path="/audiobook-player"
            element={
              <ProtectedRoute
                element={AudioBookPlayer}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          {/* Catch-All Redirect */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/signin"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
