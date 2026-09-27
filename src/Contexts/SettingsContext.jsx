import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Sidebar collapsed
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Optional: apply dark class to body/html
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem(
      "sidebarCollapsed",
      sidebarCollapsed
    );
  }, [sidebarCollapsed]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,

        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
};