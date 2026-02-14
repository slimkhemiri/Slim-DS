import React from "react";
import { Link } from "react-router-dom";
import { SlimButton } from "@slimkhemiri/react-design-system";
import { SEO, Footer } from "../components";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for could not be found."
      />
      <div className="notFoundPage">
        <div className="notFoundContent">
          <div className="notFoundIllustration">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
              <text x="100" y="110" fontSize="80" fontWeight="700" fill="currentColor" textAnchor="middle" opacity="0.5">404</text>
            </svg>
          </div>
          
          <h1 className="notFoundTitle">Page Not Found</h1>
          
          <p className="notFoundDescription">
            Oops! The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back on track.
          </p>
          
          <div className="notFoundActions">
            <Link to="/">
              <SlimButton variant="primary" size="lg">
                Go to Homepage
              </SlimButton>
            </Link>
            <Link to="/components">
              <SlimButton variant="secondary" size="lg">
                Browse Components
              </SlimButton>
            </Link>
          </div>
          
          <div className="notFoundLinks">
            <p className="notFoundLinksTitle">Popular Pages:</p>
            <ul className="notFoundLinksList">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/components">Components</Link>
              </li>
              <li>
                <Link to="/documentation">Documentation</Link>
              </li>
              <li>
                <Link to="/colors">Colors</Link>
              </li>
              <li>
                <Link to="/themes">Themes</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
