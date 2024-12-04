// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/SignUp.css";
// // import book_logo from "../images/vector_booklogo.svg";
// // import fullname_logo from "../images/fullname_logo.svg";
// // import message_logo from "../images/message_logo.svg";
// // import password_eye from "../images/password_eye.svg";
// // import lock_logo from "../images/lock_logo.svg";
// // import leftArrow from "../images/left_arrow.png";
// // import rightArrow from "../images/right_arrow.png";
// // import { sendOTP, validateOTP } from "../services/AllServices";

// // const SignUp = () => {
// //   const [isChecked, setIsChecked] = useState(false);
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     email: "",
// //     password: "",
// //     genre: [],
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isPopupOpen, setIsPopupOpen] = useState(false);
// //   const [enteredOTP, setOtp] = useState("");
// //   const [emailError, setEmailError] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [loadingResendOTP, setLoadingResendOTP] = useState(false);
// //   const [loadingVerifyOTP, setLoadingVerifyOTP] = useState(false);

// //   const navigate = useNavigate();

// //   const togglePasswordVisibility = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   const handleInputChange = (e) => {
// //     const { id, value } = e.target;
// //     setFormData({ ...formData, [id]: value });
// //   };

// //   const handleOtpChange = (e) => {
// //     setOtp(e.target.value);
// //   };

// //   const handleCheckboxChange = (e) => {
// //     setIsChecked(e.target.checked);
// //   };

// //   const handleSignUpClick = async (e) => {
// //     e.preventDefault();

// //     if (!isChecked) {
// //       // You might want to replace this with a more React-friendly approach
// //       // like setting a state that triggers a tooltip/error message
// //       return;
// //     }

// //     setLoading(true);
// //     setLoadingResendOTP(true);
// //     setEmailError("");
// //     try {
// //       const response = await sendOTP(formData);
// //       if (
// //         response.detail ===
// //         "Email already registered. Please use a different email address."
// //       ) {
// //         setEmailError(response.detail);
// //       } else if (response.status === "success") {
// //         setIsPopupOpen(true);
// //         setErrorMessage("");
// //       } else {
// //         setErrorMessage(response.message || "Failed to send OTP.");
// //       }
// //     } catch (error) {
// //       if (
// //         error.response?.data?.detail ===
// //         "Email already registered. Please use a different email address."
// //       ) {
// //         setEmailError(
// //           "Email already registered. Please use a different email address or log in."
// //         );
// //       } else {
// //         setErrorMessage("An error occurred while sending the OTP.");
// //       }
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //       setLoadingResendOTP(false);
// //     }
// //   };

// //   const handleOtpSubmit = async () => {
// //     setLoadingVerifyOTP(true);
// //     try {
// //       const response = await validateOTP({
// //         email: formData.email,
// //         enteredOTP,
// //       });
// //       if (response.status === "success") {
// //         navigate("/genre", { state: { formData } });
// //       } else {
// //         setErrorMessage(response.message || "Invalid OTP. Please try again.");
// //       }
// //     } catch (error) {
// //       setErrorMessage("An error occurred during OTP validation.");
// //       console.error(error);
// //     } finally {
// //       setLoadingVerifyOTP(false);
// //     }
// //   };

// //   return (
// //     <div className="signup-page">
// //       <header className="header">
// //         <div className="header-left-section">
// //           <img src={book_logo} alt="book logo" className="book-logo-icon" />
// //           <img src={leftArrow} alt="Left Arrow" className="left-arrow-icon" />
// //           <img
// //             src={rightArrow}
// //             alt="Right Arrow"
// //             className="right-arrow-icon"
// //           />
// //         </div>
// //       </header>
// //       <div className="signup-container">
// //         <div className="signup-form">
// //           <div className="booklogo-heading">
// //             <img
// //               className="booklogo-img"
// //               alt="site logo of book"
// //               src={book_logo}
// //             />
// //             <div className="booklogo-heading-text">
// //               <div className="heading-text-wrapper">Let's get Started</div>
// //             </div>
// //           </div>

// //           <form className="signup-form" onSubmit={handleSignUpClick} noValidate>
// //             <div className="signup-form-group">
// //               <div className="signup-input-fields">
// //                 <div className="inputfield-wrapper">
// //                   <div className="inputfield-container">
// //                     <div className="inputfield-content">
// //                       <img loading="lazy" src={fullname_logo} alt="" className="inputfield-icon" />
// //                       <input
// //                         type="text"
// //                         id="firstName"
// //                         placeholder="Your Full Name"
// //                         className="inputfield-inside"
// //                         value={formData.firstName}
// //                         onChange={handleInputChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="inputfield-wrapper">
// //                   <div className="inputfield-container">
// //                     <div className="inputfield-content">
// //                       <img loading="lazy" src={message_logo} alt="" className="inputfield-icon" />
// //                       <input
// //                         type="email"
// //                         id="email"
// //                         placeholder="Your Email Address"
// //                         className="inputfield-inside"
// //                         value={formData.email}
// //                         onChange={handleInputChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="passwordInputWrapper">
// //                   <div className="passwordInputContainer">
// //                     <div className="passwordInputContent">
// //                       <img
// //                         loading="lazy"
// //                         src={lock_logo}
// //                         alt=""
// //                         className="passwordIcon"
// //                       />
// //                       <input
// //                         type={showPassword ? "text" : "password"}
// //                         id="password"
// //                         placeholder="Create a Strong Password"
// //                         className="passwordField"
// //                         value={formData.password}
// //                         onChange={handleInputChange}
// //                         required
// //                       />
// //                       <img
// //                         loading="lazy"
// //                         src={password_eye}
// //                         alt={showPassword ? "Hide password" : "Show password"}
// //                         className="visibilityIcon"
// //                         onClick={togglePasswordVisibility}
// //                         tabIndex="0"
// //                         role="button"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {emailError && (
// //               <p className="signup-error-email" style={{ color: "red" }}>
// //                 {emailError}
// //               </p>
// //             )}
// //             <div className="Agree_tc">
// //               <input
// //                 type="checkbox"
// //                 id="agree_tc"
// //                 style={{
// //                   marginTop: "0vw",
// //                   cursor: "pointer",
// //                 }}
// //                 checked={isChecked}
// //                 onChange={handleCheckboxChange}
// //                 required
// //               />
// //               <label
// //                 htmlFor="agree_tc"
// //                 style={{ color: "black", marginLeft: "0.5vw" }}
// //               >
// //                 I agree to the terms and conditions
// //               </label>
// //             </div>
// //             <div className="signup-loginLink">
// //               <p>
// //                 Already have an account?{" "}
// //                 <a href="/signin" style={{ color: "#a63e71" }}>
// //                   Login
// //                 </a>
// //               </p>
// //             </div>

// //             <button
// //               type="submit"
// //               className="signUpButton"
// //               disabled={loading}
// //             >
// //               {loading ? "Sending..." : "Sign up"}
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //       {/* Rest of the OTP popup remains the same */}
// //       {isPopupOpen && (
// //         <>
// //           <div className="popup-overlay"></div>
// //           <div className="otp-popup">
// //             <div className="otp-popup-content">
// //               <button
// //                 className="close-popup-button"
// //                 onClick={() => setIsPopupOpen(false)}
// //                 aria-label="Close Popup"
// //               >
// //                 &times;
// //               </button>
// //               <h2>Email Verification</h2>
// //               <p>
// //                 An email has been sent to <strong>{formData.email}</strong>.
// //                 Please enter the OTP below to verify your account.
// //               </p>
// //               <input
// //                 type="text"
// //                 placeholder="Enter OTP"
// //                 className="otp-input"
// //                 value={enteredOTP}
// //                 onChange={handleOtpChange}
// //                 required
// //               />
// //               {errorMessage && <p className="error-message">{errorMessage}</p>}
// //               <div className="otp-buttons">
// //                 <button
// //                   onClick={handleSignUpClick}
// //                   className="otp-submit-button"
// //                   disabled={loadingResendOTP}
// //                 >
// //                   {loadingResendOTP ? "Resending..." : "Resend OTP"}
// //                 </button>
// //                 <button
// //                   onClick={handleOtpSubmit}
// //                   className="otp-submit-button"
// //                   disabled={loadingVerifyOTP}
// //                 >
// //                   {loadingVerifyOTP ? "Verifying..." : "Verify OTP"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default SignUp;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/SignUp.css";
// import book_logo from "../images/vector_booklogo.svg";
// import fullname_logo from "../images/fullname_logo.svg";
// import message_logo from "../images/message_logo.svg";
// import password_eye from "../images/password_eye.svg";
// import lock_logo from "../images/lock_logo.svg";
// import leftArrow from "../images/left_arrow.png";
// import rightArrow from "../images/right_arrow.png";
// import { sendOTP, validateOTP } from "../services/AllServices";

// // const InputField = ({ icon, placeholder, type, id, value, onChange }) => (
// //   <div className="inputfield-wrapper">
// //     <div className="inputfield-container">
// //       <div className="inputfield-content">
// //         <img loading="lazy" src={icon} alt="" className="inputfield-icon" />
// //         <input
// //           type={type}
// //           id={id}
// //           placeholder={placeholder}
// //           className="inputfield-inside"
// //           value={value}
// //           onChange={onChange}
// //           required
// //           aria-label={placeholder}
// //         />
// //       </div>
// //     </div>
// //   </div>
// // );
// const InputField = ({
//   icon,
//   placeholder,
//   type,
//   id,
//   value,
//   onChange,
//   error,
// }) => (
//   <div className="inputfield-wrapper">
//     <div className="inputfield-container">
//       <div className="inputfield-content">
//         <img loading="lazy" src={icon} alt="" className="inputfield-icon" />
//         <input
//           type={type}
//           id={id}
//           placeholder={error || placeholder} // Show error or placeholder dynamically
//           className={`inputfield-inside ${error ? "error-border" : ""}`}
//           value={value}
//           onChange={onChange}
//           style={{
//             "--placeholder-color": error ? "red" : "#999", // Placeholder color
//           }}
//           required
//           aria-label={placeholder}
//         />
//       </div>
//     </div>
//   </div>
// );

// const SignUp = () => {
//   const [isChecked, setIsChecked] = useState(false);

//   // Function to handle checkbox change
//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const [formData, setFormData] = useState({
//     firstName: "",
//     email: "",
//     password: "",
//     genre: [],
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [enteredOTP, setOtp] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingResendOTP, setLoadingResendOTP] = useState(false); // Loading state for Resend OTP
//   const [loadingVerifyOTP, setLoadingVerifyOTP] = useState(false);

//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   // const handleResendOtp = () => {
//   //   setLoading(true); // Optional: show loading state if needed
//   //   // Add your resend OTP logic here (e.g., API call)
//   //   setTimeout(() => {
//   //     setLoading(false);
//   //   }, 2000); // Simulate an API call
//   // };

//   const validateFields = () => {
//     const errors = {};
//     if (!formData.firstName) errors.firstName = "Field required";
//     if (!formData.email) errors.email = "Field required";
//     if (!formData.password) errors.password = "Field required";
//     if (!isChecked) errors.terms = "You must agree to the terms";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0; // Return true if no errors
//   };

//   const [formErrors, setFormErrors] = useState({}); // State to store errors

//   const handleSignUpClick = async () => {
//     setFormErrors({}); // Reset errors
//     if (!validateFields()) return; // Stop submission if validation fails

//     setLoading(true);
//     setLoadingResendOTP(true);
//     setEmailError("");
//     try {
//       const response = await sendOTP(formData);
//       if (
//         response.detail ===
//         "Email already registered. Please use a different email address."
//       ) {
//         setEmailError(response.detail);
//       } else if (response.status === "success") {
//         setIsPopupOpen(true);
//         setErrorMessage("");
//       } else {
//         setErrorMessage(response.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       if (
//         error.response?.data?.detail ===
//         "Email already registered. Please use a different email address."
//       ) {
//         setEmailError(
//           "Email already registered. Please use a different email address or log in."
//         );
//       } else {
//         setErrorMessage("An error occurred while sending the OTP.");
//       }
//       console.error(error);
//     } finally {
//       setLoading(false);
//       setLoadingResendOTP(false);
//     }
//   };

//   // const handleSignUpClick = async () => {
//   //   setLoading(true);
//   //   setEmailError("");
//   //   try {
//   //     const response = await sendOTP(formData);
//   //     if (
//   //       response.detail ===
//   //       "Email already registered. Please use a different email address."
//   //     ) {
//   //       setEmailError(response.detail);
//   //     } else if (response.status === "success") {
//   //       setIsPopupOpen(true);
//   //       setErrorMessage("");
//   //     } else {
//   //       setErrorMessage(response.message || "Failed to send OTP.");
//   //     }
//   //   } catch (error) {
//   //     if (
//   //       error.response?.data?.detail ===
//   //       "Email already registered. Please use a different email address."
//   //     ) {
//   //       setEmailError(
//   //         "Email already registered. Please use a different email address or log in."
//   //       );
//   //     } else {
//   //       setErrorMessage("An error occurred while sending the OTP.");
//   //     }
//   //     console.error(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleOtpSubmit = async () => {
//     setLoadingVerifyOTP(true);
//     try {
//       const response = await validateOTP({
//         email: formData.email,
//         enteredOTP,
//       });
//       if (response.status === "success") {
//         navigate("/genre", { state: { formData } });
//       } else {
//         setErrorMessage(response.message || "Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred during OTP validation.");
//       console.error(error);
//     } finally {
//       setLoadingVerifyOTP(false);
//     }
//   };

//   return (
//     <div className="signup-page">
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
//               <div className="heading-text-wrapper">Let's get Started</div>
//             </div>
//           </div>

//           <form className="signup-form">
//             <div className="signup-form-group">
//               <div className="signup-input-fields">
//                 <InputField
//                   icon={fullname_logo}
//                   placeholder="Your Full Name"
//                   type="text"
//                   id="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   error={formErrors.firstName}
//                   required // Pass error for validation
//                 />
//                 <InputField
//                   icon={message_logo}
//                   placeholder="Your Email Address"
//                   type="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   error={formErrors.email}
//                   required // Pass error for validation
//                 />
//                 <div className="passwordInputWrapper">
//                   <div className="passwordInputContainer">
//                     <div className="passwordInputContent">
//                       <img
//                         loading="lazy"
//                         src={lock_logo}
//                         alt=""
//                         className="passwordIcon"
//                       />
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         id="password"
//                         placeholder={
//                           formErrors.password || "Create a Strong Password"
//                         } // Dynamic placeholder
//                         className={`passwordField ${
//                           formErrors.password ? "error-border" : ""
//                         }`}
//                         value={formData.password}
//                         onChange={handleInputChange}
//                       />
//                       <img
//                         loading="lazy"
//                         src={password_eye}
//                         alt={showPassword ? "Hide password" : "Show password"}
//                         className="visibilityIcon"
//                         onClick={togglePasswordVisibility}
//                         tabIndex="0"
//                         role="button"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {emailError && (
//               <p className="signup-error-email" style={{ color: "red" }}>
//                 {emailError}
//               </p>
//             )}
//             <div className="Agree_tc">
//               <input
//                 type="checkbox"
//                 id="agree_tc"
//                 style={{
//                   marginTop: "0vw",
//                   cursor: "pointer",
//                 }}
//                 checked={isChecked}
//                 onChange={handleCheckboxChange}
//               />
//               <label
//                 htmlFor="agree_tc"
//                 style={{ color: "black", marginLeft: "0.5vw" }}
//               >
//                 I agree to the terms and conditions
//               </label>
//             </div>
//             {formErrors.terms && ( // Display the error message if terms validation fails
//               <p className="signup-error-terms" style={{ color: "red" }}>
//                 {formErrors.terms}
//               </p>
//             )}
//             <div className="signup-loginLink">
//               <p>
//                 Already have an account?{" "}
//                 <a href="/signin" style={{ color: "#a63e71" }}>
//                   Login
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>

//         <button
//           type="button"
//           onClick={handleSignUpClick}
//           className="signUpButton"
//           disabled={loading}
//         >
//           {loading ? "Sending..." : "Sign up"}
//         </button>
//       </div>

//       {/* {isPopupOpen && (
//         <>
//           <div className="popup-overlay"></div>
//           <div className="otp-popup">
//             <div className="otp-popup-content">
//               <button
//                 className="close-popup-button"
//                 onClick={() => setIsPopupOpen(false)}
//                 aria-label="Close Popup"
//               >
//                 &times;
//               </button>
//               <h2>Email Verification</h2>
//               <p>
//                 An email has been sent to <strong>{formData.email}</strong>.
//                 Please enter the OTP below to verify your account.
//               </p>
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 className="otp-input"
//                 value={enteredOTP}
//                 onChange={handleOtpChange}
//               />
//               {errorMessage && <p className="error-message">{errorMessage}</p>}
//               <button
//                 onClick={handleOtpSubmit}
//                 className="otp-submit-button"
//                 disabled={loading}
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>
//             </div>
//           </div>
//         </>
//       )} */}

//       {isPopupOpen && (
//         <>
//           <div className="popup-overlay"></div>
//           <div className="otp-popup">
//             <div className="otp-popup-content">
//               <button
//                 className="close-popup-button"
//                 onClick={() => setIsPopupOpen(false)}
//                 aria-label="Close Popup"
//               >
//                 &times;
//               </button>
//               <h2>Email Verification</h2>
//               <p>
//                 An email has been sent to <strong>{formData.email}</strong>.
//                 Please enter the OTP below to verify your account.
//               </p>
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 className="otp-input"
//                 value={enteredOTP}
//                 onChange={handleOtpChange}
//               />
//               {errorMessage && <p className="error-message">{errorMessage}</p>}
//               <div className="otp-buttons">
//                 <button
//                   onClick={handleSignUpClick}
//                   className="otp-submit-button"
//                   disabled={loadingResendOTP}
//                 >
//                   {loadingResendOTP ? "Resending..." : "Resend OTP"}
//                 </button>
//                 <button
//                   onClick={handleOtpSubmit}
//                   className="otp-submit-button"
//                   disabled={loadingVerifyOTP}
//                 >
//                   {loadingVerifyOTP ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SignUp;

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
        window.location.href = "/dashboard";
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
