import React from "react";
import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerSection">
          <div className="footerBrand">
            <div className="footerLogo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1"/>
                <path d="M8 12h16M8 16h16M8 20h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="footerTitle">Slim Design System</h3>
              <p className="footerDescription">
                A modern, accessible design system for building beautiful interfaces.
              </p>
            </div>
          </div>
        </div>

        <div className="footerSection">
          <h4 className="footerSectionTitle">Resources</h4>
          <ul className="footerLinks">
            <li>
              <a href="/" className="footerLink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Home
              </a>
            </li>
            <li>
              <a href="/components" className="footerLink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="4" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="14" y="4" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="4" y="14" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="14" y="14" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Components
              </a>
            </li>
            <li>
              <a href="/documentation" className="footerLink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Documentation
              </a>
            </li>
            <li>
              <a href="/colors" className="footerLink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Colors
              </a>
            </li>
          </ul>
        </div>

        <div className="footerSection">
          <h4 className="footerSectionTitle">Community</h4>
          <ul className="footerLinks">
            <li>
              <a 
                href="https://www.npmjs.com/package/@slimkhemiri/react-design-system" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footerLink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                NPM Package
              </a>
            </li>
            <li>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footerLink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footerLink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Twitter
              </a>
            </li>
            <li>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footerLink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12h8M12 8v8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Discord
              </a>
            </li>
          </ul>
        </div>

        <div className="footerSection">
          <h4 className="footerSectionTitle">Legal</h4>
          <ul className="footerLinks">
            <li>
              <a href="#" className="footerLink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footerLink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Terms of Service
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/slimkhemiri/slim-design/blob/main/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footerLink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                MIT License
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footerBottom">
        <div className="footerBottomContent">
          <p className="footerCopyright">
            © {currentYear} Slim Design System. Built with ❤️ by{" "}
            <a 
              href="https://github.com/slimkhemiri" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footerAuthor"
            >
              Slim Khemiri
            </a>
          </p>
          <div className="footerVersion">
            <span className="versionBadge">v0.1.13</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
