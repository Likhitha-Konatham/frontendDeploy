import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/ReadLater_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import { fetchReadLaterBooks } from "../services/AllServices";

const ReadlaterCarousel = () => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [readLaterBooks, setReadLaterBooks] = useState([]);
  const [books, setBooks] = useState([]);
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
        setReadLaterBooks([]); // Set to empty array on error
        setBooks([]); // Ensure no invalid state
      }
    };

    fetchBooks(); // Call the function to fetch data
  }, []);

  // Safeguard maxIndex calculation
  const maxIndex = Math.max(0, (readLaterBooks?.length || 0) - 5);

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? maxIndex : prevIdx - 1));
  };

  // Handle next slide
  const nextSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === maxIndex ? 0 : prevIdx + 1));
  };

  return (
    <div className="carousel__wrap">
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
            {readLaterBooks?.map((book, index) => (
              <div
                key={book._id}
                className="carousel__slide-item"
                onClick={() => navigate(`/book-info/${book._id}`, { state: { books } })}
              >
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="carousel__slide-thumbnail"
                />
                <div className="carousel__slide-title">{book.title}</div>
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
    </div>
  );
};

export default ReadlaterCarousel;
