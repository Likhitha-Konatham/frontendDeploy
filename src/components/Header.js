import React from "react";
import "../styles/Header.css";
import searchIcon from "../images/search_icon.png";
import userIcon from "../images/user_icon.png";
import leftArrow from "../images/left_arrow.png";
import rightArrow from "../images/right_arrow.png";

const Header = ({
  showSearch,
  showUserProfile,
  onSearch,
  searchQuery,
  showArrows,
  pageName
}) => {

  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query); // Pass the query to the parent component
  };

  return (
    <header className="header">
      {showArrows && ( // Conditionally show the arrows based on the prop
        <div className="header-left-section">
          <img src={leftArrow} alt="Left Arrow" className="left-arrow-icon" />
          <img src={rightArrow} alt="Right Arrow" className="right-arrow-icon" />
        </div>
      )}
      <div className="active_screen_text">
        <span className="page_label">{pageName}</span> {/* Dynamically display the page name */}
      </div>

      {showSearch && (
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
            <img src={searchIcon} alt="Search" className="search-icon" />
          </div>
        </div>
      )}

      <div className="header-user-profile">
        {showUserProfile && (
          <>
            <div className="header-user-name">{"Meghana Tatavolu" || "Loading..."}</div>
            <img
              src={userIcon}
              alt="User Icon"
              className="header-user-icon"
              style={{ cursor: "pointer" }}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
