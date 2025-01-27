import React, { useState } from "react";
import "../styles/SignIn.css";
import book_logo from "../images/vector_booklogo.svg";
import message_logo from "../images/message_logo.svg";
import password_eye from "../images/password_eye.svg";
import lock_logo from "../images/lock_logo.svg";
import { loginUser } from "../services/AllServices";
import leftArrow from "../images/left_arrow.png";
import rightArrow from "../images/right_arrow.png";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

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
        window.location.href = "/dashboard";
      } else {
        setErrorMessage(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while logging in. Please try again later."
      );
    } finally {
      setIsLoading(false);
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

          <form className="signup-form" onSubmit={handleNext}>
            <div className="signup-form-group">
              <div className="signup-input-fields">
                <div className="inputfield-wrapper">
                  <div className="inputfield-container">
                    <div className="inputfield-content">
                      <img
                        loading="lazy"
                        src={message_logo}
                        alt=""
                        className="inputfield-icon"
                      />
                      <input
                        type="email"
                        id="email"
                        placeholder="Your Email Address"
                        className="inputfield-inside"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        aria-label="Your Email Address"
                      />
                    </div>
                  </div>
                </div>

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
                        placeholder="Password"
                        className="passwordField"
                        aria-label="Password"
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

            <div className="forgot-password-div">
              <p>
                <a href="/forgot-password" style={{ color: "#a63e71" }} onClick>
                  Forgot Password
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="signin-signUpButton"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;

// import React, { useState } from "react";
// import "../styles/SignIn.css";
// import book_logo from "../images/vector_booklogo.svg";
// import message_logo from "../images/message_logo.svg";
// import password_eye from "../images/password_eye.svg";
// import lock_logo from "../images/lock_logo.svg";
// import { loginUser, sendOTP, validateOTP } from "../services/AllServices";
// import leftArrow from "../images/left_arrow.png";
// import rightArrow from "../images/right_arrow.png";
// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpErrorMessage, setOtpErrorMessage] = useState("");
//   const [loadingVerifyOTP, setLoadingVerifyOTP] = useState(false);
//   const [loadingResendOTP, setLoadingResendOTP] = useState(false);

//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const handleNext = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");

//     const loginData = {
//       email: formData.email,
//       password: formData.password,
//     };

//     try {
//       const response = await loginUser(loginData);
//       if (response && response.status === "success") {
//         localStorage.setItem("access_token", response.data.access_token);
//         window.location.href = "/dashboard";
//       } else {
//         setErrorMessage(response.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       setErrorMessage(
//         "An error occurred while logging in. Please try again later."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const handleForgotPassword = async () => {
//   //   setErrorMessage("");
//   //   try {
//   //     const response = await sendOTP({ email: formData.email });
//   //     if (response.status === "success") {
//   //       setIsPopupOpen(true);
//   //       setOtpErrorMessage("");
//   //     } else {
//   //       setErrorMessage(response.message || "Failed to send OTP.");
//   //     }
//   //   } catch (error) {
//   //     setErrorMessage("An error occurred while sending the OTP.");
//   //   }
//   // };
//   const handleForgotPassword = async () => {
//     // Check if email is entered
//     if (!formData.email.trim()) {
//       setErrorMessage("Please enter your email address to proceed.");
//       return;
//     }

//     setErrorMessage(""); // Clear previous error messages
//     try {
//       const response = await sendOTP({ email: formData.email });
//       console.log("sendotp res:", response);
//       if (response.status === "success") {
//         setIsPopupOpen(true);
//         setOtpErrorMessage("");
//       } else {
//         setErrorMessage(response.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred while sending the OTP.");
//     }
//   };

//   const handleOtpSubmit = async () => {
//     setLoadingVerifyOTP(true);
//     setOtpErrorMessage("");
//     try {
//       const response = await validateOTP({ email: formData.email, otp });
//       if (response.status === "success") {
//         navigate("/forgot-password", { state: { email: formData.email } });
//       } else {
//         setOtpErrorMessage(
//           response.message || "Invalid OTP. Please try again."
//         );
//       }
//     } catch (error) {
//       setOtpErrorMessage("An error occurred during OTP validation.");
//     } finally {
//       setLoadingVerifyOTP(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoadingResendOTP(true);
//     try {
//       const response = await sendOTP({ email: formData.email });
//       if (response.status === "success") {
//         setOtpErrorMessage("OTP resent successfully.");
//       } else {
//         setOtpErrorMessage(response.message || "Failed to resend OTP.");
//       }
//     } catch (error) {
//       setOtpErrorMessage("An error occurred while resending the OTP.");
//     } finally {
//       setLoadingResendOTP(false);
//     }
//   };

//   return (
//     <main className="signup-page">
//       <header className="header">
//         <div className="header-left-section">
//           <img src={book_logo} alt="book logo" className="book-logo-icon" />
//           <img src={leftArrow} alt="Left Arrow" className="left-arrow-icon" />
//           <img
//             src={rightArrow}
//             alt="Right Arrow"
//             className="right-arrow-icon"
//           />
//         </div>
//       </header>
//       <div className="signup-container">
//         <div className="signup-form">
//           <div className="booklogo-heading">
//             <img
//               className="booklogo-img"
//               alt="site logo of book"
//               src={book_logo}
//             />
//             <div className="booklogo-heading-text">
//               <div className="heading-text-wrapper">Login</div>
//             </div>
//           </div>

//           <form className="signup-form" onSubmit={handleNext}>
//             <div className="signup-form-group">
//               <div className="signup-input-fields">
//                 <div className="inputfield-wrapper">
//                   <div className="inputfield-container">
//                     <div className="inputfield-content">
//                       <img
//                         src={message_logo}
//                         alt=""
//                         className="inputfield-icon"
//                       />
//                       <input
//                         type="email"
//                         id="email"
//                         placeholder="Your Email Address"
//                         className="inputfield-inside"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="passwordInputWrapper">
//                   <div className="passwordInputContainer">
//                     <div className="passwordInputContent">
//                       <img src={lock_logo} alt="" className="passwordIcon" />
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         id="password"
//                         placeholder="Password"
//                         className="passwordField"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       <img
//                         src={password_eye}
//                         alt={showPassword ? "Hide password" : "Show password"}
//                         className="visibilityIcon"
//                         onClick={togglePasswordVisibility}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {errorMessage && (
//               <div className="signin-error-message">{errorMessage}</div>
//             )}
//             <div className="signin-loginLink">
//               <p>
//                 Don't have an Account?{" "}
//                 <a href="/signup" style={{ color: "#a63e71" }}>
//                   Sign Up
//                 </a>
//               </p>
//             </div>

//             <div className="forgot-password-div">
//               <p>
//                 <a
//                   href="#"
//                   style={{ color: "#a63e71" }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleForgotPassword();
//                   }}
//                 >
//                   Forgot Password
//                 </a>
//               </p>
//             </div>

//             <button
//               type="submit"
//               className="signin-signUpButton"
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {isPopupOpen && (
//         <>
//           <div className="popup-overlay"></div>
//           <div className="otp-popup">
//             <div className="otp-popup-content">
//               <button
//                 className="close-popup-button"
//                 onClick={() => setIsPopupOpen(false)}
//               >
//                 &times;
//               </button>
//               <h2>OTP Verification</h2>
//               <p>
//                 An email has been sent to <strong>{formData.email}</strong>.
//                 Please enter the OTP below to verify.
//               </p>
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//               {otpErrorMessage && (
//                 <p className="error-message">{otpErrorMessage}</p>
//               )}
//               <div className="otp-buttons">
//                 <button
//                   onClick={handleResendOTP}
//                   disabled={loadingResendOTP}
//                   className="otp-submit-button"
//                 >
//                   {loadingResendOTP ? "Resending..." : "Resend OTP"}
//                 </button>
//                 <button
//                   onClick={handleOtpSubmit}
//                   disabled={loadingVerifyOTP}
//                   className="otp-submit-button"
//                 >
//                   {loadingVerifyOTP ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </main>
//   );
// };

// export default SignIn;
