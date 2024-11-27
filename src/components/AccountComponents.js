import React, { useState } from "react";
import flag_icon from "../images/flag_icon.png";

export const InputField = ({
  label,
  icon,
  value,
  editable,
  onChange,
  type = "text",
  placeholder, // Added placeholder prop
}) => (
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
          disabled={!editable}
          onChange={onChange}
          placeholder={placeholder} // Applied placeholder
        />
      </div>
    </div>
  </div>
);

export const CityField = ({
  label,
  value,
  editable,
  onChange,
  type = "text",
  placeholder, // Added placeholder prop
}) => (
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
          disabled={!editable}
          onChange={onChange}
          placeholder={placeholder} // Applied placeholder
        />
      </div>
    </div>
  </div>
);

export const SelectField = ({
  label,
  value,
  iconSrc,
  options,
  onChange,
  editable,
  placeholder,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsDropdownVisible(false);
  };

  return (
    <div className="settings-city-selectWrapper">
      <div className="settings-city-selectInner">
        <label className="settings-city-selectLabel">{label}</label>
        <div
          className="settings-city-selectField"
          onClick={() => editable && setIsDropdownVisible(!isDropdownVisible)}
        >
          <div className="settings-city-selectContent">
            <div
              className="settings-city-selectValue"
              style={{
                color: value ? "#000" : "#757575",
                opacity: value ? 1 : 2,
              }}
            >
              {value || placeholder}
            </div>
            <img src={iconSrc} alt="" className="settings-city-selectIcon" />
          </div>
        </div>
        {isDropdownVisible && (
          <div className="settings-city-dropdown">
            {options.map((option, index) => (
              <div
                key={index}
                className="settings-city-dropdownOption"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const PhoneInput = ({ value, editable, onChange, placeholder }) => (
  <div className="settings-inputWrapper">
    <label className="settings-label">Phone Number</label>
    <div className="settings-phoneWrapper">
      <div className="settings-countryCode">
        <div className="settings-countryCodeInner">
          <img
            src={flag_icon}
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
          value={value}
          className="settings-inputText"
          aria-label="Phone number"
          disabled={!editable}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  </div>
);
