import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import Carousel from "../components/Carousel.js";
import GenreCarousel from '../components/Genre_carousel.js';
import InProgessBooksBar from "../components/InProgressBooksBar.js";

// Import local book cover images
import bookcover1 from "../images/bookcover1.png";
import bookcover2 from "../images/bookcover2.png";
import bookcover3 from "../images/bookcover3.png";
import bookcover4 from "../images/bookcover4.png";
import bookcover5 from "../images/bookcover5.png";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();

  // Update genreCarousels to use local images
  const genreCarousels = [
    {
      heading: "Action",
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
    {
      heading: "Comedy",
      images: [
        { image: bookcover2 },
        { image: bookcover3 },
        { image: bookcover4 },
        { image: bookcover5 },
        { image: bookcover1 },
        // Add more images as needed
      ]
    },
    // Add more genres as needed
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
    
      <div className="dashboard_container">
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
        <div className="dashboard_body">
          <div className="carousels_container">
            <div className="new_releases_carousel">
              <Carousel/>
            </div>
            {genreCarousels.map((carousel, index) => (
              <div className="genre_carousel" key={index}>
                <GenreCarousel 
                  heading={carousel.heading} 
                  genre_carousel_images={carousel.images}
                />
              </div>
            ))}
          </div>
          <div className="inprogress_booksbar">
            <InProgessBooksBar />
          </div>
        </div>
      </div> 
    </main>
  );
};

export default Dashboard;
