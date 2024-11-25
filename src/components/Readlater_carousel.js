import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/ReadLater_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import { fetchReadLaterBooks } from "../services/AllServices";

const ReadlaterCarousel = () => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [readLaterBooks, setReadLaterBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetchReadLaterBooks();
        setReadLaterBooks(response.data); // Update state with API data
        console.log("Fetched Read Later books:", response.data);
      } catch (error) {
        console.error("Error fetching Read Later books:", error);
      }
    };

    fetchBooks(); // Call the function to fetch data
  }, []);

  const maxIndex = Math.max(0, readLaterBooks.length - 5);

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? maxIndex : prevIdx - 1));
  };

  // Handle next slide
  const nextSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === maxIndex ? 0 : prevIdx + 1));
  };
  const handleBookClick = (bookId, genre) => {
    navigate(`/book-info/${genre}/${bookId}`);
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
            {readLaterBooks.map((book, index) => (
              <div
                key={book._id}
                className="carousel__slide-item"
                onClick={() => handleBookClick(book._id, book.genre)}
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
