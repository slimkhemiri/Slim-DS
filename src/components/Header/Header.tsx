import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlimButton, SlimBadge } from "@slimkhemiri/react-design-system";
import { useAuth } from "../../contexts/AuthContext";
import logoImage from "../../icons/logo.png";

interface HeaderProps {
  theme: "light" | "dark" | "hc" | "hacker";
  setTheme: (theme: "light" | "dark" | "hc" | "hacker") => void;
}

export function Header({ theme, setTheme }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const isActive = (path: string) => {
    if (path === "/components") {
      return location.pathname === "/components" || location.pathname.startsWith("/components?");
    }
    if (path === "/icons") {
      return location.pathname === "/icons";
    }
    if (path === "/themes") {
      return location.pathname === "/themes";
    }
    if (path === "/login") {
      return location.pathname === "/login";
    }
    if (path === "/signup") {
      return location.pathname === "/signup";
    }
    return location.pathname === path;
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: "☀️", premium: false },
    { value: "dark", label: "Dark", icon: "🌙", premium: false },
    { value: "hc", label: "High Contrast", icon: "◐", premium: false },
    ...(user?.isPremium ? [{ value: "hacker", label: "Hacker Mode", icon: "💚", premium: true }] : [])
  ];

  const currentTheme = themeOptions.find(opt => opt.value === theme) || themeOptions[0];

  const handleThemeSelect = (value: "light" | "dark" | "hc" | "hacker") => {
    setTheme(value);
    setIsThemeDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.themeDropdown')) {
        setIsThemeDropdownOpen(false);
      }
      if (!target.closest('.userMenu')) {
        setIsUserMenuOpen(false);
      }
    };
    
    if (isThemeDropdownOpen || isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isThemeDropdownOpen, isUserMenuOpen]);

  return (
    <header className="header" role="banner">
      <div className="headerLeft">
        <Link 
          to="/" 
          className="logo" 
          style={{ textDecoration: "none", color: "inherit" }}
          aria-label="Slim Design System - Go to homepage"
        >
          <div className="logoIcon">
            <img src={logoImage} alt="Slim Design System logo" className="logoImage" />
          </div>
          <div className="logoText">
            <span className="logoTitle">
              <span className="logoTitleText">Slim</span>
            </span>
            <span className="logoSubtitle">Design System</span>
          </div>
        </Link>
      </div>
      
      <nav className="headerCenter" aria-label="Main navigation">
        {/* <Link
          to="/"
          className={`navLink ${isActive("/") ? "active" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Home</span>
        </Link> */}
        
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
        
        <Link
          to="/icons"
          className={`navLink ${isActive("/icons") ? "active" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Icons</span>
        </Link>
        
        <Link
          to="/themes"
          className={`navLink ${isActive("/themes") ? "active" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" strokeLinecap="round"/>
          </svg>
          <span>Themes</span>
        </Link>
        
        <Link
          to="/ai-design"
          className={`navLink ${isActive("/ai-design") ? "active" : ""} ${user?.isPremium ? "" : "premium"}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5Z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            <path d="M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="17" cy="7" r="1.5"/>
            <circle cx="17" cy="12" r="1.5"/>
            <circle cx="17" cy="17" r="1.5"/>
          </svg>
          <span>AI Design</span>
        </Link>

        {/* {!user && (
          <>
            <Link
              to="/login"
              className={`navLink ${isActive("/login") ? "active" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Login</span>
            </Link>

            <Link
              to="/signup"
              className={`navLink ${isActive("/signup") ? "active" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM19 8v6M22 11h-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Sign Up</span>
            </Link>
          </>
        )} */}
      </nav>
      
      <div className="headerRight">
        {!user ? (
          <>
            <Link to="/pricing" style={{ marginRight: "12px" }}>
              <SlimButton variant="primary" size="sm">
                Upgrade
              </SlimButton>
            </Link>
            <Link to="/login" style={{ marginRight: "12px" }} aria-label="Login">
              <button
                className="themeDropdownToggle themeDropdownToggleIcon"
                style={{ padding: "6px", minWidth: "32px", width: "32px", height: "32px" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </Link>
          </>
        ) : (
          <div className="userMenu" style={{ position: "relative", marginRight: "12px" }}>
            <button
              className="userMenuButton userMenuButtonIcon"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label={`User menu - ${user.email}${user.isPremium ? ' (Premium)' : ''}`}
              aria-expanded={isUserMenuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {user.isPremium && (
                <span className="userMenuPremiumIndicator" title="Premium User">⭐</span>
              )}
            </button>
            {isUserMenuOpen && (
              <div className="userMenuDropdown">
                <Link 
                  to="/profile" 
                  className="userMenuProfile"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="userMenuProfileAvatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="userMenuProfileInfo">
                    <div className="userMenuProfileEmail">{user.email}</div>
                    {user.isPremium && (
                      <SlimBadge variant="primary" size="sm" style={{ fontSize: "10px", padding: "2px 6px", marginTop: "4px" }}>
                        Premium
                      </SlimBadge>
                    )}
                  </div>
                  <svg className="userMenuProfileArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <div className="userMenuDivider"></div>
                <Link to="/premium" className="userMenuItem" onClick={() => setIsUserMenuOpen(false)}>
                  <svg className="userMenuItemIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Premium Features</span>
                </Link>
                {!user.isPremium && (
                  <Link to="/pricing" className="userMenuItem" onClick={() => setIsUserMenuOpen(false)}>
                    <svg className="userMenuItemIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 22.02L12 18.77L5.82 22.02L7 14.14L2 9.27L9.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Upgrade to Premium</span>
                  </Link>
                )}
                <button className="userMenuItem" onClick={() => { logout(); setIsUserMenuOpen(false); }}>
                  <svg className="userMenuItemIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
        <div className={`themeDropdown ${isThemeDropdownOpen ? 'open' : ''}`}>
          <button 
            className="themeDropdownToggle themeDropdownToggleIcon"
            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            aria-label={`Current theme: ${currentTheme.label}. Click to change theme`}
            aria-expanded={isThemeDropdownOpen}
            aria-haspopup="true"
          >
            <svg className="themeSwitchIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {theme === "dark" ? (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
              ) : theme === "hc" ? (
                <>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2 L12 22" strokeLinecap="round"/>
                </>
              ) : theme === "hacker" ? (
                <>
                  <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 8h12M6 12h8M6 16h4" strokeLinecap="round"/>
                  <circle cx="18" cy="12" r="1" fill="currentColor"/>
                </>
              ) : (
                <>
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
          
          <div 
            className="themeDropdownMenu"
            role="menu"
            aria-label="Theme selection menu"
          >
            {themeOptions.map((option) => (
              <button
                key={option.value}
                className={`themeDropdownItem ${theme === option.value ? 'active' : ''}`}
                onClick={() => handleThemeSelect(option.value as "light" | "dark" | "hc" | "hacker")}
                role="menuitem"
                aria-label={`Switch to ${option.label} theme`}
                aria-checked={theme === option.value}
              >
                <span className="themeDropdownItemIcon">{option.icon}</span>
                <span className="themeDropdownItemLabel">{option.label}</span>
                {option.premium && (
                  <SlimBadge variant="primary" size="sm" style={{ fontSize: "10px", padding: "2px 6px", marginLeft: "auto" }}>
                    Premium
                  </SlimBadge>
                )}
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
