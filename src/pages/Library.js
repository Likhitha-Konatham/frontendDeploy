import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Library.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import ReadlaterCarousel from "../components/Readlater_carousel.js";
import InprogressCarousel from "../components/Inprogress_carousel.js";
import HistoryCarousel from "../components/History_carousel.js";

// Import local book cover images
import bookcover1 from "../images/bookcover1.png";
import bookcover2 from "../images/bookcover2.png";
import bookcover3 from "../images/bookcover3.png";
import bookcover4 from "../images/bookcover4.png";
import bookcover5 from "../images/bookcover5.png";

const Library = () => {
  const [activeItem, setActiveItem] = useState("library");
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();

  const readlaterCarousel = [
    {
      heading: "Read Later",
      images: [
        { image: bookcover1 },
        { image: bookcover2 },
        { image: bookcover3 },
        { image: bookcover4 },
        { image: bookcover5 },
        { image: bookcover1 },
        { image: bookcover2 },
        { image: bookcover3 },
        { image: bookcover4 },
        { image: bookcover5 },
        // Add more images as needed
      ]
    }
  ];
  const inprogressCarousel = [
    {
      heading: "In Progress",
      images: [
        { image: bookcover1 },
        { image: bookcover2 },
        { image: bookcover3 },
        { image: bookcover4 },
        { image: bookcover5 },
        { image: bookcover1 },
        { image: bookcover2 },
        { image: bookcover3 },
        { image: bookcover4 },
        { image: bookcover5 },
        // Add more images as needed
      ]
    }
  ];
  const historyCarousel = [
    {
        heading: "My History",
        images: [
            { image: bookcover1 },
            { image: bookcover2 },
            { image: bookcover3 },
            { image: bookcover4 },
            { image: bookcover5 },
            { image: bookcover1 },
            { image: bookcover2 },
            { image: bookcover3 },
            { image: bookcover4 },
            { image: bookcover5 },
            // Add more images as needed
          ]
      },
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
    
      <div className="library_container">
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
        <div className="library_body">
          <div className="carousels_container">
            {readlaterCarousel.map((carousel, index) => (
              <div className="readlater_carousel" key={index}>
                <ReadlaterCarousel 
                  heading={carousel.heading} 
                  readlater_carousel_images={carousel.images}
                />
              </div>
            ))}
             {inprogressCarousel.map((carousel, index) => (
              <div className="inprogress_carousel" key={index}>
                <InprogressCarousel 
                  heading={carousel.heading} 
                  inprogress_carousel_images={carousel.images}
                />
              </div>
            ))}
             {historyCarousel.map((carousel, index) => (
              <div className="history_carousel" key={index}>
                <HistoryCarousel 
                  heading={carousel.heading} 
                  history_carousel_images={carousel.images}
                />
              </div>
            ))}
          </div>
        </div>
      </div> 
    </main>
  );
};

export default Library;
