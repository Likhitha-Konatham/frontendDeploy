import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/BookInfo.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import playIcon from '../images/playIcon.png'
import saveIcon from '../images/saveIcon.png'

// Import local book cover images
import bookcover1 from "../images/bookcover1.png";
import bookcover2 from "../images/bookcover2.png";
import bookcover3 from "../images/bookcover3.png";
import bookcover4 from "../images/bookcover4.png";
import bookcover5 from "../images/bookcover5.png";

const BookInfo = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();
  const books = [
    {
      id: 1,
      title: "Data Science",
      author: "Nir Kaldero",
      description:
        "Data science is an interdisciplinary field that combines statistics, computer science, and domain expertise to extract meaningful insights from data. It involves processes such as data collection.",
      cover: bookcover1, // Replace with actual image URL
    },
    {
      id: 2,
      title: "Machine Learning",
      author: "Andrew Ng",
      description:
        "Machine learning is a branch of AI that focuses on building systems that can learn from and adapt to data without explicit programming.",
      cover: bookcover2, // Replace with actual image URL
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      author: "Stuart Russell",
      description:
        "AI involves the simulation of human intelligence in machines programmed to think and act like humans.",
      cover: bookcover3, // Replace with actual image URL
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length
    );
  };

  const currentBook = books[currentIndex];

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

  return (
    <main className="main-content">
      <div className="sidebar_container">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={handleActiveItemChange}
          resetSearch={resetSearch}
        />
      </div>
    
      <div className="bookInfo_container">
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
        <div className="bookInfo_body">
            <div className="carousel-container">
                <div className="carousel-arrow" onClick={handlePrev}>
                    <div className="left-arrow"><img src={bigLeftArrow} alt= "left arrow" /></div>
                </div>
                <div className="carousel-content">
                    <img className="bookinfo_cover" src={currentBook.cover} alt="Book Cover" />
                    <div className="book_info">
                    <div className="bookinfo_title_play">
                        <div className="bookinfo_title">{currentBook.title}</div>
                        <div className="bookinfo_play"><img src={playIcon} alt="play icon" /></div>
                    </div>
                    <div className="bookinfo_author_save">
                        <div className="bookinfo_author">{currentBook.author}</div>
                        <div className="bookinfo_save"><img src={saveIcon} alt="save icon" /></div>
                    </div>
                    <p className="bookinfo_description">{currentBook.description}</p>
                    </div>
                </div>
                <div className="carousel-arrow" onClick={handleNext}>
                    <div className="right-arrow"><img src={bigRightArrow} alt= "right arrow" /></div>
                </div>
            </div>
          </div>
        </div>
    </main>
  );
};

export default BookInfo;
