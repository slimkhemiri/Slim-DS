import React from "react";
import { Link } from "react-router-dom";
import { SlimButton, SlimBadge } from "@slimkhemiri/react-design-system";
import { Footer, PremiumGate } from "../components";
import { useAuth } from "../contexts/AuthContext";
import "./ResourcesPage.css";

export function ResourcesPage() {
  const { user } = useAuth();
  const designResources = [
    {
      title: "Sketch Symbols",
      description: "Sketch Symbols for Desktop",
      type: "official",
      category: "Design Resources",
    },
    {
      title: "Mobile Components",
      description: "Sketch Symbols File for Mobile",
      type: "official",
      category: "Design Resources",
    },
    {
      title: "Slim Design Pro",
      description: "Common Templates and Pages",
      type: "official",
      category: "Design Resources",
    },
    {
      title: "Figma Resources",
      description: "Always up-to-date Slim Design Figma resources",
      type: "third-party",
      category: "Design Resources",
    },
    {
      title: "Figma Open Source Library",
      description: "Free open source Figma library with complete accurate to code components",
      type: "third-party",
      category: "Design Resources",
    },
    {
      title: "UI Kit for Adobe XD",
      description: "Library of components for Desktop",
      type: "third-party",
      category: "Design Resources",
    },
  ];

  const articles = [
    {
      title: "Getting Started with Slim Design System",
      description: "Learn the fundamentals and best practices for using Slim Design System in your projects.",
      category: "Articles",
    },
    {
      title: "Design Tokens and Theming",
      description: "Understanding how to customize and extend the design system with tokens.",
      category: "Articles",
    },
    {
      title: "Component Patterns and Usage",
      description: "Best practices for implementing components in real-world applications.",
      category: "Articles",
    },
    {
      title: "Accessibility Guidelines",
      description: "How to build accessible interfaces using Slim Design System components.",
      category: "Articles",
    },
  ];

  const references = [
    {
      title: "About Face 4",
      description: "The Interactive Design Guide for Digital Products and System",
      color: "#C7EBD6",
      category: "Reference",
    },
    {
      title: "Designing Web Interfaces",
      description: "Best Practice, Patterns and Principles for Web Interface",
      color: "#009C94",
      category: "Reference",
    },
    {
      title: "Designing Interfaces",
      description: "Interface Design Guidelines",
      color: "#9489CF",
      category: "Reference",
    },
    {
      title: "Non-Designer's Design Book, The, 4th Edition",
      description: "Basic Principles of Good Design",
      color: "#FAF0CD",
      category: "Reference",
    },
    {
      title: "The Design of Everyday Things",
      description: "About the People-oriented Design Philosophy",
      color: "#F8F3D1",
      category: "Reference",
    },
    {
      title: "Emotional Design",
      description: "Explain the Role of Emotional Factors in Design",
      color: "#E8EEB4",
      category: "Reference",
    },
    {
      title: "Web Form Design",
      description: "The Essence of Form Design",
      color: "#C2DAED",
      category: "Reference",
    },
  ];

  return (
    <div className="resourcesPage">
      <div className="resourcesPageContent">
        {/* Header Section */}
        <div className="resourcesHeader">
          <h1 className="resourcesTitle">Resources</h1>
          <p className="resourcesSubtitle">
            List all the resources that are related with Slim Design System here.
          </p>
        </div>

        {/* Design Resources Section */}
        <section className="resourcesSection">
          <h2 className="sectionTitle">Design Resources</h2>
          <p className="sectionDescription">
            Please find below some of the design resources and tools about Slim Design System that we consider valuable. 
            More of this is still being collected.
          </p>
          <div className="resourcesGrid">
            {designResources.map((resource, index) => (
              <div key={index} className="resourceCard">
                <div className="resourceHeader">
                  <h3 className="resourceTitle">{resource.title}</h3>
                  <span className={`resourceBadge ${resource.type}`}>
                    {resource.type === "official" ? "Official" : "Third Party"}
                  </span>
                </div>
                <p className="resourceDescription">{resource.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className="resourcesSection">
          <h2 className="sectionTitle">Articles</h2>
          <p className="sectionDescription">
            Do you want to know the story behind the Slim Design System? How can I better apply Slim Design System? 
            You can check out our well selected articles below.
          </p>
          <div className="resourcesGrid">
            {articles.map((article, index) => (
              <div key={index} className="resourceCard article">
                <div className="articleIcon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 7h8M8 11h8" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="resourceTitle">{article.title}</h3>
                <p className="resourceDescription">{article.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reference Section */}
        <section className="resourcesSection">
          <h2 className="sectionTitle">Reference</h2>
          <p className="sectionDescription">
            Please find below the books that inspired us, saved our time and helped us to overcome difficulties 
            when designing components and patterns. If you want to know more about UI design, we recommend you 
            these awesome design systems: Material Design, Human Interface Guidelines, Lightning Design System.
          </p>
          <div className="referencesGrid">
            {references.map((reference, index) => (
              <div key={index} className="referenceCard">
                <div className="referenceColorBar" style={{ backgroundColor: reference.color }}></div>
                <div className="referenceContent">
                  <h3 className="referenceTitle">{reference.title}</h3>
                  <p className="referenceDescription">{reference.description}</p>
                  <span className="referenceColorCode">{reference.color}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="resourcesSection">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <h2 className="sectionTitle">Premium Features</h2>
            <SlimBadge variant="primary" size="sm">Premium</SlimBadge>
          </div>
          <p className="sectionDescription">
            Unlock exclusive premium resources and features available only to Pro and Enterprise subscribers.
          </p>
          
          <PremiumGate featureName="Premium Resources">
            <div className="resourcesGrid">
              <div className="resourceCard premium">
                <div className="resourceHeader">
                  <h3 className="resourceTitle">Hacker Mode Color Palette</h3>
                  <span className="resourceBadge premium">Premium</span>
                </div>
                <p className="resourceDescription">
                  Exclusive dark green color palette with terminal-inspired aesthetics. Perfect for developer tools and security applications.
                </p>
                <Link to="/colors" style={{ marginTop: "12px", display: "inline-block" }}>
                  <SlimButton variant="primary" size="sm">View Colors</SlimButton>
                </Link>
              </div>

              <div className="resourceCard premium">
                <div className="resourceHeader">
                  <h3 className="resourceTitle">Advanced Component Library</h3>
                  <span className="resourceBadge premium">Premium</span>
                </div>
                <p className="resourceDescription">
                  Access to premium components including data tables, advanced charts, calendars, and more complex UI patterns.
                </p>
                <Link to="/premium" style={{ marginTop: "12px", display: "inline-block" }}>
                  <SlimButton variant="primary" size="sm">Explore Features</SlimButton>
                </Link>
              </div>

              <div className="resourceCard premium">
                <div className="resourceHeader">
                  <h3 className="resourceTitle">Custom Theme Builder</h3>
                  <span className="resourceBadge premium">Premium</span>
                </div>
                <p className="resourceDescription">
                  Visual theme builder tool to create and export custom themes with your brand colors and design tokens.
                </p>
                <Link to="/premium" style={{ marginTop: "12px", display: "inline-block" }}>
                  <SlimButton variant="primary" size="sm">Try Theme Builder</SlimButton>
                </Link>
              </div>

              <div className="resourceCard premium">
                <div className="resourceHeader">
                  <h3 className="resourceTitle">Design Token Export</h3>
                  <span className="resourceBadge premium">Premium</span>
                </div>
                <p className="resourceDescription">
                  Export design tokens in multiple formats (JSON, CSS, SCSS, TypeScript) for seamless integration with your projects.
                </p>
                <Link to="/premium" style={{ marginTop: "12px", display: "inline-block" }}>
                  <SlimButton variant="primary" size="sm">Learn More</SlimButton>
                </Link>
              </div>

              <div className="resourceCard premium">
                <div className="resourceHeader">
                  <h3 className="resourceTitle">REST API Access</h3>
                  <span className="resourceBadge premium">Premium</span>
                </div>
                <p className="resourceDescription">
                  Programmatic access to component documentation, design tokens, and system information via REST API.
                </p>
                <Link to="/premium" style={{ marginTop: "12px", display: "inline-block" }}>
                  <SlimButton variant="primary" size="sm">View API Docs</SlimButton>
                </Link>
              </div>

              <div className="resourceCard premium">
                <div className="resourceHeader">
                  <h3 className="resourceTitle">Priority Support</h3>
                  <span className="resourceBadge premium">Premium</span>
                </div>
                <p className="resourceDescription">
                  Get faster response times, dedicated support channels, and direct access to the development team.
                </p>
                <Link to="/pricing" style={{ marginTop: "12px", display: "inline-block" }}>
                  <SlimButton variant="primary" size="sm">Upgrade Now</SlimButton>
                </Link>
              </div>
            </div>
          </PremiumGate>

          {!user?.isPremium && (
            <div style={{ 
              marginTop: "32px", 
              padding: "32px", 
              background: "linear-gradient(135deg, var(--sl-primary, #581d74) 0%, rgba(88, 29, 116, 0.9) 100%)",
              borderRadius: "var(--sl-radius-2)",
              textAlign: "center",
              color: "white"
            }}>
              <h3 style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 12px 0" }}>
                Unlock Premium Resources
              </h3>
              <p style={{ fontSize: "16px", margin: "0 0 24px 0", opacity: 0.9 }}>
                Get access to all premium features, exclusive color palettes, advanced components, and priority support.
              </p>
              <Link to="/pricing">
                <SlimButton variant="secondary" size="lg" style={{ background: "white", color: "var(--sl-primary)" }}>
                  View Pricing Plans
                </SlimButton>
              </Link>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}
