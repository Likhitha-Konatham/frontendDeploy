import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/ReadLater_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import { fetchReadLaterBooks } from "../services/AllServices";

const ReadlaterCarousel = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [readLaterBooks, setReadLaterBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetchReadLaterBooks();
        setReadLaterBooks(response?.data || []);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching Read Later books:", error);
        setReadLaterBooks([]);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchBooks();
  }, []);

  const maxIndex = Math.max(0, (readLaterBooks?.length || 0) - 5);

  const prevSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? maxIndex : prevIdx - 1));
  };

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
            {loading ? (
              // Placeholder: skeleton loader
              <div className="carousel__skeleton-loader">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="carousel__skeleton-item"></div>
                ))}
              </div>
            ) : (
              readLaterBooks?.map((book) => (
                <div
                  key={book._id}
                  className="carousel__slide-item"
                  onClick={() => navigate(`/book-info/${book._id}`, { state: { books: readLaterBooks } })}
                >
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="carousel__slide-thumbnail"
                  />
                  <div className="carousel__slide-title">{book.title}</div>
                </div>
              ))
            )}
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
