import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/BookInfo.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import playIcon from '../images/playIcon.png';
import readlaterIcon from '../images/readlater_icon.png';
import { fetchAllGenreBooks } from "../services/AllServices.js"; // Assume this API utility is available for fetching books

const BookInfo = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState('');
  const [genreBooks, setGenreBooks] = useState({});
  const [sortedBooks, setSortedBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { bookId, genre } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenreBooks = async () => {
      try {
        const response = await fetchAllGenreBooks();
        setGenreBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch genre books:", error);
      }
    };
    fetchGenreBooks();
  }, []);

  useEffect(() => {
    if (genre && genreBooks[genre]) {
      const booksInGenre = genreBooks[genre];
      setSortedBooks(booksInGenre);
      const selectedIndex = booksInGenre.findIndex((book) => book._id === bookId);
      setCurrentIndex(selectedIndex !== -1 ? selectedIndex : 0);
    }
  }, [genre, bookId, genreBooks]);

// Handle carousel navigation
const handleNext = () => {
  setCurrentIndex((prevIndex) => {
    const nextIndex = (prevIndex + 1) % sortedBooks.length;
    const nextBook = sortedBooks[nextIndex];
    navigate(`/book-info/${genre}/${nextBook._id}`);
    return nextIndex;
  });
};

const handlePrev = () => {
  setCurrentIndex((prevIndex) => {
    const prevIndexCalc = (prevIndex - 1 + sortedBooks.length) % sortedBooks.length;
    const prevBook = sortedBooks[prevIndexCalc];
    navigate(`/book-info/${genre}/${prevBook._id}`);
    return prevIndexCalc;
  });
};

const currentBook = sortedBooks[currentIndex] || {};
  // Header and sidebar utility functions
  const resetSearch = () => setSearchQuery("");

  const handleActiveItemChange = (item) => {
    setActiveItem(item);
    if (item === "dashboard") navigate("/");
    else if (item === "bookmarks") navigate("/bookmarks");
    else if (item === "library") navigate("/library");
    else if (item === "settings") navigate("/settings");
    resetSearch();
  };

  const getHeaderVisibility = () => {
    if (["dashboard", ""].includes(activeItem)) {
      return { showSearch: true, showUserProfile: true, showArrows: true, pageName: "" };
    } else if (activeItem === "library") {
      return { showSearch: false, showUserProfile: true, showArrows: true, pageName: "Library" };
    } else if (activeItem === "settings") {
      return { showSearch: false, showUserProfile: true, showArrows: true, pageName: "Account" };
    }
    return { showSearch: true, showUserProfile: true, showArrows: true, pageName: "" };
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
              <div className="left-arrow"><img src={bigLeftArrow} alt="left arrow" /></div>
            </div>

            <div className="carousel-content">
              <img className="bookinfo_cover" src={currentBook.thumbnail} alt="Book Cover" />
              <div className="book_info">
                <div className="bookinfo_title_play">
                  <div className="bookinfo_title">{currentBook.title}</div>
                  <a href="/audiobook-player" className="bookinfo_play"><img src={playIcon} alt="play icon" /></a>
                </div>
                <div className="bookinfo_author_save">
                  <div className="bookinfo_author">{currentBook.author_list?.join(", ")}</div>
                  <div className="bookinfo_save"><img src={readlaterIcon} alt="save icon" /></div>
                </div>
                <p className="bookinfo_description">{currentBook.description}</p>
              </div>
            </div>

            <div className="carousel-arrow" onClick={handleNext}>
              <div className="right-arrow"><img src={bigRightArrow} alt="right arrow" /></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookInfo;
