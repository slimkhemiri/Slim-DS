import React from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  theme: "light" | "dark" | "hc";
  setTheme: (theme: "light" | "dark" | "hc") => void;
}

export function Header({ theme, setTheme }: HeaderProps) {
  const location = useLocation();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = React.useState(false);

  const isActive = (path: string) => {
    if (path === "/components") {
      return location.pathname === "/components" || location.pathname.startsWith("/components?");
    }
    return location.pathname === path;
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: "☀️" },
    { value: "dark", label: "Dark", icon: "🌙" },
    { value: "hc", label: "High Contrast", icon: "◐" }
  ];

  const currentTheme = themeOptions.find(opt => opt.value === theme) || themeOptions[0];

  const handleThemeSelect = (value: "light" | "dark" | "hc") => {
    setTheme(value);
    setIsThemeDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.themeDropdown')) {
        setIsThemeDropdownOpen(false);
      }
    };
    
    if (isThemeDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isThemeDropdownOpen]);

  return (
    <header className="header">
      <div className="headerLeft">
        <Link to="/" className="logo" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="logoIcon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1"/>
              <path d="M8 12h16M8 16h16M8 20h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="logoText">
            <span className="logoTitle">Slim Design</span>
            <span className="logoSubtitle">Component Library</span>
          </div>
        </Link>
      </div>
      
      <nav className="headerCenter">
        <Link
          to="/"
          className={`navLink ${isActive("/") ? "active" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Home</span>
        </Link>
        
        <Link
          to="/components"
          className={`navLink ${isActive("/components") ? "active" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="14" y="4" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="4" y="14" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="14" y="14" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Components</span>
        </Link>
        
        <Link
          to="/documentation"
          className={`navLink ${isActive("/documentation") ? "active" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7h8M8 11h8" strokeLinecap="round"/>
          </svg>
          <span>Documentation</span>
        </Link>
        
        <Link
          to="/colors"
          className={`navLink ${isActive("/colors") ? "active" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>Colors</span>
        </Link>
      </nav>
      
      <div className="headerRight">
        <div className={`themeDropdown ${isThemeDropdownOpen ? 'open' : ''}`}>
          <button 
            className="themeDropdownToggle"
            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            aria-label="Select theme"
            aria-expanded={isThemeDropdownOpen}
          >
            <svg className="themeSwitchIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {theme === "dark" ? (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
              ) : theme === "hc" ? (
                <>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2 L12 22" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/>
                </>
              )}
            </svg>
            <span className="themeDropdownLabel">{currentTheme.label}</span>
            <svg className="themeSwitchArrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="themeDropdownMenu">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                className={`themeDropdownItem ${theme === option.value ? 'active' : ''}`}
                onClick={() => handleThemeSelect(option.value as "light" | "dark" | "hc")}
              >
                <span className="themeDropdownItemIcon">{option.icon}</span>
                <span className="themeDropdownItemLabel">{option.label}</span>
                {theme === option.value && (
                  <svg className="themeDropdownItemCheck" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
