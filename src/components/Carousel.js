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
            slidesPerView: 2,  
            spaceBetween: 200,   
          },
          480: {
            slidesPerView: 2, 
            spaceBetween: 120,   
          },
          768: {
            slidesPerView: 2,  
            spaceBetween: 20,  
          },
          1024: {
            slidesPerView: 2,  
            spaceBetween: -65,  
          },
        }}
      >
        {books.map((book) => (
          <SwiperSlide
            key={book._id}
            className="swiper-slide"
            onClick={() => navigate(`/book-info/${book._id}`, { state: { books } })} 
            
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
