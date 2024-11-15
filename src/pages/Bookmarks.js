import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Bookmarks.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import BookGrids from '../components/BookGrids.js';

// Import local book cover images
import bookcover1 from "../images/bookcover1.png";
import bookcover2 from "../images/bookcover2.png";
import bookcover3 from "../images/bookcover3.png";
import bookcover4 from "../images/bookcover4.png";
import bookcover5 from "../images/bookcover5.png";

const Bookmarks = () => {
  const [activeItem, setActiveItem] = useState("bookmarks");
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();

  const bookGrids = [
    {
      heading: "Showing Bookmarks",
      images: [
        { image: bookcover1, name: "Book Title 1", author: "Author 1", bookmarks: 10 },
        { image: bookcover2, name: "Book Title 2", author: "Author 2", bookmarks: 14 },
        { image: bookcover3, name: "Book Title 3", author: "Author 3", bookmarks: 1 },
        { image: bookcover4, name: "Book Title 4", author: "Author 4", bookmarks: 19 },
        { image: bookcover5, name: "Book Title 5", author: "Author 5", bookmarks: 14 },
        { image: bookcover1, name: "Book Title 1", author: "Author 1", bookmarks: 5 },
        { image: bookcover2, name: "Book Title 2", author: "Author 2", bookmarks: 12 },
        { image: bookcover3, name: "Book Title 3", author: "Author 3", bookmarks: 22 },
        { image: bookcover4, name: "Book Title 4", author: "Author 4", bookmarks: 9 },
        { image: bookcover5, name: "Book Title 5", author: "Author 5", bookmarks: 14 },
        { image: bookcover1, name: "Book Title 1", author: "Author 1", bookmarks: 14 },
        { image: bookcover2, name: "Book Title 2", author: "Author 2", bookmarks: 25 },
        { image: bookcover3, name: "Book Title 3", author: "Author 3", bookmarks: 16 },
        { image: bookcover4, name: "Book Title 4", author: "Author 4", bookmarks: 8 },
        { image: bookcover5, name: "Book Title 5", author: "Author 5", bookmarks: 42 },
        // Add more items as needed
      ]
    }
  ];

  const resetSearch = () => {
    setSearchQuery(""); // Reset the search query
  };

  const handleActiveItemChange = (item) => {
    setActiveItem(item); // Update active item
    if (item === "dashboard") {
      navigate("/"); // Navigate to feedback page
    } else if (item === "bookmarks") {
      navigate("/bookmarks"); // Navigate to home page
    }
    else if (item === "library") {
      navigate("/library"); // Navigate to home page
    }
    else if (item === "settings") {
      navigate("/settings"); // Navigate to home page
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
            {bookGrids.map((bookGrid, index) => (
              <div className="bookGrids" key={index}>
                <BookGrids 
                  heading={bookGrid.heading} 
                  bookGridImages={bookGrid.images}
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
