import React, { useState } from "react";
import "../styles/SignIn.css";
import book_logo from "../images/vector_booklogo.svg";
import fullname_logo from "../images/fullname_logo.svg";
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

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleNext = async () => {
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Clear previous errors

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await loginUser(loginData, (data) => {
        console.log("Callback Data:", data);
      });
      if (response && response.status === "success") {
        console.log("User Data:", response.data);
        localStorage.setItem("access_token", response.data.access_token);
        window.location.href = "/";
      } else {
        setErrorMessage(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while logging in. Please try again later."
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <main className="signup-page">
      <header className="header">
        <div className="header-left-section">
          <img src={book_logo} alt="book logo" className="book-logo-icon" />
          <img src={leftArrow} alt="Left Arrow" className="left-arrow-icon" />
          <img
            src={rightArrow}
            alt="Right Arrow"
            className="right-arrow-icon"
          />
        </div>
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
                  icon={fullname_logo}
                  placeholder="Enter Your Email"
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <div className="passwordInputWrapper">
                  <div className="passwordInputContainer">
                    <div className="passwordInputContent">
                      <img
                        loading="lazy"
                        src={lock_logo}
                        alt=""
                        className="passwordIcon"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter Your Password"
                        className="passwordField"
                        aria-label="Enter Your Password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <img
                        loading="lazy"
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
          {errorMessage && (
            <div className="signin-error-message">{errorMessage}</div>
          )}
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
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Logging in..." : "Login"} {/* Dynamic button text */}
        </button>
      </div>
    </main>
  );
};

export default SignIn;
