import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import Header from "../components/Header";
// import { registerUser } from "../services/AllServices";

import book_logo from "../images/vector_booklogo.svg";
import fullname_logo from "../images/fullname_logo.svg";
import message_logo from "../images/message_logo.svg";
import password_eye from "../images/password_eye.svg";
import lock_logo from "../images/lock_logo.svg";

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
    firstName: "",
    email: "",
    password: "",
    genre: [],
  });
  // const [errorMessage, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="signup-page">
      <Header showSearch={false} showUserProfile={false} showArrows={true} />
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
                  icon={fullname_logo}
                  placeholder="Your Full Name"
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <InputField
                  icon={message_logo}
                  placeholder="Your Email Address"
                  type="email"
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
                        placeholder="Create a Strong Password"
                        className="passwordField"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <img
                        loading="lazy"
                        src={password_eye}
                        alt={showPassword ? "Hide password" : "Show password"}
                        className="visibilityIcon"
                        onClick={togglePasswordVisibility}
                        tabIndex="0"
                        role="button"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="loginLink">
              <p>
                Already have an account?{" "}
                <a href="/signin" style={{ color: "#a63e71" }}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        <button
          type="button"
          onClick={() => navigate("/genre", { state: { formData } })}
          className="signUpButton"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
