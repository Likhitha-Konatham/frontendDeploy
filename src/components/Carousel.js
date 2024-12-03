import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { fetchAllBooks } from '../services/AllServices';
import { getToken } from '../storage/Storage'; // Import the token utility
import '../styles/Carousel.css';

import leftArrow from '../images/new_release_carousel_leftarrow.png'; 
import rightArrow from '../images/new_release_carousel_rightarrow.png'; 

const Carousel = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    };
    fetchToken();

    const getBooks = async () => {
      try {
        const response = await fetchAllBooks();
        const sortedBooks = response.data
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .slice(0, 6);
        setBooks(sortedBooks);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false); // Set loading to false on error
      }
    };
    getBooks();
  }, []);

  const handleSlideClick = (bookId) => {
    if (!token) {
      navigate('/signin');
    } else {
      navigate(`/book-info/${bookId}`, { state: { books } });
    }
  };

  return (
    <div className="new-rleases-carousel-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={2}
        spaceBetween={-20}
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
        {loading ? (
          // Skeleton loader while books are loading
          [...Array(6)].map((_, index) => (
            <SwiperSlide key={index} className="swiper-slide carousel-skeleton-item">
              <div className="carousel-skeleton-image"></div>
            </SwiperSlide>
          ))
        ) : (
          books.map((book) => (
            <SwiperSlide
              key={book._id}
              className="swiper-slide"
              onClick={() => handleSlideClick(book._id)} // Token check on click
            >
              <img src={book.thumbnail} alt={book.title} />
            </SwiperSlide>
          ))
        )}
        <div className="swiper-pagination"></div>
      </Swiper>

      <div className="swiper-button-prev">
        <img src={leftArrow} alt="Left Arrow" />
      </div>
      <div className="swiper-button-next">
        <img src={rightArrow} alt="Right Arrow" />
      </div>
    </div>
  );
};

export default Carousel;
