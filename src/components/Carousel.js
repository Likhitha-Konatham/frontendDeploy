import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import '../styles/Carousel.css';

import slide_image_1 from '../images/bookcover1.png';
import slide_image_2 from '../images/bookcover2.png';
import slide_image_3 from '../images/bookcover3.png';
import slide_image_4 from '../images/bookcover1.png';
import slide_image_5 from '../images/bookcover2.png';
import slide_image_6 from '../images/bookcover3.png';
import slide_image_7 from '../images/bookcover1.png';

import leftArrow from '../images/new_release_carousel_leftarrow.png'; 
import rightArrow from '../images/new_release_carousel_rightarrow.png'; 

const Carousel = () => {
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
        <SwiperSlide className="swiper-slide"><img src={slide_image_1} alt="slide_image" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"><img src={slide_image_2} alt="slide_image" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"><img src={slide_image_3} alt="slide_image" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"><img src={slide_image_4} alt="slide_image" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"><img src={slide_image_5} alt="slide_image" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"><img src={slide_image_6} alt="slide_image" /></SwiperSlide>
        <SwiperSlide className="swiper-slide"><img src={slide_image_7} alt="slide_image" /></SwiperSlide>

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
