import React from "react";
import "../styles/History_carousel.css";
import bigLeftArrow from '../images/bigLeftArrow.png';
import bigRightArrow from '../images/bigRightArrow.png';

const HistoryCarousel = ({ heading, history_carousel_images }) => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const maxIndex = history_carousel_images.length - 5;

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
              <div className=" carousel__btn--prev">
                <img src={bigLeftArrow} alt="Previous" className="carousel__btn-arrow" />
              </div>
            </button>

            <div className="carousel__container">
            <div className="genre_heading">{heading}</div>
              <div className="carousel__slide-list" style={{ transform: `translateX(-${currentIdx * (10.3 + 2)}vw)` }}>
                {history_carousel_images.map((item, index) => (
                  <a href="/book-info" key={index} className="carousel__slide-item">
                    <img src={item.image} alt={`carousel-item-${index}`} />
                  </a>
                ))}
              </div>
            </div>

            <button className="carousel__btn" onClick={nextSlide}>
              <div className=" carousel__btn--next">
                <img src={bigRightArrow} alt="Next" className="carousel__btn-arrow" />
              </div>
            </button>
         </div>
    </div>
  );
};

export default HistoryCarousel;
