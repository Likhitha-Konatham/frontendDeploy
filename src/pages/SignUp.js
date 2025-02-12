import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import book_logo from "../images/vector_booklogo.svg";
import fullname_logo from "../images/fullname_logo.svg";
import message_logo from "../images/message_logo.svg";
import password_eye from "../images/password_eye.svg";
import lock_logo from "../images/lock_logo.svg";
import { sendOTP, validateOTP } from "../services/AllServices";
import upload_icon from "../images/upload_icon.svg";

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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    genre: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [enteredOTP, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingResendOTP, setLoadingResendOTP] = useState(false);
  const [loadingVerifyOTP, setLoadingVerifyOTP] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!isChecked) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);
    setLoadingResendOTP(true);
    setEmailError("");
    try {
      const response = await sendOTP(formData);
      if (
        response.detail ===
        "Email already registered. Please use a different email address."
      ) {
        setEmailError(response.detail);
      } else if (response.status === "success") {
        setIsPopupOpen(true);
        setErrorMessage("");
      } else {
        setErrorMessage(response.message || "Failed to send OTP.");
      }
    } catch (error) {
      if (
        error.response?.data?.detail ===
        "Email already registered. Please use a different email address."
      ) {
        setEmailError(
          "Email already registered. Please use a different email address or log in."
        );
      } else {
        setErrorMessage("An error occurred while sending the OTP.");
      }
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingResendOTP(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoadingVerifyOTP(true);
    try {
      const response = await validateOTP({
        email: formData.email,
        enteredOTP,
      });
      if (response.status === "success") {
        navigate("/genre", { state: { formData } });
      } else {
        setErrorMessage(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during OTP validation.");
      console.error(error);
    } finally {
      setLoadingVerifyOTP(false);
    }
  };

  return (
    <div className="signup-page">
      <header className="header">
        <a href="/" className="header-left-section">
          <img src={book_logo} alt="book logo" className="book-logo-icon" />
        </a>
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
              <div className="heading-text-wrapper">Sign up</div>
            </div>
          </div>

          <form className="signup-form" onSubmit={handleSignUpClick}>
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
                <div className="inputfield-wrapper">
                  <div className="inputfield-container">
                    <div className="inputfield-content">
                      <img
                        loading="lazy"
                        src={upload_icon}
                        alt=""
                        className="inputfield-icon"
                      />
                      <label
                        htmlFor="udidUpload"
                        className="custom-file-label"
                        aria-label="UDID Upload"
                      >
                        {formData.udidFile
                          ? formData.udidFile.name
                          : "UDID Upload"}
                      </label>
                      <input
                        type="file"
                        id="udidUpload"
                        className="hidden-file-input"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            udidFile: e.target.files[0],
                          })
                        }
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

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
                        required
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

            {emailError && (
              <p className="signup-error-email" style={{ color: "red" }}>
                {emailError}
              </p>
            )}
            <div className="Agree_tc">
              <input
                type="checkbox"
                id="agree_tc"
                style={{
                  marginTop: "0vw",
                  cursor: "pointer",
                }}
                checked={isChecked}
                onChange={handleCheckboxChange}
                required
              />
              <label
                htmlFor="agree_tc"
                style={{ color: "black", marginLeft: "0.5vw" }}
              >
                I agree to the terms and conditions
              </label>
            </div>
            <div className="signup-loginLink">
              <p>
                Already have an account?{" "}
                <a href="/signin" style={{ color: "#a63e71" }}>
                  Login
                </a>
              </p>
            </div>

            <button type="submit" className="signUpButton" disabled={loading}>
              {loading ? "Sending..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>

      {isPopupOpen && (
        <>
          <div className="popup-overlay"></div>
          <div className="otp-popup">
            <div className="otp-popup-content">
              <button
                className="close-popup-button"
                onClick={() => setIsPopupOpen(false)}
                aria-label="Close Popup"
              >
                &times;
              </button>
              <h2>Email Verification</h2>
              <p>
                An email has been sent to <strong>{formData.email}</strong>.
                Please enter the OTP below to verify your account.
              </p>
              <input
                type="text"
                placeholder="Enter OTP"
                className="otp-input"
                value={enteredOTP}
                onChange={handleOtpChange}
                required
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="otp-buttons">
                <button
                  onClick={handleSignUpClick}
                  className="otp-submit-button"
                  disabled={loadingResendOTP}
                >
                  {loadingResendOTP ? "Resending..." : "Resend OTP"}
                </button>
                <button
                  onClick={handleOtpSubmit}
                  className="otp-submit-button"
                  disabled={loadingVerifyOTP}
                >
                  {loadingVerifyOTP ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
