import React, { useState } from "react";
import "../styles/SignUp.css";
import Header from "../components/Header";
import book_logo from "../images/book_logo.png";

const InputField = ({ icon, placeholder, type, id }) => (
  <div className="inputfield-wrapper">
    <div className="inputfield-container">
      <div className="inputfield-content">
        <img loading="lazy" src={icon} alt="" className="inputfield-icon" />
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="inputfield-inside"
          aria-label={placeholder}
        />
      </div>
    </div>
  </div>
);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="signup-page">
      <Header
        showSearch={false}
        showUserProfile={false}
        showArrows={true} // Pass showArrows to Header
      />
      <div className="signup-container">
        <div className="signup-form">
          <div className="booklogo-heading">
            <img
              className="booklogo-img"
              alt="site logo of book"
              src={book_logo}
            />
            <div className="booklogo-heading-text">
              <div className="heading-text-wrapper">Let's get Started</div>
            </div>
          </div>

          <form className="signup-form">
            <div className="signup-form-group">
              <div className="signup-input-fields">
                <InputField
                  icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/fc2202c9d9a2d7ad5a197e302dfe1f2cf9eda0d0a72baa90f26e14a44fa3e5b2?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                  placeholder="Your Full Name"
                  type="text"
                  id="fullName"
                />
                <InputField
                  icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/bd9391c90aa9a53d902ac81f4f7a2b10b6609c951df26073dc7fc09172d8b726?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                  placeholder="Your Email Address"
                  type="email"
                  id="email"
                />
                <div className="passwordInputWrapper">
                  <div className="passwordInputContainer">
                    <div className="passwordInputContent">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/ede8020e672a2299ea3fabf45ccd38c9d1cfe12a49405db7bb34420b1a707bc9?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                        alt=""
                        className="passwordIcon"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Create a Strong Password"
                        className="passwordField"
                        aria-label="Create a Strong Password"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d57736c3399a9f83672f928638bbd8483288335c39bb724d356308d362e5f519?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
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

            <p className="loginLink">
              Already have an account?{" "}
              <a href="#login" style={{ color: "#a63e71" }}>
                Login
              </a>
            </p>
          </form>
        </div>
        <button type="submit" className="signUpButton">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
