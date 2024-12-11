import React, { useState, useEffect } from "react";
import "../styles/Inprogress_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import emptyStateIcon from "../images/emptyStateIcon.png"; // Add an appropriate empty state image/illustration
import { fetchInProgressBooks } from "../services/AllServices.js";

const InProgressCarousel = () => {
  const [inProgressBooks, setInProgressBooks] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetchInProgressBooks();
        if (response.status === "success") {
          const colorClasses = ["green", "yellow", "orange"];
          const lastThreeBooks = response.data.slice(-3).map((book, index) => ({
            name: book.title,
            thumbnail: book.thumbnail,
            percentage: Math.floor(Math.random() * 100) + 1,
            colorClass: colorClasses[index % colorClasses.length],
          }));
          setInProgressBooks(lastThreeBooks);
        }
      } catch (error) {
        console.error("Error fetching in-progress books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const maxIndex = inProgressBooks.length - 5;

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
      {inProgressBooks.length === 0 ? (
        <div className="empty-state-container">
          <div className="genre_heading">In Progress</div>
          <div className="empty-state">
           <div className="emptyStateIconAndHeading">
            <div className="emptyStateIcon" ><img src={emptyStateIcon} alt="No books" /></div>
            <div className="empty-state__heading">No Books in Progress</div>
           </div>

          <p className="empty-state__text">
            Start listening to your favorite books to see them here.
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
            <div className="genre_heading">In Progress</div>
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

export default InProgressCarousel;
