import React, { useState } from "react";
import "../styles/SettingsSection.css";
import ToggleTheme from "./ToggleTheme";
import AudioSettings from "./AudioSettings";
import "../styles/AudioSettings.css";

const VolumeSlider = ({ value, onChange }) => {
  return (
    <div className="settings-slider-container">
      {/* Volume decrease icon */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/ad641962f052bc74316bb401a746732dd5b05d58954fb75e285eca7e1ae162fa?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
        alt="Volume decrease"
        className="settings-volume-icon"
      />

      {/* Slider input */}
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          className="slider"
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>

      {/* Volume increase icon */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/407b1f04608d3ae67f2f99f9831ae7b252890def39c8227fb2db18c7cd70dec7?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
        alt="Volume increase"
        className="settings-volume-icon"
      />
    </div>
  );
};

const SettingsSection = () => {
  const [volume, setVolume] = useState(50); // Initial volume state
  // const [isActive, setIsActive] = useState(false); //notifs

  // Toggle handler
  const handleNotifToggle = (id) => {
    setNotificationSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, isActive: !setting.isActive }
          : setting
      )
    );
  };

  const [notificationSettings, setNotificationSettings] = useState([
    {
      id: "newsUpdates",
      label: "News and Updates",
      ariaLabel: "Toggle news and updates notifications",
      isActive: false, // Initial state
    },
    {
      id: "newBooks",
      label: "New Book Release",
      ariaLabel: "Toggle new book release notifications",
      isActive: true, // Initial state
    },
  ]);

  return (
    <div className="settings-section">
      <section className="settings-content">
        <h1 className="settings-heading">Display Settings</h1>

        <form className="settings-form">
          <div className="settings-form-group">
            <label htmlFor="themeSelect">Select Theme</label>

            <ToggleTheme />
          </div>

          <div className="settings-form-group">
            <label htmlFor="textSize">Text Size</label>
            {/* VolumeSlider component */}
            <VolumeSlider value={volume} onChange={setVolume} />
          </div>
        </form>
        <h2 className="settings-audio-settings">Audio Settings</h2>

        <AudioSettings />
      </section>

      <section className="notif-container">
        <h1 className="notif-heading">Notification Settings</h1>

        <div className="notif-settingsGroup">
          {notificationSettings.map((setting) => (
            <div key={setting.id} className="notif-settingItem">
              <label className="notif-settingLabel" htmlFor={setting.id}>
                {setting.label}
              </label>

              <div className="audio-settings-toggle">
                <div
                  className={`audio-toggle ${setting.isActive ? "active" : ""}`}
                  onClick={() => handleNotifToggle(setting.id)}
                  role="switch"
                  aria-checked={setting.isActive}
                  aria-label={setting.ariaLabel}
                  id={setting.id}
                >
                  <div className="audio-toggle-knob"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SettingsSection;
