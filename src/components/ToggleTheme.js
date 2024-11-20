import React, { useState } from "react";
import "../styles/ToggleTheme.css";

const ToggleTheme = () => {
  const [isLightMode, setIsLightMode] = useState(
    JSON.parse(localStorage.getItem("isLightMode")) || true
  );

  const toggleMode = () => {
    setIsLightMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("isLightMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <div className="toggle-container">
      <button
        type="button"
        className={`toggle-button ${isLightMode ? "active" : ""}`}
        onClick={toggleMode}
      >
        Light Mode
      </button>
      <button
        type="button"
        className={`toggle-button ${!isLightMode ? "active" : ""}`}
        onClick={toggleMode}
      >
        Dark Mode
      </button>
    </div>
  );
};

export default ToggleTheme;
