// // import React, { useState, useEffect } from "react";
// // import "../styles/AccountSection.css";
// // import {
// //   InputField,
// //   PhoneInput,
// //   CityField,
// //   SelectField,
// // } from "./AccountComponents.js";
// // import account_pfp from "../images/account_pfp.png";
// // import { fetchProfile, getCountries, getStates } from "../services/AllServices";

// // const AccountSection = () => {
// //   const [profile, setProfile] = useState({
// //     firstname: "",
// //     lastname: "",
// //     email: "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     country: "",
// //     state: "",
// //   });

// //   const [isEditable, setIsEditable] = useState(false);
// //   const [countries, setCountries] = useState([]); // List of countries
// //   const [states, setStates] = useState([]); // List of states for selected country

// //   // Fetch profile details on component mount
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Fetch user profile
// //         const response = await fetchProfile();
// //         const {
// //           firstname,
// //           lastname,
// //           email,
// //           phone,
// //           address,
// //           city,
// //           country,
// //           state,
// //         } = response.data;

// //         setProfile({
// //           firstname,
// //           lastname,
// //           email,
// //           phone,
// //           address,
// //           city,
// //           country,
// //           state,
// //         });

// //         // Fetch countries
// //         const countriesResponse = await getCountries();
// //         setCountries(countriesResponse.data);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Fetch states when country changes
// //   useEffect(() => {
// //     if (profile.country) {
// //       const fetchStates = async () => {
// //         try {
// //           const statesResponse = await getStates(profile.country);
// //           setStates(statesResponse.data);
// //         } catch (error) {
// //           console.error("Error fetching states:", error);
// //         }
// //       };

// //       fetchStates();
// //     }
// //   }, [profile.country]);

// //   const handleInputChange = (field, value) => {
// //     setProfile((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }));
// //   };

// //   const handleUpdateClick = () => {
// //     if (isEditable) {
// //       console.log("Updated profile:", profile); // Send to API if necessary
// //     }
// //     setIsEditable(!isEditable);
// //   };

// //   return (
// //     <div className="settings-accountSection">
// //       <div className="settings-formSection">
// //         <form className="settings-inputFields">
// //           <InputField
// //             label="First Name"
// //             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d91679b1a34eb5f5d3a9d9189173be4341bab3d8cafb2fbfdd377d5f92d1f6a5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
// //             value={profile.firstname}
// //             editable={isEditable}
// //             placeholder="Update First Name"
// //             onChange={(e) => handleInputChange("firstname", e.target.value)}
// //           />
// //           <InputField
// //             label="Last Name"
// //             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d91679b1a34eb5f5d3a9d9189173be4341bab3d8cafb2fbfdd377d5f92d1f6a5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
// //             value={profile.lastname}
// //             editable={isEditable}
// //             placeholder="Update Last Name"
// //             onChange={(e) => handleInputChange("lastname", e.target.value)}
// //           />
// //           <InputField
// //             label="Email"
// //             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/e29ef37c58780e5cd8ee2986297041a310e893fe82c262a872c641b0392efceb?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
// //             value={profile.email}
// //             editable={isEditable}
// //             placeholder="Update Email"
// //             onChange={(e) => handleInputChange("email", e.target.value)}
// //             type="email"
// //           />
// //           <PhoneInput
// //             value={profile.phone}
// //             editable={isEditable}
// //             placeholder="Update Phone Number"
// //             onChange={(e) => handleInputChange("phone", e.target.value)}
// //           />
// //           <InputField
// //             label="Address"
// //             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/b091961851e79cde67f245be388279a07ffb670efa44b1323cca629ecbc0e41c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
// //             value={profile.address}
// //             editable={isEditable}
// //             placeholder="Update Address"
// //             onChange={(e) => handleInputChange("address", e.target.value)}
// //           />
// //           <CityField
// //             label="City"
// //             value={profile.city}
// //             editable={isEditable}
// //             placeholder="Update City"
// //             onChange={(e) => handleInputChange("city", e.target.value)}
// //           />
// //           <section className="settings-city-selectorContainer">
// //             <SelectField
// //               label="Country"
// //               value={profile.country}
// //               editable={isEditable}
// //               placeholder="Update Country"
// //               iconSrc="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/92f4cbd241b1e3b6a60b7cf89795a6d16f5b548ceabce6d988518cc7a7eefb3c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
// //               options={countries}
// //               onChange={(selectedCountry) => {
// //                 handleInputChange("country", selectedCountry);
// //                 handleInputChange("state", ""); // Reset state when country changes
// //               }}
// //             />
// //             <SelectField
// //               label="State"
// //               value={profile.state}
// //               placeholder="Update State"
// //               editable={isEditable}
// //               iconSrc="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/16af09298139f26b39c29e840d7dec61a10fcc30926ce43a906849901322e2b5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
// //               options={states}
// //               onChange={(selectedState) =>
// //                 handleInputChange("state", selectedState)
// //               }
// //             />
// //           </section>
// //           <button
// //             type="button"
// //             className="settings-update-button"
// //             onClick={handleUpdateClick}
// //           >
// //             {isEditable ? "Save" : "Update"}
// //           </button>
// //         </form>
// //       </div>
// //       <div className="settings-imageSection">
// //         <img src={account_pfp} alt="Profile" />
// //       </div>
// //     </div>
// //   );
// // };

// // export default AccountSection;

// import React, { useState, useEffect } from "react";
// import "../styles/AccountSection.css";
// import {
//   InputField,
//   PhoneInput,
//   CityField,
//   SelectField,
// } from "./AccountComponents.js";
// import account_pfp from "../images/account_pfp.png";
// import {
//   fetchProfile,
//   getCountries,
//   getStates,
//   updateProfile,
// } from "../services/AllServices";

// const AccountSection = () => {
//   const [profile, setProfile] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     country: "",
//     state: "",
//   });

//   const [isEditable, setIsEditable] = useState(false);
//   const [countries, setCountries] = useState([]); // List of countries
//   const [states, setStates] = useState([]); // List of states for selected country

//   // Fetch profile details on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch user profile
//         const response = await fetchProfile();
//         const {
//           firstname,
//           lastname,
//           email,
//           phone,
//           address,
//           city,
//           country,
//           state,
//         } = response.data;

//         setProfile({
//           firstname,
//           lastname,
//           email,
//           phone,
//           address,
//           city,
//           country,
//           state,
//         });

//         // Fetch countries
//         const countriesResponse = await getCountries();
//         setCountries(countriesResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fetch states when country changes
//   useEffect(() => {
//     if (profile.country) {
//       const fetchStates = async () => {
//         try {
//           const statesResponse = await getStates(profile.country);
//           setStates(statesResponse.data);
//         } catch (error) {
//           console.error("Error fetching states:", error);
//         }
//       };

//       fetchStates();
//     }
//   }, [profile.country]);

//   const handleInputChange = (field, value) => {
//     setProfile((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleUpdateClick = async () => {
//     // if (isEditable) {
//     //   console.log("Updated profile:", profile); // Send to API if necessary
//     // }
//     // setIsEditable(!isEditable);
//     if (isEditable) {
//       try {
//         // Call the updateProfile API
//         const response = await updateProfile(profile);
//         console.log("Profile updated successfully:", response);

//         // Optional: Provide user feedback for successful update
//         alert("Profile updated successfully!");
//       } catch (error) {
//         console.error("Error updating profile:", error);

//         // Optional: Provide user feedback for failed update
//         alert("Failed to update profile. Please try again.");
//       }
//     }
//     setIsEditable(!isEditable);
//   };

//   return (
//     <div className="settings-accountSection">
//       <div className="settings-formSection">
//         <form className="settings-inputFields">
//           <InputField
//             label="First Name"
//             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d91679b1a34eb5f5d3a9d9189173be4341bab3d8cafb2fbfdd377d5f92d1f6a5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//             value={profile.firstname}
//             editable={isEditable}
//             placeholder="Update First Name"
//             onChange={(e) => handleInputChange("firstname", e.target.value)}
//           />
//           <InputField
//             label="Last Name"
//             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d91679b1a34eb5f5d3a9d9189173be4341bab3d8cafb2fbfdd377d5f92d1f6a5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//             value={profile.lastname}
//             editable={isEditable}
//             placeholder="Update Last Name"
//             onChange={(e) => handleInputChange("lastname", e.target.value)}
//           />
//           <InputField
//             label="Email"
//             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/e29ef37c58780e5cd8ee2986297041a310e893fe82c262a872c641b0392efceb?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//             value={profile.email}
//             editable={isEditable}
//             placeholder="Update Email"
//             onChange={(e) => handleInputChange("email", e.target.value)}
//             type="email"
//           />
//           <PhoneInput
//             value={profile.phone}
//             editable={isEditable}
//             placeholder="Update Phone Number"
//             onChange={(e) => handleInputChange("phone", e.target.value)}
//           />
//           <InputField
//             label="Address"
//             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/b091961851e79cde67f245be388279a07ffb670efa44b1323cca629ecbc0e41c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//             value={profile.address}
//             editable={isEditable}
//             placeholder="Update Address"
//             onChange={(e) => handleInputChange("address", e.target.value)}
//           />
//           <CityField
//             label="City"
//             value={profile.city}
//             editable={isEditable}
//             placeholder="Update City"
//             onChange={(e) => handleInputChange("city", e.target.value)}
//           />
//           <section className="settings-city-selectorContainer">
//             <SelectField
//               label="Country"
//               value={profile.country}
//               editable={isEditable}
//               placeholder="Update Country"
//               iconSrc="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/92f4cbd241b1e3b6a60b7cf89795a6d16f5b548ceabce6d988518cc7a7eefb3c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//               options={countries}
//               onChange={(selectedCountry) => {
//                 handleInputChange("country", selectedCountry);
//                 handleInputChange("state", ""); // Reset state when country changes
//               }}
//             />
//             <SelectField
//               label="State"
//               value={profile.state}
//               placeholder="Update State"
//               editable={isEditable}
//               iconSrc="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/16af09298139f26b39c29e840d7dec61a10fcc30926ce43a906849901322e2b5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//               options={states}
//               onChange={(selectedState) =>
//                 handleInputChange("state", selectedState)
//               }
//             />
//           </section>
//           <button
//             type="button"
//             className="settings-update-button"
//             onClick={handleUpdateClick}
//           >
//             {isEditable ? "Save" : "Update"}
//           </button>
//         </form>
//       </div>
//       <div className="settings-imageSection">
//         <img src={account_pfp} alt="Profile" />
//       </div>
//     </div>
//   );
// };

// export default AccountSection;

// import React, { useState, useEffect } from "react";
// import "../styles/AccountSection.css";
// import {
//   InputField,
//   PhoneInput,
//   CityField,
//   SelectField,
// } from "./AccountComponents.js";
// import account_pfp from "../images/account_pfp.png";
// import {
//   fetchProfile,
//   getCountries,
//   getStates,
//   updateProfile,
// } from "../services/AllServices";

// const AccountSection = () => {
//   const [profile, setProfile] = useState({
//     firstname: "",
//     lastName: "",
//     email: "",
//     mobileNumber: "",
//     address: "",
//     city: "",
//     country: "",
//     state: "",
//   });

//   const [isEditable, setIsEditable] = useState(false);
//   const [countries, setCountries] = useState([]); // List of countries
//   const [states, setStates] = useState([]); // List of states for selected country

//   // Fetch profile details on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch user profile
//         const response = await fetchProfile();
//         const {
//           firstname,
//           lastName,
//           email,
//           mobileNumber,
//           address,
//           city,
//           country,
//           state,
//         } = response.data;

//         setProfile({
//           firstname,
//           lastName,
//           email,
//           mobileNumber,
//           address,
//           city,
//           country,
//           state,
//         });

//         console.log("fetching profile data:", profile);

//         // Fetch countries
//         const countriesResponse = await getCountries();
//         setCountries(countriesResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fetch states when country changes
//   useEffect(() => {
//     if (profile.country) {
//       const fetchStates = async () => {
//         try {
//           const statesResponse = await getStates(profile.country);
//           setStates(statesResponse.data);
//         } catch (error) {
//           console.error("Error fetching states:", error);
//         }
//       };

//       fetchStates();
//     }
//   }, [profile.country]);

//   const handleInputChange = (field, value) => {
//     setProfile((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleUpdateClick = async () => {
//     if (isEditable) {
//       try {
//         // Call the updateProfile API
//         const response = await updateProfile(profile);
//         console.log("Profile updated successfully:", response);

//         // Optional: Provide user feedback for successful update
//         alert("Profile updated successfully!");
//       } catch (error) {
//         console.error("Error updating profile:", error);

//         // Optional: Provide user feedback for failed update
//         alert("Failed to update profile. Please try again.");
//       }
//     }
//     setIsEditable(!isEditable);
//   };

//   return (
//     <div className="settings-accountSection">
//       <div className="settings-formSection">
//         <form className="settings-inputFields">
//           <InputField
//             label="First Name"
//             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d91679b1a34eb5f5d3a9d9189173be4341bab3d8cafb2fbfdd377d5f92d1f6a5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//             value={profile.firstname}
//             editable={isEditable}
//             placeholder="Update First Name"
//             onChange={(e) => handleInputChange("firstname", e.target.value)}
//           />
//           <InputField
//             label="Last Name"
//             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d91679b1a34eb5f5d3a9d9189173be4341bab3d8cafb2fbfdd377d5f92d1f6a5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//             value={profile.lastName}
//             editable={isEditable}
//             placeholder="Update Last Name"
//             onChange={(e) => handleInputChange("lastname", e.target.value)}
//           />
//           <InputField
//             label="Email"
//             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/e29ef37c58780e5cd8ee2986297041a310e893fe82c262a872c641b0392efceb?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//             value={profile.email}
//             editable={isEditable}
//             placeholder="Update Email"
//             onChange={(e) => handleInputChange("email", e.target.value)}
//             type="email"
//           />
//           <PhoneInput
//             value={profile.mobileNumber}
//             editable={isEditable}
//             placeholder="Update Phone Number"
//             onChange={(e) => handleInputChange("phone", e.target.value)}
//           />
//           <InputField
//             label="Address"
//             icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/b091961851e79cde67f245be388279a07ffb670efa44b1323cca629ecbc0e41c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//             value={profile.address}
//             editable={isEditable}
//             placeholder="Update Address"
//             onChange={(e) => handleInputChange("address", e.target.value)}
//           />
//           <CityField
//             label="City"
//             value={profile.city}
//             editable={isEditable}
//             placeholder="Update City"
//             onChange={(e) => handleInputChange("city", e.target.value)}
//           />
//           <section className="settings-city-selectorContainer">
//             <SelectField
//               label="Country"
//               value={profile.country}
//               editable={isEditable}
//               placeholder="Update Country"
//               iconSrc="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/92f4cbd241b1e3b6a60b7cf89795a6d16f5b548ceabce6d988518cc7a7eefb3c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//               options={countries}
//               onChange={(selectedCountry) => {
//                 handleInputChange("country", selectedCountry);
//                 handleInputChange("state", ""); // Reset state when country changes
//               }}
//             />
//             <SelectField
//               label="State"
//               value={profile.state}
//               placeholder="Update State"
//               editable={isEditable}
//               iconSrc="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/16af09298139f26b39c29e840d7dec61a10fcc30926ce43a906849901322e2b5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
//               options={states}
//               onChange={(selectedState) =>
//                 handleInputChange("state", selectedState)
//               }
//             />
//           </section>
//           <button
//             type="button"
//             className="settings-update-button"
//             onClick={handleUpdateClick}
//           >
//             {isEditable ? "Save" : "Update"}
//           </button>
//         </form>
//       </div>
//       <div className="settings-imageSection">
//         <img src={account_pfp} alt="Profile" />
//       </div>
//     </div>
//   );
// };

// export default AccountSection;
