import React, { useState, useEffect,useRef,useCallback   } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import {
  fetchProfile,
  searchBooks,
  fetchSearchHistory,
  fetchSearchCount,
} from "../services/AllServices";
import { getToken } from "../storage/Storage";
// import searchIcon from "../images/search_icon.png";
import userIcon from "../images/user_icon.png";
import leftArrow from "../images/left_arrow.png";
import rightArrow from "../images/right_arrow.png";
import historyIcon from "../images/history_icon.png";
import { Search } from "lucide-react";

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
  const [token, setTokenState] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchCounts, setSearchCounts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await getToken();
        setTokenState(storedToken);
        if (storedToken) {
          const response = await fetchProfile();
          setProfile(response?.data || []);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile.");
      }
    };
    fetchData();
  }, []);

  const fetchSearchHistoryData = useCallback(async () => {
    try {
      const response = await fetchSearchHistory(token);
      if (response?.status === "success") {
        setSearchHistory(response.data.searchedData.reverse());
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  }, [token]);
  
  const fetchSearchCountData = useCallback(async () => {
    try {
      const response = await fetchSearchCount();
      if (response?.status === "success") {
        setSearchCounts(Object.keys(response.data).reverse());
      }
    } catch (error) {
      console.error("Error fetching search count:", error);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchSearchHistoryData();
      fetchSearchCountData();
    }
  }, [token, fetchSearchHistoryData, fetchSearchCountData]);
  const handleSearchClick = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await searchBooks(searchQuery);
        if (response) {
          navigate("/searched-results", {
            state: { searchedbooks: response.data, searchedQuery: searchQuery },
          });
        }
      } catch (error) {
        console.error("Error searching books:", error);
        alert("Failed to fetch search results.");
      }
    }
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") handleSearchClick();
  };

  const handleTagClick = async (tag) => {
    try {
      const response = await searchBooks(tag);
      if (response) {
        navigate("/searched-results", {
          state: { searchedbooks: response.data, searchedQuery: tag },
        });
      }
    } catch (error) {
      console.error("Error searching books:", error);
      alert("Failed to fetch search results.");
    }
  };

  const handleHistoryClick = async (query) => {
    try {
      const response = await searchBooks(query);
      if (response) {
        navigate("/searched-results", {
          state: { searchedbooks: response.data, searchedQuery: query },
        });
      }
    } catch (error) {
      console.error("Error searching books:", error);
      alert("Failed to fetch search results.");
    }
  };

  return (
    <>
      <header className="header">
        {showArrows && (
          <div className="header-left-section">
            <img
              src={leftArrow}
              alt="Left Arrow"
              className="left-arrow-icon"
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={rightArrow}
              alt="Right Arrow"
              className="right-arrow-icon"
              onClick={() => navigate(1)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        <div className="active_screen_text">
          <span className="page_label">{pageName}</span>
        </div>

        {showSearch && (
          <div className="search-bar-container" ref={searchRef}>
            <div className="search-bar" onClick={() => setShowDropdown(true)}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                onKeyPress={handleSearchKeyPress}
              />
              {/* <img
                src={searchIcon}
                alt="Search"
                className="search-icon"
                onClick={handleSearchClick}
              /> */}

              <div className="search-icon" onClick={handleSearchClick}>
                <Search
                  size={18}
                  color="#C4569C"
                  style={{ background: "transparent" }}
                />
              </div>
            </div>

            {showDropdown && (
              <div className="search-dropdown">
                <div className="search-container">
                  <div className="searchbyplaceholder">
                    Search by book name, author, genre, etc.
                  </div>
                  <div className="tags-container">
                    {searchCounts.map((tag, index) => (
                      <span
                        key={index}
                        className="tag"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="recent-container">
                    <h3 className="recent-heading">Recent</h3>
                    <ul className="recent-list">
                      {searchHistory.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleHistoryClick(item)}
                        >
                          <img
                            src={historyIcon}
                            className="history-icon"
                            alt="history icon"
                          />{" "}
                          {item}
                        </li>
                      ))}
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
              {!token ? (
                <div
                  className="header-user-name"
                  onClick={() => setShowPopup((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                >
                  Sign In / Account
                </div>
              ) : (
                <div className="header-user-name" style={{ cursor: "default" }}>
                  {profile?.firstname} {profile?.lastName}
                </div>
              )}
              <img
                src={userIcon}
                alt="User Icon"
                className="header-user-icon"
                style={{ cursor: token ? "pointer" : "default" }}
                onClick={token ? onProfileClick : null}
              />
            </>
          )}
        </div>
        {showPopup && !token && (
          <div className="popup-container">
            <div className="popup-arrow"></div>
            <div className="popup-content">
              <button
                className="signin-button"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
              <div className="new-customer">
                New customer?{" "}
                <span
                  className="start-here"
                  onClick={() => navigate("/signup")}
                >
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
