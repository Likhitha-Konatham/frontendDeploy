import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/GenreSelect.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { registerUser } from "../services/AllServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import logo1 from "../images/genre_logo1.png";
import logo2 from "../images/genre_logo2.png";
import logo3 from "../images/genre_logo3.png";
import logo4 from "../images/genre_logo4.png";
import logo5 from "../images/genre_logo5.png";
import checkboxEmpty from "../images/checkbox_empty.svg";
import checkboxFilled from "../images/checkbox_fill.svg";

const options = [
  { id: 1, label: "BTech", color: "#E29336", icon: logo1 },
  { id: 2, label: "MTech", color: "#DFC826", icon: logo2 },
  { id: 3, label: "BDes", color: "#89BB34", icon: logo3 },
  { id: 4, label: "MDes", color: "#E2736F", icon: logo4 },
  { id: 5, label: "MSc", color: "#DFC826", icon: logo5 },
];

const GenreSelection = () => {
  const location = useLocation();
  // const { formData } = location.state;
  const navigate = useNavigate();

  const { formData } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      console.error("No data passed to GenreSelection.");
      navigate("/genre"); // Redirect to the home page or a fallback route
    }
  }, [location.state, navigate]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (id) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((optionId) => optionId !== id)
        : [...prevSelected, id]
    );
  };

  // const handleNext = async () => {
  //   if (!formData.email || !formData.password || !formData.firstname) {
  //     console.warn("Required form data is missing. Redirecting to home page.");
  //     navigate("/"); // Redirect to the home page or another fallback route
  //     return;
  //   }

  //   const selectedOptionsLabel = selectedOptions
  //     .map((id) => {
  //       const option = options.find((opt) => opt.id === id);
  //       return option ? option.label : null;
  //     })
  //     .filter((label) => label !== null); // Filter out any null values for safety

  //   const updatedFormData = { ...formData, genre: selectedOptionsLabel };

  //   try {
  //     const result = await registerUser(updatedFormData);

  //     // Check if the result exists and has the expected structure
  //     if (!result || typeof result !== "object" || !result.status) {
  //       console.error("Unexpected response from registerUser:", result);
  //       return;
  //     }

  //     // Handle success case
  //     if (result.status === "success") {
  //       console.log("Registration successful:", result.message);
  //       console.log("User Data:", result.data);
  //       navigate("/"); // Navigate to the desired route
  //     } else {
  //       // Handle failure case
  //       console.error(result.message || "Error during registration.");
  //     }
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   }
  // };

  const handleNext = async () => {
    // Ensure formData exists before accessing its properties

    const selectedOptionsLabel = selectedOptions
      .map((id) => {
        const option = options.find((opt) => opt.id === id);
        return option ? option.label : null;
      })
      .filter((label) => label !== null); // Filter out any null values for safety

    const updatedFormData = { ...formData, genre: selectedOptionsLabel };

    try {
      const result = await registerUser(updatedFormData);

      // Check if the result exists and has the expected structure
      if (!result || typeof result !== "object" || !result.status) {
        console.error("Unexpected response from registerUser:", result);
        return;
      }

      // Handle success case
      if (result.status === "success") {
        console.log("Registration successful:", result.message);
        console.log("User Data:", result.data);
        navigate("/"); // Navigate to the desired route
      } else {
        // Handle failure case
        console.error(result.message || "Error during registration.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }

    if (
      !formData ||
      !formData.email ||
      !formData.password ||
      !formData.firstname
    ) {
      console.warn(
        "Required form data is missing or incomplete. Redirecting to home page."
      );
      navigate("/"); // Redirect to the home page or another fallback route
      return;
    }
  };

  return (
    <div className="main-content">
      <div className="sidebar_container">
        <Sidebar />
      </div>
      <div className="genre-selection-container">
        <div className="header_container">
          <Header
            showSearch={false}
            showUserProfile={false}
            showArrows={true}
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
          <button
            type="button"
            onClick={handleNext}
            className="genre-signUpButton"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreSelection;
