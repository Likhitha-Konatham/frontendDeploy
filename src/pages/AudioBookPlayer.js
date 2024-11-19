import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSlider from "react-slider"; // Import react-slider
import "../styles/AudioBookPlayer.css";
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";

// Importing all images
import arrowBack from "../images/arrow_back.png";
import arrowNext from "../images/arrow_next.png";
import fastForward from "../images/fast_forward.png";
import fastBackward from "../images/fast_backward.png";
import playIcon from "../images/playIcon.png";
import pauseIcon from "../images/pauseIcon.png";
import saveIcon from "../images/saveIcon.png";
import zoomIn from "../images/zoom_in.png";
import zoomOut from "../images/zoom_out.png";
import bookCover1 from "../images/bookcover1.png";
import bookCover2 from "../images/bookcover2.png";
import bookCover3 from "../images/bookcover3.png";
import downArrow from "../images/down_arrow.png";
import skipForward from "../images/skip_forward.png";
import skipBackward from "../images/skip_backward.png";
import fullScreen from "../images/fullScreen.png";
import brightnessImg from "../images/brightness.png";

const AudioBookPlayer = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // Playback speed
  const [progress, setProgress] = useState(50); // Progress bar
  const [brightness, setBrightness] = useState(100); // Brightness
  const [zoomLevel, setZoomLevel] = useState(100); // Zoom level for text box

  const [currentChapter, setCurrentChapter] = useState(0); // State to track current chapter

  const chapters = [
    {
      title: "Data Science",
      author: "Nir Kaldero",
      cover: bookCover1,
      context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in diam arcu. Cras sit amet leo lorem. Fusce vel viverra urna, ac accumsan leo.",
    },
    {
      title: "Machine Learning",
      author: "Jane Doe",
      cover: bookCover2,
      context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae nisl sit amet magna ullamcorper lobortis dictum vitae arcu. Nullam non accumsan diam.",
    },
    {
      title: "Artificial Intelligence",
      author: "John Smith",
      cover: bookCover3,
      context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet leo lorem. Fusce vel viverra urna, ac accumsan leo. Duis non erat in urna cursus malesuada.",
    },
  ];

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleZoom = (type) => {
    setZoomLevel((prev) =>
      type === "in" ? Math.min(prev + 10, 200) : Math.max(prev - 10, 50)
    );
  };

  const handleBrightnessChange = (value) => setBrightness(value);

  const resetSearch = () => {
    setSearchQuery(""); // Reset the search query
  };

  const handleActiveItemChange = (item) => {
    setActiveItem(item); // Update active item
    if (item === "dashboard") {
      navigate("/"); // Navigate to feedback page
    } else if (item === "bookmarks") {
      navigate("/bookmarks"); // Navigate to home page
    }
    else if (item === "library") {
      navigate("/library"); // Navigate to home page
    }
    else if (item === "settings") {
      navigate("/settings"); // Navigate to home page
    }

    resetSearch(); // Reset search whenever a new section is selected
  };

  const getHeaderVisibility = () => {
    if (activeItem === "dashboard" || activeItem === "") {
      return { showSearch: true, showUserProfile: true, showArrows: false, pageName: "Dashboard" };
    } else if (activeItem === "bookmarks") {
      return { showSearch: true, showUserProfile: true, showArrows: true, pageName: "" };
    } else if (activeItem === "library") {
      return { showSearch: false, showUserProfile: true, showArrows: true, pageName: "Library" };
    } else if (activeItem === "settings") {
      return { showSearch: false, showUserProfile: true, showArrows: true, pageName: "Account" };
    }
  };

  const { showSearch, showUserProfile, showArrows, pageName } = getHeaderVisibility();

  // Handle Skip Forward and Skip Backward
  const handleSkipForward = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handleSkipBackward = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  return (
    <main className="main-content">
      <div className="sidebar_container">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={handleActiveItemChange}
          resetSearch={resetSearch}
        />
      </div>

      <div className="audio_player_container">
        <div className="header_container">
          <Header
            showSearch={showSearch}
            showUserProfile={showUserProfile}
            showArrows={showArrows} 
            pageName={pageName} 
            searchQuery={searchQuery}
            onSearch={(query) => setSearchQuery(query)}
          />
        </div>

        <div className="audio-book-player">
          {/* Left Section: 70% */}
          <div className="left-section">
            {/* Header */}
            <div className="header">
              <div className="arrowSection">
                <div className="arrow"><img src={arrowBack} alt="Back" className="icon" /></div>
                <div className="arrow"><img src={arrowNext} alt="next" className="icon" /></div>
              </div>

              <div className="chapterSection">
                <div className="chapterNumber">Chapter {currentChapter + 1}</div>
                <div className="chapterDropdown"><img src={downArrow} alt="Dropdown" className="icon" /></div>
              </div>
              <div className="saveSection">
                <div className="book_player_save_icon">
                  <img src={saveIcon} alt="Bookmark"/>
                </div>
              </div>
            </div>

            {/* Lyrics Box */}
            <div
              className="book_context_box"
              style={{ zoom: `${zoomLevel}%`, filter: `brightness(${brightness}%)` }}
            >
              <p className="book_context">
                {chapters[currentChapter].context}
                <span className="highlight"> Duis non erat in urna cursus malesuada sed sed mauris.</span>
              </p>
              <div className="fullscreen"><img src={fullScreen} alt="full screen" /></div>
            </div>

            {/* Playback Controls */}
            <div className="book-player-controls">
                <div className="control-section skip-backward" onClick={handleSkipBackward}>
                    <img src={skipBackward} alt="Skip Backward" className="control-icon" />
                </div>
                <div className="control-section fast-backward" >
                    <img src={fastBackward} alt="Fast Backward" className="control-icon" />
                </div>
                <div className="control-section play-pause">
                    <img
                    src={isPlaying ? pauseIcon : playIcon}
                    alt="Play/Pause"
                    className="control-icon"
                    onClick={handlePlayPause}
                    />
                </div>
                <div className="control-section fast-forward">
                    <img src={fastForward} alt="Fast Forward" className="control-icon" />
                </div>
                <div className="control-section skip-forward" onClick={handleSkipForward}>
                    <img src={skipForward} alt="Skip Forward" className="control-icon" />
                </div>
                <div className="control-section speed-select-container">
                    <select
                    className="speed-select"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                    </select>
                </div>
            </div>

            {/* Progress Bar */}

           <div className="book-player-progress-bar">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
              />
              <span className="progress-percent">{progress}%</span>
            </div>
            <div className="section_out_of">60 of 100</div>
        </div>
      {/* Right Section: 30% */}
      <div className="right-section">
        {/* Book Info */}
        <div className="book-player-info">
           <div className="book-player-cover"><img src={chapters[currentChapter].cover} alt="Book Cover" /></div>
            <div className="book-player-details">
                <h3>{chapters[currentChapter].title}</h3>
                <h4>{chapters[currentChapter].author}</h4>
            </div>
        </div>

        {/* Brightness and Zoom Controls */}
        <div className="book-player-settings">
          <div className="slider-container">
            <div className="small-img">
                <img src={brightnessImg} alt="brightness decrease" />
            </div>
            <ReactSlider
              className="custom-slider"
              thumbClassName="custom-slider-thumb"
              trackClassName="custom-slider-track"
              value={brightness}
              onChange={handleBrightnessChange}
              min={50}
              max={150}
            />
             <div className="big-img">
                <img src={brightnessImg} alt="brightness increase" />
            </div>
          </div>
          
          <div className="slider-container">
            <div className="small-img">
                <img src={zoomOut} alt="Zoom Icon" />
            </div>
                <ReactSlider
                className="custom-slider"
                thumbClassName="custom-slider-thumb"
                trackClassName="custom-slider-track"
                value={zoomLevel}
                min={80}
                max={120}
                onChange={(value) => setZoomLevel(value)}
                />
            <div className="big-img">
              <img src={zoomIn} alt="Zoom Icon" />
            </div>
            </div>
        </div>
      </div>

        </div>
      </div>
    </main>
  );
};

export default AudioBookPlayer;
