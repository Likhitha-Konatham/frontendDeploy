import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import '../styles/BookInfo.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import playIcon from '../images/playIcon.png';
import readlaterIcon from '../images/readlater_icon.png';
import { insertReadLater } from "../services/AllServices.js";

const BookInfo = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { bookId } = useParams(); // Get bookId from URL
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize books to avoid unnecessary re-renders
  const books = useMemo(() => location.state?.books || [], [location.state]);


  useEffect(() => {
    if (books.length > 0) {
      const selectedIndex = books.findIndex((book) => book._id === bookId);
      setCurrentIndex(selectedIndex !== -1 ? selectedIndex : 0);
    }
  }, [bookId, books]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % books.length;
      const nextBook = books[nextIndex];
      navigate(`/book-info/${nextBook._id}`, { state: { books } });
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexCalc = (prevIndex - 1 + books.length) % books.length;
      const prevBook = books[prevIndexCalc];
      navigate(`/book-info/${prevBook._id}`, { state: { books } });
      return prevIndexCalc;
    });
  };

  const handleReadLater = async (bookID) => {
    try {
      const formData = { bookID: bookID };
      await insertReadLater(formData);
      alert("Book added to Read Later successfully!");
    } catch (error) {
      console.error("Error adding book to Read Later:", error);
    }
  };

  const currentBook = books[currentIndex] || {}; 

  const handleProfileClick = () => {
    navigate("/settings", { state: { selectedSection: "account" } });
  };

  return (
    <main className="main-content">
      <div className="sidebar_container">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          resetSearch={() => setSearchQuery("")}
        />
      </div>

      <div className="bookInfo_container">
        <Header
          showSearch
          showUserProfile
          showArrows
          pageName=""
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onProfileClick={handleProfileClick} 
        />

        <div className="bookInfo_body">
          <div className="carousel-container">
            <div className="carousel-arrow" onClick={handlePrev}>
              <img src={bigLeftArrow} alt="left arrow" />
            </div>

            <div className="carousel-content">
              <img className="bookinfo_cover" src={currentBook.thumbnail} alt="Book Cover" />
              <div className="book_info">
                <div className="bookinfo_title_play">
                  <div className="bookinfo_title">{currentBook.title}</div>
                  <a href="/audiobook-player" className="bookinfo_play">
                    <img src={playIcon} alt="play icon" />
                  </a>
                </div>
                <div className="bookinfo_author_save">
                  <div className="bookinfo_author">{currentBook.author_list?.join(", ")}</div>
                  <div className="bookinfo_save" onClick={() => handleReadLater(currentBook._id)}>
                    <img src={readlaterIcon} alt="save icon" />
                  </div>
                </div>
                <p className="bookinfo_description">{currentBook.description}</p>
              </div>
            </div>

            <div className="carousel-arrow" onClick={handleNext}>
              <img src={bigRightArrow} alt="right arrow" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookInfo;
