import React from 'react';
import '../styles/InProgessBooksBar.css';

const InProgessBooksBar = ({inProgressBooks}) => {
  return (
    <div className="progressbar_container">
      <h3 className="progressbook_title">Continue Reading</h3>
      <div className="progessbar-book-list">
        {inProgressBooks.map((book, index) => (
          <div key={index} className={`progress-container ${book.colorClass}-bg`}>
            <div
              className={`progress-bar ${book.colorClass}`}
              style={{ width: `${book.percentage}%` }}
            >
              <div className="text-container">
                <span className="percentage-text">{book.percentage}%</span>
                <span className="book-name">{book.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgessBooksBar;
