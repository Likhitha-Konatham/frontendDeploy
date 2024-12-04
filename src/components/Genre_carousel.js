import React, { useEffect, useState } from "react";
import "../styles/Genre_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';
import { useNavigate } from "react-router-dom";
import { fetchAllGenreBooks } from "../services/AllServices.js";
import { getToken } from '../storage/Storage'; // Import the token utility

const GenreCarousel = ({ heading, genre_carousel_images }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [genreBooks, setGenreBooks] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [token, setToken] = useState(null);
  const maxIndex = Math.max(0, genre_carousel_images.length - 5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    };
    fetchToken();

    const fetchGenreBooks = async () => {
      try {
        const response = await fetchAllGenreBooks();
        setGenreBooks(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Failed to fetch genre books:", error);
        setLoading(false); // Set loading to false on error
      }
    };
    fetchGenreBooks();
  }, []);

  const handleItemClick = (itemId) => {
    if (!token) {
      navigate('/signin');
    } else {
      navigate(`/book-info/${heading}/${itemId}`, { state: { genreBooks } });
    }
  };

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
          disabled={genre_carousel_images.length <= 5}
        >
          <div className="carousel__btn--prev">
            <img src={bigLeftArrow} alt="Previous" className="carousel__btn-arrow" />
          </div>
        </button>

        <div className="carousel__container">
          <div className="genre_heading">{heading}</div>

          {/* Skeleton Loader */}
          <div
            className="carousel__slide-list"
            style={{ transform: `translateX(-${currentIdx * (10.3 + 2)}vw)` }}
          >
            {loading ? (
              // Skeleton loader while loading
              <div className="carousel__skeleton-loader">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="carousel__skeleton-item"></div>
                ))}
              </div>
            ) : (
              genre_carousel_images.map((item, index) => (
                <div key={index} className="carousel__slide-item">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleItemClick(item.id)} // Token check on click
                    className="carousel__item-link"
                  >
                     <img
                      src={item.image}
                      alt={item.title}
                      className="carousel__slide-thumbnail"
                    />
                    <div className="hover_container">
                      <div className="hover_book_name">{item.title}</div>
                      <div className="hover_book_author">
                        {item.author_list && item.author_list.length > 0
                          ? item.author_list.join(", ")
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          className="carousel__btn"
          onClick={nextSlide}
          disabled={genre_carousel_images.length <= 5}
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
