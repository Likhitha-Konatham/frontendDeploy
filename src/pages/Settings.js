// src/pages/Settings.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Settings.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import AccountSection from '../components/AccountSection.js';
import SettingsSection from '../components/SettingsSection.js';
import GenreCarousel from "../components/Genre_carousel.js";
import SettingsNavbar from "../components/SettingsNavbar.js";  // Import the new Navbar component

// Import local book cover images
import bookcover1 from "../images/bookcover1.png";
import bookcover2 from "../images/bookcover2.png";
import bookcover3 from "../images/bookcover3.png";
import bookcover4 from "../images/bookcover4.png";
import bookcover5 from "../images/bookcover5.png";

const Settings = () => {
  const [activeItem, setActiveItem] = useState("settings");
  const [selectedSection, setSelectedSection] = useState("account");
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();
  const genreCarousels = [
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
      ]
    },
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
      ]
    },
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

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "account":
        return <AccountSection />;
      case "books":
        return (
            <div className="carousels_container">
              {genreCarousels.map((carousel, index) => (
                <div className="genre_carousel" key={index}>
                  <GenreCarousel 
                    heading={carousel.heading} 
                    genre_carousel_images={carousel.images}
                  />
                </div>
              ))}
            </div>
        );
      case "settings":
        return <SettingsSection />;
      default:
        return <AccountSection />;
    }
  };

  return (
    <main className="main-content">
      <div className="sidebar_container">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={handleActiveItemChange}
          resetSearch={resetSearch}
        />
      </div>

      <div className="settings_container">
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
        <div className="settings-nav-bar">
            <SettingsNavbar 
                selectedSection={selectedSection} 
                handleSectionClick={handleSectionClick} 
            />
        </div>
        

        <div className="settings_body">
            {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default Settings;
