import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference, default to 'light'
    const savedTheme = localStorage.getItem("theme");
    console.log("Initial theme from localStorage:", savedTheme);
    if (savedTheme) {
      return savedTheme;
    }

    // TEMPORARILY force light mode to test - comment out system preference check
    // if (
    //   window.matchMedia &&
    //   window.matchMedia("(prefers-color-scheme: dark)").matches
    // ) {
    //   return "dark";
    // }

    return "light";
  });

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;

    console.log("Theme changed to:", theme); // Debug log

    if (theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);

    console.log("HTML classList:", root.classList.toString()); // Debug log
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeInfo = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};
