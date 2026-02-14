import React from "react";
import { Footer } from "../components";
import "./IconsPage.css";

export function IconsPage() {
  return (
    <div className="iconsPage">
      <div className="iconsPageContent">
        <div className="comingSoonContainer">
          <div className="comingSoonIcon">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="comingSoonTitle">Slim Icons</h1>
          <p className="comingSoonDescription">
            A comprehensive icon library is <strong style={{ color: "var(--sl-primary)" }}>coming soon</strong>. Stay tuned for beautiful, 
            consistent icons designed for the Slim Design System.
          </p>
          <div className="comingSoonFeatures">
            <div className="featureItem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>100+ Icons</span>
            </div>
            <div className="featureItem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>SVG Format</span>
            </div>
            <div className="featureItem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Theme Support</span>
            </div>
            <div className="featureItem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Easy Integration</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
