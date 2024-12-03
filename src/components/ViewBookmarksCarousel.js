import React, { useEffect, useState } from "react";
import "../styles/ViewBookmarksCarousel.css";
import bigLeftArrow from "../images/bigLeftArrow.png";
import bigRightArrow from "../images/bigRightArrow.png";
import playIcon from "../images/playIcon.png";
import delIcon from "../images/delIcon.png";
import { fetchUserBookmarks } from "../services/AllServices.js";
import { useSearchParams } from "react-router-dom";

const ViewBookmarksCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [markedBooks, setMarkedBooks] = useState([]);
  const [selectedBookIdx, setSelectedBookIdx] = useState(0);
  const [searchParams] = useSearchParams();
  const bookid = searchParams.get("bookid");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetchUserBookmarks(); // Fetch data from API
        const books = response.data || [];
        setMarkedBooks(books);
        console.log('marks',response.data)

        // Find the index of the book with the given bookid
        const bookIndex = books.findIndex((book) => book._id === bookid);
        if (bookIndex !== -1) {
          setCurrentIdx(Math.max(0, bookIndex - 4)); // Set to show the book at the center of the carousel
          setSelectedBookIdx(bookIndex);
        }
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBookmarks();
  }, [bookid]);

  const maxIndex = Math.max(0, markedBooks.length - 10);

  const prevSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? maxIndex : prevIdx - 1));
  };

  const nextSlide = () => {
    setCurrentIdx((prevIdx) => (prevIdx === maxIndex ? 0 : prevIdx + 1));
  };

  const handleBookSelect = (index) => {
    setSelectedBookIdx(index);
  };

  const selectedBook = markedBooks[selectedBookIdx];
  const selectedSection = selectedBook?.sections[0]; // Display the first section as default

  return (
    <div className="viewbookmarks_carousel__wrap">
      <div className="viewbookmarks_carousel__inner">
        <button className="viewbookmarks_carousel__btn" onClick={prevSlide}>
          <div className="viewbookmarks_carousel__btn--prev">
            <img src={bigLeftArrow} alt="Previous" className="viewbookmarks_carousel__btn-arrow" />
          </div>
        </button>

        <div className="viewbookmarks_carousel__container">
          <div className="viewbookmarks_heading">View Bookmarks</div>
           {loading ? ( // Show skeleton loader while loading
            <div className="viewbookmarks__skeleton-loader">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="viewbookmarks__skeleton-item"></div>
              ))}
            </div>
            ) : ( 
              <div
                className="viewbookmarks_carousel__slide-list"
                style={{ transform: `translateX(-${currentIdx * (10.3 + 2)}vw)` }}
              >
                {markedBooks.map((book, index) => (
                  <div
                    key={book._id}
                    className={`viewbookmarks_carousel__slide-item ${
                      index === selectedBookIdx ? "active" : ""
                    }`}
                    onClick={() => handleBookSelect(index)}
                  >
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="viewbookmarks_carousel__slide-thumbnail"
                    />
                  </div>
                ))}
              </div>
            )}
        </div>

        <button className="viewbookmarks_carousel__btn" onClick={nextSlide}>
          <div className="viewbookmarks_carousel__btn--next">
            <img src={bigRightArrow} alt="Next" className="viewbookmarks_carousel__btn-arrow" />
          </div>
        </button>
      </div>

      {/* Dynamic content based on selected book */}
      <div className="bookmarks_section_container">
        <div className="play_container">
          <div className="play_img">
            <img src={playIcon} alt="play icon" />
          </div>
        </div>
        <div className="section_info_container">
          <div className="section_bookname">{selectedBook?.title || "NA"}</div>
          <div className="section_time">7:25 - 7:30</div>
        </div>
        <div className="section_content_container">
          <p className="section_content">
            {selectedSection?.text || "No content available"}
          </p>
          <div className="section_delete">
            <div className="del_img">
              <img src={delIcon} alt="delete" />
            </div>
            <div className="del_text">Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookmarksCarousel;
