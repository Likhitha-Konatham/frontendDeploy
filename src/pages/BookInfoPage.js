import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import '../styles/BookInfo.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import playIcon from '../images/playIcon.png';
import readlaterIcon from '../images/readlater_icon.png';
import { insertReadLater } from "../services/AllServices.js";
import loadingSpinner from "../images/loadingSpinner.gif"

const BookInfo = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const [sortedBooks, setSortedBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { bookId, genre } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      setLoading(true);
      if (genre && location.state?.genreBooks[genre]) {
        const booksInGenre = location.state.genreBooks[genre];
        setSortedBooks(booksInGenre);
        const selectedIndex = booksInGenre.findIndex((book) => book._id === bookId);
        setCurrentIndex(selectedIndex !== -1 ? selectedIndex : 0);
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
    } finally {
      setLoading(false);
    }
  }, [genre, bookId, location.state]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % sortedBooks.length;
      const nextBook = sortedBooks[nextIndex];
      navigate(`/book-info/${genre}/${nextBook._id}`, { state: location.state });
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexCalc = (prevIndex - 1 + sortedBooks.length) % sortedBooks.length;
      const prevBook = sortedBooks[prevIndexCalc];
      navigate(`/book-info/${genre}/${prevBook._id}`, { state: location.state });
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

  const currentBook = sortedBooks[currentIndex] || {};

  const handleProfileClick = () => {
    navigate("/settings", { state: { selectedSection: "account" } });
  };


  
  const resetSearch = () => {
    setSearchQuery("");
  };

  const handleActiveItemChange = (item) => {
    setActiveItem(item);
    if (item === "dashboard") {
      navigate("/dashboard");
    } else if (item === "bookmarks") {
      navigate("/bookmarks");
    } else if (item === "library") {
      navigate("/library");
    } else if (item === "settings") {
      navigate("/settings");
    }
    resetSearch();
  };

  const getHeaderVisibility = () => {
    if (activeItem === "dashboard" || activeItem === "") {
      return { showSearch: true, showUserProfile: true, showArrows: false, pageName: "Dashboard" };
    } else if (activeItem === "bookmarks") {
      return { showSearch: true, showUserProfile: true, showArrows: true, pageName: "" };
    } else if (activeItem === "library") {
      return { showSearch: false, showUserProfile: true, showArrows: true, pageName: "My Library" };
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
         <Header
            showSearch={showSearch}
            showUserProfile={showUserProfile}
            showArrows={showArrows}
            pageName={pageName}
            searchQuery={searchQuery}
            onSearch={(query) => setSearchQuery(query)}
            onProfileClick={handleProfileClick} 
          />

        <div className="bookInfo_body">
          {loading ? ( // Render loading spinner while loading
              <div className="loading-spinner">
                <img src={loadingSpinner} alt="Loading..." />
            </div>
            ) : (
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
          )}
        </div>
      </div>
    </main>
  );
};

export default BookInfo;
