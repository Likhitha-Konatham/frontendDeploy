import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/ReadLater_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import emptyStateIcon from "../images/emptyStateIcon.png"; // Add an appropriate empty state image/illustration
import { fetchReadLaterBooks } from "../services/AllServices";

const ReadlaterCarousel = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [readLaterBooks, setReadLaterBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetchReadLaterBooks();
        setReadLaterBooks(response?.data || []); // Ensure fallback to an empty array
        setBooks(response?.data || []); // Update state with API data or empty array
        console.log("Fetched Read Later books:", response?.data);
      } catch (error) {
        console.error("Error fetching Read Later books:", error);
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    fetchBooks(); // Call the function to fetch data
  }, []);

  const maxIndex = Math.max(0, readLaterBooks?.length - 5);

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? maxIndex : prevIdx - 1));
  };

  // Handle next slide
  const nextSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === maxIndex ? 0 : prevIdx + 1));
  };

  if (loading) {
    return (
      <div className="carousel__wrap">
        <div className="carousel__skeleton-loader">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="carousel__skeleton-item"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="carousel__wrap">
      {readLaterBooks.length === 0 ? (
        <div className="empty-state-container">
          <div className="genre_heading">Read Later</div>
          <div className="empty-state">
            <div className="emptyStateIconAndHeading">
              <div className="emptyStateIcon">
                <img src={emptyStateIcon} alt="No books" />
              </div>
              <div className="empty-state__heading">No Books in Read Later</div>
            </div>
            <p className="empty-state__text">
              Add books to your Read Later list to see them here.
            </p>
            <a href="/" className="empty-state__cta">
              Browse Books
            </a>
          </div>
        </div>
      ) : (
        <div className="carousel__inner">
          <button className="carousel__btn" onClick={prevSlide}>
            <div className="carousel__btn--prev">
              <img src={bigLeftArrow} alt="Previous" className="carousel__btn-arrow" />
            </div>
          </button>

          <div className="carousel__container">
            <div className="genre_heading">Read Later</div>
            <div
              className="carousel__slide-list"
              style={{ transform: `translateX(-${currentIdx * (10.3 + 2)}vw)` }}
            >
              {readLaterBooks?.map((book) => (
                <div
                  key={book._id}
                  onClick={() => navigate(`/book-info/${book._id}`, { state: { books } })}
                >
                  <div className="carousel__hover-wrapper">
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="carousel__slide-thumbnail"
                    />
                    <div className="hover_container">
                      <div className="hover_book_name">{book.title}</div>
                      <div className="hover_book_author">{book.author_list.join(", ")}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel__btn" onClick={nextSlide}>
            <div className="carousel__btn--next">
              <img src={bigRightArrow} alt="Next" className="carousel__btn-arrow" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadlaterCarousel;
