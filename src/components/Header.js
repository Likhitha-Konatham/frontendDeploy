import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { fetchProfile } from "../services/AllServices";
import { getToken } from "../storage/Storage";
import searchIcon from "../images/search_icon.png";
import userIcon from "../images/user_icon.png";
import leftArrow from "../images/left_arrow.png";
import rightArrow from "../images/right_arrow.png";
import historyIcon from "../images/history_icon.png";

const Header = ({
  showSearch,
  showUserProfile,
  onSearch,
  searchQuery,
  showArrows,
  pageName,
  onProfileClick,
}) => {
  const [profile, setProfile] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [token, setTokenState] = useState(null); // Token state
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const navigate = useNavigate();

  // Fetch token and profile
  useEffect(() => {
    const fetchTokenAndProfile = async () => {
      try {
        const storedToken = await getToken();
        setTokenState(storedToken);
        if (storedToken) {
          const response = await fetchProfile();
          setProfile(response?.data || []);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile. Please try again later.");
      }
    };
    fetchTokenAndProfile();
  }, []);
  

  // Toggle search bar visibility
  const handleSearchClick = () => setShowSearchBar((prevState) => !prevState);

  // Handle search query
  const handleSearch = (event) => onSearch(event.target.value);

  // Popup toggle
  const togglePopup = () => setShowPopup((prev) => !prev);

  // Popup actions
  const handleSignIn = () => navigate("/signin");
  const handleSignUp = () => navigate("/signup");

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
                <div className="search-container">
                  <div className="searchbyplaceholder">
                    Search by book name, author, genre, etc.
                  </div>
                  <div className="tags-container">
                    <span className="tag">M.Tech</span>
                    <span className="tag">Science</span>
                    <span className="tag">Data Science</span>
                  </div>
                  <div className="recent-container">
                    <h3 className="recent-heading">Recent</h3>
                    <ul className="recent-list">
                      <li>
                        <img src={historyIcon} className="history-icon" alt="history icon" />{" "}
                        Statistics for Dummies
                      </li>
                      <li>
                        <img src={historyIcon} className="history-icon" alt="history icon" />{" "}
                        Data Science for Beginners
                      </li>
                      <li>
                        <img src={historyIcon} className="history-icon" alt="history icon" />{" "}
                        The Data Science Handbook
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
              {!token ? ( // If the token does not exist (i.e., not authenticated)
                <div
                  className="header-user-name"
                  onClick={togglePopup} // Trigger the popup for login
                  style={{ cursor: "pointer" }}
                >
                  Sign In / Account
                </div>
              ) : ( // If the token exists (authenticated)
                <div
                  className="header-user-name"
                  style={{ cursor: "default" }}
                >
                  {profile?.firstname} {profile?.lastName} {/* Display user name */}
                </div>
              )}
              <img
                src={userIcon}
                alt="User Icon"
                className="header-user-icon"
                style={{ cursor: token ? "pointer" : "default" }}
                onClick={token ? onProfileClick : null} // Only clickable if token exists
              />
            
            </>
          )}
        </div>
        {showPopup && !token && (
          <div className="popup-container">
            <div className="popup-arrow"></div>
            <div className="popup-content">
              <button className="signin-button" onClick={handleSignIn}>
                Sign In
              </button>
              <div className="new-customer">
                New customer?{" "}
                <span className="start-here" onClick={handleSignUp}>
                  Start here
                </span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
