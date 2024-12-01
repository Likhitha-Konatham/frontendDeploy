import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";
import Carousel from "../components/Carousel.js";
import GenreCarousel from "../components/Genre_carousel.js";
import InProgessBooksBar from "../components/InProgressBooksBar.js";
import { fetchAllGenreBooks } from "../services/AllServices.js";

const LandingPage = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [genreBooks, setGenreBooks] = useState({}); // Object to hold genre and their books
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenreBooks = async () => {
      try {
        const response = await fetchAllGenreBooks(); // Fetch data from API
        setGenreBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch genre books:", error);
      }
    };

    fetchGenreBooks();
  }, []);

  const resetSearch = () => {
    setSearchQuery(""); // Reset the search query
  };

  const handleActiveItemChange = (item) => {
    setActiveItem(item); // Update active item
    if (item === "dashboard") {
      navigate("/"); // Navigate to dashboard
    } else if (item === "bookmarks") {
      navigate("/bookmarks"); // Navigate to bookmarks
    } else if (item === "library") {
      navigate("/library"); // Navigate to library
    } else if (item === "settings") {
      navigate("/settings"); // Navigate to settings
    }
    resetSearch(); // Reset search whenever a new section is selected
  };

  const getHeaderVisibility = () => {
    if (activeItem === "dashboard" || activeItem === "") {
      return { showSearch: true, showUserProfile: true, showArrows: false, pageName: "Dashboard" };
    }
  };

  const { showSearch, showUserProfile, showArrows, pageName } = getHeaderVisibility();

  const handleProfileClick = () => {
    navigate("/settings", { state: { selectedSection: "account" } });
  };

  return (
    <main className="main-content">
      <div className="sidebar_container">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={handleActiveItemChange}
          resetSearch={resetSearch}
        />
      </div>

      <div className="dashboard_container">
        <div className="header_container">
          <Header
            showSearch={showSearch}
            showUserProfile={showUserProfile}
            showArrows={showArrows}
            pageName={pageName}
            searchQuery={searchQuery}
            onSearch={(query) => setSearchQuery(query)}
            onProfileClick={handleProfileClick} 
          />
        </div>
        <div className="dashboard_body">
          <div className="carousels_container">
            <div className="new_releases_carousel">
              <Carousel />
            </div>
            {genreBooks && Object.keys(genreBooks).map((genre, index) => (
              <div className="genre_carousel" key={index}>
                <GenreCarousel
                  heading={genre}
                  genre_carousel_images={genreBooks[genre]?.map((book) => ({
                    image: book.thumbnail,
                    id: book._id,
                  }))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;

