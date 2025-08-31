import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const sections = ["home", "work", "projects", "contact"];
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState("home");

  // Detect current section in view
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          if (window.scrollY >= offsetTop) {
            current = section;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<header className="fixed top-0 left-0 w-full bg-background/0 dark:bg-background-dark/0 z-50 transition-colors">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center text-text dark:text-text-dark font-semibold gap-y-2">
        
        {/* Navigation links */}
        <div className="flex flex-wrap justify-center w-full sm:w-auto gap-4">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`capitalize px-2 py-1 rounded-md transition-all duration-300 ${
                activeSection === section
                  ? "text-primary dark:text-primary-dark scale-110"
                  : ""
              }`}
            >
              {section}
            </a>
          ))}
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`relative w-14 h-7 flex items-center rounded-full transition-colors duration-300 ${
              theme === "dark" ? "bg-gray-700" : "bg-yellow-400"
            }`}
          >
            <span
              className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                theme === "dark" ? "translate-x-7" : "translate-x-1"
              }`}
            >
              {theme === "dark" ? (
                <FaMoon className="text-gray-700 text-xs" />
              ) : (
                <FaSun className="text-yellow-500 text-xs" />
              )}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
