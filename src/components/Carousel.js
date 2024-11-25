import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { fetchAllBooks } from '../services/AllServices';
import '../styles/Carousel.css';

import leftArrow from '../images/new_release_carousel_leftarrow.png'; 
import rightArrow from '../images/new_release_carousel_rightarrow.png'; 

const Carousel = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetchAllBooks();
        const sortedBooks = response.data.sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 6);
        setBooks(sortedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, []);

  const handleBookClick = (bookId, genre) => {
    navigate(`/book-info/${genre}/${bookId}`);
  };

  return (
    <div className="new-rleases-carousel-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={2} // Default: Show 2 slides
        spaceBetween={-20} // Default space between slides
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-container"
        breakpoints={{
          320: {
            slidesPerView: 2,  // For small screens, show 1 slide
            spaceBetween: 200,   // Adjust space between slides
          },
          480: {
            slidesPerView: 2, // For slightly larger screens, show 1.5 slides
            spaceBetween: 120,   // Adjust space between slides
          },
          768: {
            slidesPerView: 2,  // For medium screens, show 2 slides
            spaceBetween: 20,  // Adjust space between slides
          },
          1024: {
            slidesPerView: 2,  // For larger screens, show 3 slides
            spaceBetween: -65,  // Adjust space between slides
          },
        }}
      >
         {books.map((book) => (
          <SwiperSlide
            key={book._id}
            className="swiper-slide"
            onClick={() => handleBookClick(book._id, book.genre)} // Pass bookId and genre
          >
            <img src={book.thumbnail} alt={book.title} />
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
        
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="swiper-button-prev">
        <img src={leftArrow} alt="Left Arrow"/>
      </div>
      <div className="swiper-button-next">
        <img src={rightArrow} alt="Right Arrow"/>
      </div>
    </div>
  );
};

export default Carousel;
