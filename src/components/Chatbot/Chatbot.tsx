import React, { useState } from "react";
import { SlimBadge } from "@slimkhemiri/react-design-system";
import "./Chatbot.css";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbotContainer">
      {isOpen && (
        <div className="chatbotWindow">
          <div className="chatbotHeader">
            <div className="chatbotHeaderInfo">
              <div className="chatbotAvatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="chatbotHeaderText">
                <h3 className="chatbotTitle">AI Assistant</h3>
                <SlimBadge variant="warning" size="sm">Coming Soon</SlimBadge>
              </div>
            </div>
            <button
              className="chatbotClose"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="chatbotContent">
            <div className="chatbotComingSoon">
              <div className="chatbotComingSoonIcon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="chatbotComingSoonTitle">AI Assistant Coming Soon</h3>
              <p className="chatbotComingSoonDescription">
                Our AI-powered assistant will help you with questions about the design system, 
                component usage, and best practices. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      )}
      <button
        className="chatbotButton"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
