import React, { useState } from "react";
import '../styles/Dashboard.css';
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header.js";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState(''); 

  const resetSearch = () => {
    setSearchQuery(""); // Reset the search query
  };

  const getHeaderVisibility = () => {
    if (activeItem === "dashboard" || activeItem === "") {
      return { 
        showSearch: true, showUserProfile: true, showArrows: false, pageName: "Dashboard" 
      };
    }
    return {
      showSearch: false,showUserProfile: true,showArrows: false,pageName: ""
    };
  };

  const { showSearch, showUserProfile, showArrows, pageName } = getHeaderVisibility();

  return (
    <>
      <main className="main-content">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          resetSearch={resetSearch}
        />
       <div style={{width:'100%'}}>
        <Header
          showSearch={showSearch}
          showUserProfile={showUserProfile}
          showArrows={showArrows} // Pass showArrows to Header
          pageName={pageName} // Pass pageName to Header
          searchQuery={searchQuery}
          onSearch={(query) => setSearchQuery(query)}
        />
        </div> 
      </main>
    </>
  );
};

export default Dashboard;
