import React from "react";
import "../styles/Genre_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';

const GenreCarousel = ({ genre, genre_carousel_images }) => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const maxIndex = genre_carousel_images.length - 5;

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
        <div className="genre_heading">{genre}</div>
          <div className="carousel__inner">
            <button className="carousel__btn carousel__btn--prev" onClick={prevSlide}>
                <img src={bigLeftArrow} alt="Previous" className="carousel__btn-arrow" />
            </button>

            <div className="carousel__container">
                <div className="carousel__slide-list" style={{ transform: `translateX(-${currentIdx * 12}vw)` }}>
                {genre_carousel_images.slice(currentIdx, currentIdx + 5).map((item, index) => (
                    <div key={index} className="carousel__slide-item">
                    <img src={item.image} alt={`carousel-item-${index}`} />
                    </div>
                ))}
                </div>
            </div>

            <button className="carousel__btn carousel__btn--next" onClick={nextSlide}>
                <img src={bigRightArrow} alt="Next" className="carousel__btn-arrow" />
            </button>
         </div>
    </div>
  );
};

export default GenreCarousel;
