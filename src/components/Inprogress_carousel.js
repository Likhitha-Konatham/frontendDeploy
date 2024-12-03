import React, { useState, useEffect } from "react";
import "../styles/Inprogress_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import { fetchInProgressBooks } from "../services/AllServices.js";

const InProgressCarousel = () => {
  const [inProgressBooks, setInProgressBooks] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetchInProgressBooks();
        if (response.status === "success") {
          const colorClasses = ["green", "yellow", "orange"];
          const lastThreeBooks = response.data.slice(-3).map((book, index) => ({
            name: book.title,
            percentage: Math.floor(Math.random() * 100) + 1,
            colorClass: colorClasses[index % colorClasses.length],
          }));
          setInProgressBooks(lastThreeBooks);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching in-progress books:", error);
      }
    };

    fetchBooks();
  }, []);

  // If no books, render nothing
  if (inProgressBooks.length === 0) {
    return null;
  }

  const maxIndex = inProgressBooks.length - 5;

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
          <div className="genre_heading">In Progress</div>
          {loading ? (
              // Skeleton loader while loading
              <div className="carousel__skeleton-loader">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="carousel__skeleton-item"></div>
                ))}
              </div>
                ) : (
                  <div
                    className="carousel__slide-list"
                    style={{ transform: `translateX(-${currentIdx * (10.3 + 2)}vw)` }}
                  >
                    {inProgressBooks.map((item, index) => (
                      <a href="/audiobook-player" key={index} className="carousel__slide-item">
                        <img src={item.thumbnail} alt={`carousel-item-${index}`} />
                      </a>
                    ))}
                  </div>
                )}
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

export default InProgressCarousel;
