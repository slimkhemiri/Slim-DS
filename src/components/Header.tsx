import React from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  theme: "light" | "dark" | "hc";
  setTheme: (theme: "light" | "dark" | "hc") => void;
}

export function Header({ theme, setTheme }: HeaderProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/components") {
      return location.pathname === "/components" || location.pathname.startsWith("/components?");
    }
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="headerLeft">
        <Link to="/" className="title" style={{ textDecoration: "none", color: "inherit" }}>
          Slim Design
        </Link>
      </div>
      <div className="headerCenter">
        <Link
          to="/components"
          className={`navLink ${isActive("/components") ? "active" : ""}`}
        >
          🧩 Components
        </Link>
        <Link
          to="/documentation"
          className={`navLink ${isActive("/documentation") ? "active" : ""}`}
        >
          📚 Documentation
        </Link>
        <Link
          to="/colors"
          className={`navLink ${isActive("/colors") ? "active" : ""}`}
        >
          🎨 Colors
        </Link>
      </div>
      <div className="headerRight">
        <label className="themeLabel" htmlFor="theme">
          Theme
        </label>
        <select
          id="theme"
          className="themeSelect"
          value={theme}
          onChange={(e) => setTheme(e.currentTarget.value as "light" | "dark" | "hc")}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="hc">High contrast</option>
        </select>
      </div>
    </header>
  );
}
