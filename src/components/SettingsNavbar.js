// src/components/SettingsNavbar.js
import React from "react";
import '../styles/SettingsNavbar.css';

const SettingsNavbar = ({ selectedSection, handleSectionClick }) => {
  return (
    <div className="settings_nav_bar">
      <div
        className={`settings_nav_link ${selectedSection === "account" ? "active" : ""}`}
        onClick={() => handleSectionClick("account")}
      >
        Account
      </div>
      <div
        className={`settings_nav_link ${selectedSection === "books" ? "active" : ""}`}
        onClick={() => handleSectionClick("books")}
        style={{ marginLeft: "4.1vw" }}
      >
        Books
      </div>
      <div
        className={`settings_nav_link ${selectedSection === "settings" ? "active" : ""}`}
        onClick={() => handleSectionClick("settings")}
        style={{ marginLeft: "4.1vw" }}
      >
        Settings
      </div>
    </div>
  );
};

export default SettingsNavbar;
