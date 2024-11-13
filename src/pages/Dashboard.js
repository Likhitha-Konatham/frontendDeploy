import React, { useState } from "react";
import '../styles/Dashboard.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import Carousel from "../components/Carousel.js";
import GenreCarousel from '../components/Genre_carousel.js';

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState(''); 

  const genreCarousels = [
    {
      genre: "Action",
      images: [
        { image: "https://i.postimg.cc/RhYnBf5m/er-slider.jpg" },
        { image: "https://i.postimg.cc/qBGQNc37/ro-slider.jpg" },
        { image: "https://i.postimg.cc/cHdMJQKG/svb-slider.jpg" },
        { image: "https://i.postimg.cc/C12h7nZn/ms-1.jpg" },
        { image: "https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg" },
        // Add more images as needed
      ]
    },
    {
      genre: "Comedy",
      images: [
        { image: "https://i.postimg.cc/qBGQNc37/ro-slider.jpg" },
        { image: "https://i.postimg.cc/cHdMJQKG/svb-slider.jpg" },
        { image: "https://i.postimg.cc/C12h7nZn/ms-1.jpg" },
        { image: "https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg" },
        { image: "https://i.postimg.cc/RhYnBf5m/er-slider.jpg" },
        // Add more images as needed
      ]
    },
    // Add more genres as needed
  ];

  const resetSearch = () => {
    setSearchQuery(""); // Reset the search query
  };

  const getHeaderVisibility = () => {
    if (activeItem === "dashboard" || activeItem === "") {
      return { 
        showSearch: true, showUserProfile: true, showArrows: false, pageName: "Dashboard" 
      };
    }
    return {
      showSearch: false, showUserProfile: true, showArrows: false, pageName: ""
    };
  };

  const { showSearch, showUserProfile, showArrows, pageName } = getHeaderVisibility();

  return (
    <main className="main-content">
      <div className="sidebar_container">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
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
                  genre={carousel.genre} 
                  genre_carousel_images={carousel.images}
                />
              </div>
            ))}
          </div>
        </div>
      </div> 
    </main>
  );
};

export default Dashboard;
