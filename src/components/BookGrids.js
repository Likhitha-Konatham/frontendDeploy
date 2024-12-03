import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/BookGrids.css";

const BookGrids = ({ markedBooks, loading }) => {
  const navigate = useNavigate();

  const handleBookClick = (bookid) => {
    navigate(`/view-bookmarks?bookid=${bookid}`); // Append bookid as query parameter
  };

  return (
    <div className="bookGrid__wrap">
      <div className="bookGrid__heading">Showing Bookmarks</div>
      <div className="bookGrid__grid">
        {loading ? ( // Show skeleton loader while loading
          <div className="carousel__skeleton-loader">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="carousel__skeleton-item"></div>
            ))}
          </div>
        ) : ( // Render actual books after loading
          markedBooks.map((book, index) => (
            <div className="bookGrid__grid-item" key={book._id || index}>
              <div onClick={() => handleBookClick(book._id)}>
                <img src={book.thumbnail} alt={`${book.title} Thumbnail`} />
              </div>
              <div className="bookGrid__details">
                <div className="bookGrid__name">{book.title}</div>
                <div className="bookGrid__author">{book.author_list.join(", ")}</div>
                <div className="bookGrid__bookmarks">Bookmarks - {book.bookMarkCount}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookGrids;
