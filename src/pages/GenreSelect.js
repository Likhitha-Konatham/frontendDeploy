import React, { useState } from "react";
import "../styles/GenreSelect.css";

import Header from "../components/Header.js";
import logo1 from "../images/genre_logo1.png"; // Replace with your actual image paths
import logo2 from "../images/genre_logo2.png";
import logo3 from "../images/genre_logo3.png";
import logo4 from "../images/genre_logo4.png";
import logo5 from "../images/genre_logo5.png";
import checkboxEmpty from "../images/checkbox_empty.svg"; // Path to empty checkbox SVG
import checkboxFilled from "../images/checkbox_fill.svg"; // Path to filled checkbox SVG
import Sidebar from "../components/Sidebar.js";

const options = [
  { id: 1, label: "BTech", color: "#E29336", icon: logo1 },
  { id: 2, label: "MTech", color: "#DFC826", icon: logo2 },
  { id: 3, label: "BDes", color: "#89BB34", icon: logo3 },
  { id: 4, label: "MDes", color: "#E2736F", icon: logo4 },
  { id: 5, label: "MSc", color: "#DFC826", icon: logo5 },
];

function GenreSelection() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (id) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((optionId) => optionId !== id)
        : [...prevSelected, id]
    );
  };
  const resetSearch = () => {
    setSearchQuery(""); // Reset the search query
    console.log(searchQuery);
  };

  return (
    <div className="main-content">
      <div className="sidebar_container">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          resetSearch={resetSearch}
        />
      </div>
      <div className="genre-selection-container">
        <div className="header_container">
          <Header
            showSearch={false}
            showUserProfile={false}
            showArrows={true} // Pass showArrows to Header
          />
        </div>
        <div className="genre-content">
          <h1>What would you like to read?</h1>
          <p>Choose your favourites</p>
          <div className="genre-card-container">
            {options.map((option) => (
              <div
                key={option.id}
                className={`genre-card ${
                  selectedOptions.includes(option.id) ? "genre-selected" : ""
                }`}
                style={{ backgroundColor: option.color }}
                onClick={() => handleSelect(option.id)}
              >
                <div className="genre-checkbox">
                  <img
                    src={
                      selectedOptions.includes(option.id)
                        ? checkboxFilled
                        : checkboxEmpty
                    }
                    alt="checkbox"
                  />
                </div>
                <div className="genre-icon">
                  <img src={option.icon} alt={option.label} />
                </div>
                <p>{option.label}</p>
              </div>
            ))}
          </div>
          <button type="submit" className="genre-signUpButton">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenreSelection;
