import React from "react";
import "../styles/BookGrids.css";

const BookGrids = ({ showingBookmarksHeading,thumbnail, authors, title, bookmarkCount}) => {
  return (
    <div className="bookGrid__wrap">
      <div className="bookGrid__heading">{showingBookmarksHeading}</div>
      <div className="bookGrid__grid">
          <div className="bookGrid__grid-item">
            <img src={thumbnail} alt={`${title} Thumbnail`} />
            <div className="bookGrid__details">
              <div className="bookGrid__name">{title}</div>
              <div className="bookGrid__author">{authors.join(", ")}</div>
              <div className="bookGrid__bookmarks">Bookmarks - {bookmarkCount}</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default BookGrids;