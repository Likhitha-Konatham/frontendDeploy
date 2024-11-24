import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/Sidebar.css";
import audiobook_logo from "../images/audiobook_logo.png";
import bookmark_icon from "../images/bookmark_icon.png";
import dashboard_icon from "../images/dashboard_icon.png";
import library_icon from "../images/library_icon.png";
import settings_icon from "../images/settings_icon.png";
import help_icon from "../images/help_icon.png";
import logout_icon from "../images/logout_icon.png";
import bookmark_active from "../images/bookmark_active.png";
import dashboard_active from "../images/dashboard_active.png";
import library_active from "../images/library_active.png";
import settings_active from "../images/settings_active.png";
import { setToken } from "../storage/Storage"; // Import your storage functions

const Sidebar = ({ activeItem, setActiveItem, resetSearch }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Logout function
  const handleLogout = async () => {
    try {
      await setToken("");
      console.log("User logged out");

      // Navigate to the landing page after logout
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  // Define menuItems with the inactive and active icons
  const menuItems = [
    { icon: dashboard_icon, activeIcon: dashboard_active, label: "Dashboard", key: "dashboard" },
    { icon: bookmark_icon, activeIcon: bookmark_active, label: "Bookmark", key: "bookmarks" },
    { icon: library_icon, activeIcon: library_active, label: "Library", key: "library" },
    { icon: settings_icon, activeIcon: settings_active, label: "Settings", key: "settings" },
  ];
  const bottomMenuItems = [
    { icon: help_icon, label: "Help", key: "help", disabled: true },
    { icon: logout_icon, label: "Logout", key: "logout", disabled: false }, // Enable logout
  ];

  const handleItemClick = (item) => {
    if (item.key === "logout") {
      handleLogout(); // Call logout function when "Logout" is clicked
    } else if (!item.disabled) {
      setActiveItem(item.key);
      if (item.key === "home") {
        resetSearch();
      }
    }
  };

  return (
    <div className="sidebar">
      {/* Top section with icons */}
      <div className="sidebar-top">
        <div className="logo-container">
          <a href="/">
            <img src={audiobook_logo} alt="Audio book Logo" className="logo" />
          </a>
        </div>
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`sidebar-icon ${activeItem === item.key ? "active" : ""}`}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={
                activeItem === item.key || hoveredItem === item.key
                  ? item.activeIcon
                  : item.icon
              }
              alt={`${item.label} Icon`}
            />
          </div>
        ))}
      </div>

      {/* Bottom section with icons */}
      <div className="sidebar-bottom">
        {bottomMenuItems.map((item) => (
          <div
            key={item.key}
            className={`sidebar-icon ${activeItem === item.key ? "active" : ""}`}
            onClick={() => handleItemClick(item)}
          >
            <img src={item.icon} alt={`${item.label} Icon`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
