import React, { useState } from "react";
import "../styles/SignIn.css";
// import Sidebar from "../components/Sidebar.js";
// import Header from "../components/Header";
import book_logo from "../images/vector_booklogo.svg";
import fullname_logo from "../images/fullname_logo.svg";
// import message_logo from "../images/message_logo.png";
import password_eye from "../images/password_eye.svg";
import lock_logo from "../images/lock_logo.svg";
import { loginUser } from "../services/AllServices";
import leftArrow from "../images/left_arrow.png";
import rightArrow from "../images/right_arrow.png";

const InputField = ({ icon, placeholder, type, id, value, onChange }) => (
  <div className="inputfield-wrapper">
    <div className="inputfield-container">
      <div className="inputfield-content">
        <img loading="lazy" src={icon} alt="" className="inputfield-icon" />
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="inputfield-inside"
          value={value}
          onChange={onChange}
          required
          aria-label={placeholder}
        />
      </div>
    </div>
  </div>
);

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
  });

  const handleNext = async () => {
    const loginData = {
      fullname: formData.fullname, // Ensure `formData` matches your input field names
      password: formData.password,
    };

    try {
      const response = await loginUser(loginData, (data) => {
        console.log("Callback Data:", data);
      });
      console.log("response login:", loginData);
      if (response && response.status === "success") {
        console.log("Login Successful:", response);
        // alert(response.message); // Notify user of success

        // Save token to localStorage for authentication in future API calls
        localStorage.setItem("access_token", response.data.access_token);

        // Redirect user to the dashboard or home page
        window.location.href = "/";
      } else {
        console.error("Login Failed:", response.message);
        alert(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  return (
    <main className="signup-page">
      <header className="header">
        {
          <div className="header-left-section">
            <img src={book_logo} alt="book logo" className="book-logo-icon" />
            <img src={leftArrow} alt="Left Arrow" className="left-arrow-icon" />
            <img
              src={rightArrow}
              alt="Right Arrow"
              className="right-arrow-icon"
            />
          </div>
        }
      </header>
      <div className="signup-container">
        <div className="signup-form">
          <div className="booklogo-heading">
            <img
              className="booklogo-img"
              alt="site logo of book"
              src={book_logo}
            />
            <div className="booklogo-heading-text">
              <div className="heading-text-wrapper">Login</div>
            </div>
          </div>

          <form className="signup-form">
            <div className="signup-form-group">
              <div className="signup-input-fields">
                <InputField
                  // icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/fc2202c9d9a2d7ad5a197e302dfe1f2cf9eda0d0a72baa90f26e14a44fa3e5b2?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                  icon={fullname_logo}
                  placeholder="Your Full Name"
                  type="text"
                  id="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />

                <div className="passwordInputWrapper">
                  <div className="passwordInputContainer">
                    <div className="passwordInputContent">
                      <img
                        loading="lazy"
                        // src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/ede8020e672a2299ea3fabf45ccd38c9d1cfe12a49405db7bb34420b1a707bc9?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                        src={lock_logo}
                        alt=""
                        className="passwordIcon"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Create a Strong Password"
                        className="passwordField"
                        aria-label="Create a Strong Password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <img
                        loading="lazy"
                        // src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d57736c3399a9f83672f928638bbd8483288335c39bb724d356308d362e5f519?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                        src={password_eye}
                        alt={showPassword ? "Hide password" : "Show password"}
                        className="visibilityIcon"
                        onClick={togglePasswordVisibility}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            togglePasswordVisibility();
                          }
                        }}
                        tabIndex="0"
                        role="button"
                        aria-pressed={showPassword}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="signin-loginLink">
            <p>
              Don't have an Account?{" "}
              <a href="/signup" style={{ color: "#a63e71" }}>
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleNext}
          className="signin-signUpButton"
        >
          Login
        </button>
      </div>
    </main>
  );
};

export default SignUp;
