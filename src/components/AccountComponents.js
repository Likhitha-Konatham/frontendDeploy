// InputField component
import React from "react";
export const InputField = ({ label, icon, value, type = "text" }) => (
  <div className="settings-inputWrapper">
    <label className="settings-label">{label}</label>
    <div className="settings-inputContent">
      <div className="settings-inputInner">
        <img src={icon} alt="" className="settings-icon" />
        <input
          type={type}
          value={value}
          className="settings-inputText"
          aria-label={label}
        />
      </div>
    </div>
  </div>
);

export const CityField = ({ label, value, type = "text" }) => (
  <div className="settings-inputWrapper">
    <label className="settings-label">{label}</label>
    <div className="settings-inputContent">
      <div className="settings-inputInner">
        {/* <img src={icon} alt="" className="settings-icon" /> */}
        <input
          type={type}
          value={value}
          className="settings-inputText"
          aria-label={label}
        />
      </div>
    </div>
  </div>
);

export const SelectField = ({ label, value, iconSrc }) => {
  return (
    <div className="settings-city-selectWrapper">
      <div className="settings-city-selectInner">
        <label className="settings-city-selectLabel">{label}</label>
        <div className="settings-city-selectField">
          <div className="settings-city-selectContent">
            <div className="settings-city-selectValue">{value}</div>
            <img src={iconSrc} alt="" className="settings-city-selectIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

// PhoneInput component
export const PhoneInput = () => (
  <div className="settings-inputWrapper">
    <label className="settings-label">Phone Number</label>
    <div className="settings-phoneWrapper">
      <div className="settings-countryCode">
        <div className="settings-countryCodeInner">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/609d20e1fd709a2c8ea2d617f70f3e6c3754d271ecad114da9234a8d8195ce54?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            alt="Country flag"
            className="settings-flagIcon"
          />
          <span>+91</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/4e35eefc48b69f12c98b328a70fc7e40726666f8b9c17bae0bf8fb511fff7d08?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            alt=""
            className="settings-arrowIcon"
          />
        </div>
      </div>
      <div className="settings-phoneInput">
        <input
          type="tel"
          value="08065650633"
          className="settings-inputText"
          aria-label="Phone number"
        />
      </div>
    </div>
  </div>
);
