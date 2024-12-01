import React, { useEffect, useState } from "react";
import "../styles/Genre_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import { useNavigate } from "react-router-dom";
import { fetchAllGenreBooks } from "../services/AllServices.js";

const GenreCarousel = ({ heading, genre_carousel_images }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [genreBooks, setGenreBooks] = useState({});
  const maxIndex = Math.max(0, genre_carousel_images.length - 5); // Restrict sliding if items are <5
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

  const prevSlide = () => {
    if (genre_carousel_images.length > 5) {
      setCurrentIdx((prevIdx) => (prevIdx === 0 ? maxIndex : prevIdx - 1));
    }
  };

  const nextSlide = () => {
    if (genre_carousel_images.length > 5) {
      setCurrentIdx((prevIdx) => (prevIdx === maxIndex ? 0 : prevIdx + 1));
    }
  };

  if (!Array.isArray(genre_carousel_images) || genre_carousel_images.length === 0) {
    return null;
  }

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button 
          className="carousel__btn" 
          onClick={prevSlide} 
          disabled={genre_carousel_images.length <= 5} // Disable for fewer than 5 items
        >
          <div className="carousel__btn--prev">
            <img src={bigLeftArrow} alt="Previous" className="carousel__btn-arrow" />
          </div>
        </button>

        <div className="carousel__container">
          <div className="genre_heading">{heading}</div>
          <div 
            className="carousel__slide-list" 
            style={{ transform: `translateX(-${currentIdx * (10.3 + 2)}vw)` }}
          >
            {genre_carousel_images.map((item, index) => (
              <div key={index} className="carousel__slide-item">
                <div 
                  role="button" 
                  tabIndex={0} 
                  onClick={() => navigate(`/book-info/${heading}/${item.id}`, { state: { genreBooks } })} 
                  className="carousel__item-link"
                >
                  <img src={item.image} alt={`carousel-item-${index}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel__btn" 
          onClick={nextSlide} 
          disabled={genre_carousel_images.length <= 5} // Disable for fewer than 5 items
        >
          <div className="carousel__btn--next">
            <img src={bigRightArrow} alt="Next" className="carousel__btn-arrow" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default GenreCarousel;
