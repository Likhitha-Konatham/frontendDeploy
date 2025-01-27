// import React, { createContext, useState, useEffect } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isLightMode, setIsLightMode] = useState(
//     JSON.parse(localStorage.getItem("isLightMode")) || true
//   );

//   useEffect(() => {
//     // Add or remove the `dark-mode` class from the body
//     document.body.className = isLightMode ? "light-mode" : "dark-mode";
//     // Store the theme in localStorage
//     localStorage.setItem("isLightMode", JSON.stringify(isLightMode));
//     console.log("islightmode", isLightMode);
//   }, [isLightMode]);

//   const toggleTheme = () => {
//     setIsLightMode((prevMode) => !prevMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(
    JSON.parse(localStorage.getItem("isLightMode")) || true
  );

  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    localStorage.setItem("isLightMode", JSON.stringify(newTheme));
    document.body.className = newTheme ? "light-mode" : "dark-mode"; // Update body class
  };

  useEffect(() => {
    // Set initial body class on mount
    document.body.className = isLightMode ? "light-mode" : "dark-mode";
  }, [isLightMode]);

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
