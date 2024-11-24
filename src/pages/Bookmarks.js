import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Bookmarks.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import BookGrids from '../components/BookGrids.js';
import { fetchUserBookmarks } from '../services/AllServices.js';

const Bookmarks = () => {
  const [activeItem, setActiveItem] = useState("bookmarks");
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();
  const [markedBooks, setMarkedBooks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetchUserBookmarks(); // Fetch data from API
        setMarkedBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const showingBookmarksHeading = "Showing Bookmarks";

  const resetSearch = () => {
    setSearchQuery(""); // Reset the search query
  };

  const handleActiveItemChange = (item) => {
    setActiveItem(item); // Update active item
    if (item === "dashboard") {
      navigate("/"); // Navigate to dashboard
    } else if (item === "bookmarks") {
      navigate("/bookmarks"); // Navigate to bookmarks
    } else if (item === "library") {
      navigate("/library"); // Navigate to library
    } else if (item === "settings") {
      navigate("/settings"); // Navigate to settings
    }
    resetSearch(); // Reset search whenever a new section is selected
  };

  const getHeaderVisibility = () => {
    if (activeItem === "dashboard" || activeItem === "") {
      return { showSearch: true, showUserProfile: true, showArrows: false, pageName: "Dashboard" };
    } else if (activeItem === "bookmarks") {
      return { showSearch: true, showUserProfile: true, showArrows: true, pageName: "" };
    } else if (activeItem === "library") {
      return { showSearch: false, showUserProfile: true, showArrows: true, pageName: "Library" };
    } else if (activeItem === "settings") {
      return { showSearch: false, showUserProfile: true, showArrows: true, pageName: "Account" };
    }
  };

  const { showSearch, showUserProfile, showArrows, pageName } = getHeaderVisibility();

  return (
    <main className="main-content">
      <div className="sidebar_container">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={handleActiveItemChange}
          resetSearch={resetSearch}
        />
      </div>
      <div className="bookmarks_container">
        <div className="header_container">
          <Header
            showSearch={showSearch}
            showUserProfile={showUserProfile}
            showArrows={showArrows} 
            pageName={pageName} 
            searchQuery={searchQuery}
            onSearch={(query) => setSearchQuery(query)}
          />
        </div>
        <div className="bookmarks_body">
          <div className="bookGrids_container">
            {markedBooks.map((book, index) => (
              <div className="bookGrids" key={book._id || index}>
                <BookGrids 
                  showingBookmarksHeading={showingBookmarksHeading}
                  thumbnail={book.thumbnail}
                  authors={book.author_list}
                  title={book.title}
                  bookmarkCount={book.bookMarkCount}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Bookmarks;
