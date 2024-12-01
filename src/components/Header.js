import React, { useState,useEffect } from "react";
import "../styles/Header.css";
import { fetchProfile } from "../services/AllServices";
import searchIcon from "../images/search_icon.png";
import userIcon from "../images/user_icon.png";
import leftArrow from "../images/left_arrow.png";
import rightArrow from "../images/right_arrow.png";
import historyIcon from "../images/history_icon.png"

const Header = ({showSearch,showUserProfile,onSearch,searchQuery,showArrows,pageName,onProfileClick}) => {
  const [profile, setProfile] = useState({ firstname: "", lastName: "" });
  const [showSearchBar, setShowSearchBar] = useState(false); 

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetchProfile();
        if (response && response.data) {
          const { firstname = "Guest", lastName = "" } = response.data; // Provide default values
          setProfile({ firstname, lastName });
          console.log("Fetched profile:", response.data);
        } else {
          console.warn("Profile data is missing in the response");
          setProfile({ firstname: "Guest", lastName: "" }); // Set default profile values
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile({ firstname: "Guest", lastName: "" }); // Handle error by setting default profile values
      }
    };
  
    getProfile();
  }, []);
  

  const handleSearchClick = () => {
    setShowSearchBar((prevState) => !prevState); // Toggle visibility of search bar
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query); // Pass the query to the parent component
  };

  const handleProfileClick = () => {
    onProfileClick(); // Trigger the parent-provided function
  };

  return (
    <>
      <header className="header">
        {showArrows && (
          <div className="header-left-section">
            <img src={leftArrow} alt="Left Arrow" className="left-arrow-icon" />
            <img src={rightArrow} alt="Right Arrow" className="right-arrow-icon" />
          </div>
        )}
        <div className="active_screen_text">
          <span className="page_label">{pageName}</span>
        </div>

        {showSearch && (
          <div className="search-bar-container">
            <div className="search-bar" onClick={handleSearchClick}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
              <img src={searchIcon} alt="Search" className="search-icon" />
            </div>
            {showSearchBar && (
              <div className="search-dropdown">
                {/* This is the dropdown where recent searches or suggestions will appear */}
                <div className="search-container">
                  <div className="searchbyplaceholder">Search by book name, author, genre, etc..</div>
                  <div className="tags-container">
                    <span className="tag">M.Tech</span>
                    <span className="tag">Science</span>
                    <span className="tag">Data Science</span>
                    {/* Add more tags or dynamic content */}
                  </div>
                  <div className="recent-container">
                    <h3 className="recent-heading">Recent</h3>
                    <ul className="recent-list">
                      <li>
                        <img src={historyIcon} className="history-icon" alt="history icon"/> Statistics for Dummies
                      </li>
                      <li>
                       <img src={historyIcon} className="history-icon" alt="history icon"/> Data Science for Beginners
                      </li>
                      <li>
                        <img src={historyIcon} className="history-icon" alt="history icon"/> The Data Science Handbook
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

       <div className="header-user-profile">
        {showUserProfile && (
          <>
            <div className="header-user-name">
              {profile.firstname || "Guest"} {profile.lastName}
            </div>
            <img
              src={userIcon}
              alt="User Icon"
              className="header-user-icon"
              style={{ cursor: "pointer" }}
              onClick={handleProfileClick} // Use the handler here
            />
          </>
        )}
      </div>
      </header>
    </>
  );
};

export default Header;
