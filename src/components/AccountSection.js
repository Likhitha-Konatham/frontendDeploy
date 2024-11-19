import React from "react";
import "../styles/AccountSection.css";
import {
  InputField,
  PhoneInput,
  CityField,
  SelectField,
} from "./AccountComponents.js";

// Main AccountSection component
const AccountSection = () => {
  return (
    <div className="settings-accountSection">
      <div className="settings-formSection">
        {/* <h2>Account Information</h2> */}
        {/* <p>This section can include account-related details and settings.</p> */}
        <form className="settings-inputFields">
          <InputField
            label="First Name"
            icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d91679b1a34eb5f5d3a9d9189173be4341bab3d8cafb2fbfdd377d5f92d1f6a5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            value="Jane"
          />
          <InputField
            label="Last Name"
            icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d91679b1a34eb5f5d3a9d9189173be4341bab3d8cafb2fbfdd377d5f92d1f6a5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            value="Doe"
          />
          <InputField
            label="Email"
            icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/e29ef37c58780e5cd8ee2986297041a310e893fe82c262a872c641b0392efceb?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            value="janedoe@gmail.com"
            type="email"
          />
          <PhoneInput />
          <InputField
            label="Address"
            icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/b091961851e79cde67f245be388279a07ffb670efa44b1323cca629ecbc0e41c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            value="No. 93 Skyfield Apartments"
          />
          <CityField
            label="City"
            // icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/b091961851e79cde67f245be388279a07ffb670efa44b1323cca629ecbc0e41c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            value="Hyderabad"
          />
          <section className="settings-city-selectorContainer">
            <SelectField
              label="Country"
              value="India"
              iconSrc="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/92f4cbd241b1e3b6a60b7cf89795a6d16f5b548ceabce6d988518cc7a7eefb3c?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            />
            <SelectField
              label="State"
              value="Telangana"
              iconSrc="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/16af09298139f26b39c29e840d7dec61a10fcc30926ce43a906849901322e2b5?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            />
          </section>
          <button type="submit" className="settings-update-button">
            Update
          </button>
        </form>
      </div>
      <div className="settings-imageSection">
        <img src="https://via.placeholder.com/300" alt="Profile" />
      </div>
    </div>
  );
};

export default AccountSection;
