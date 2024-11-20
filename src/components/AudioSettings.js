import React, { useState } from "react";
import "../styles/AudioSettings.css";

const AudioSettings = () => {
  const [playbackSpeed, setPlaybackSpeed] = useState("1.5 x");
  const [voiceSelection, setVoiceSelection] = useState("Indian Male");
  const [sleepTimer, setSleepTimer] = useState(false);

  return (
    <div className="audio-settings-container">
      {/* Playback Speed */}
      <div className="audio-settings-group">
        <label className="audio-settings-label">Playback Speed</label>
        <div className="audio-dropdown">
          <select
            className="audio-select"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(e.target.value)}
          >
            <option value="0.5 x">0.5 x</option>
            <option value="1.0 x">1.0 x</option>
            <option value="1.5 x">1.5 x</option>
            <option value="2.0 x">2.0 x</option>
          </select>
        </div>
      </div>

      {/* Voice Selection */}
      <div className="audio-settings-group">
        <label className="audio-settings-label">Voice Selection</label>
        <div className="audio-dropdown">
          <select
            className="audio-select"
            value={voiceSelection}
            onChange={(e) => setVoiceSelection(e.target.value)}
          >
            <option value="Indian Male">Indian Male</option>
            <option value="Indian Female">Indian Female</option>
            <option value="US Male">US Male</option>
            <option value="US Female">US Female</option>
          </select>
        </div>
      </div>

      {/* Sleep Timer */}
      <div className="audio-settings-toggle">
        <label className="audio-settings-label">Sleep Timer</label>
        <div
          className={`audio-toggle ${sleepTimer ? "active" : ""}`}
          onClick={() => setSleepTimer(!sleepTimer)}
        >
          <div className="audio-toggle-knob"></div>
        </div>
      </div>
    </div>
  );
};

export default AudioSettings;
