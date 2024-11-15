import React from "react";
import "../styles/BookGrids.css";

const BookGrids = ({ heading, bookGridImages }) => {
  return (
    <div className="bookGrid__wrap">
      <div className="bookGrid__heading">{heading}</div>
      <div className="bookGrid__grid">
        {bookGridImages.map((item, index) => (
          <div key={index} className="bookGrid__grid-item">
            <img src={item.image} alt={`bookGrid-item-${index}`} />
            <div className="bookGrid__details">
              <div className="bookGrid__name">{item.name}</div>
              <div className="bookGrid__author">{item.author}</div>
              <div className="bookGrid__bookmarks">Bookmarks - {item.bookmarks}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrids;
