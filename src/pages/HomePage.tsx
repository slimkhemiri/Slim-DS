import React from "react";
import { Link } from "react-router-dom";
import { SlimButton, SlimBadge } from "@slimkhemiri/react-design-system";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="homePage">
      {/* Hero Section */}
      <section className="hero">
        <div className="heroContent">
          <SlimBadge variant="primary" size="sm">v0.1.13</SlimBadge>
          <h1 className="heroTitle">
            Slim Design System
          </h1>
          <p className="heroSubtitle">
            A modern, accessible, and lightweight design system built for financial applications.
            Create beautiful user interfaces with pre-built components and design tokens.
          </p>
          <div className="heroActions">
            <Link to="/components">
              <SlimButton variant="primary" size="lg">
                Get Started
              </SlimButton>
            </Link>
            <a
              href="https://www.npmjs.com/package/@slimkhemiri/react-design-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SlimButton variant="secondary" size="lg">
                View on NPM
              </SlimButton>
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Why Slim Design?</h2>
          <p className="sectionSubtitle">
            Everything you need to build modern web applications
          </p>
        </div>

        <div className="featuresGrid">
          <div className="featureCard">
            <div className="featureIcon">🎨</div>
            <h3 className="featureTitle">Design Tokens</h3>
            <p className="featureDescription">
              Consistent design language with customizable tokens for colors, spacing, typography, and more.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">⚡</div>
            <h3 className="featureTitle">Lightning Fast</h3>
            <p className="featureDescription">
              Built with Web Components and optimized for performance. Zero runtime overhead.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">♿</div>
            <h3 className="featureTitle">Accessible</h3>
            <p className="featureDescription">
              WCAG 2.1 compliant components with keyboard navigation and screen reader support.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">🌙</div>
            <h3 className="featureTitle">Dark Mode</h3>
            <p className="featureDescription">
              Built-in theme support including light, dark, and high contrast modes out of the box.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">📦</div>
            <h3 className="featureTitle">Framework Agnostic</h3>
            <p className="featureDescription">
              Use with React, Vue, Angular, or vanilla JavaScript. Works everywhere.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureIcon">🔧</div>
            <h3 className="featureTitle">TypeScript First</h3>
            <p className="featureDescription">
              Fully typed components with excellent IDE support and autocompletion.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="quickStart">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Quick Start</h2>
          <p className="sectionSubtitle">Get up and running in minutes</p>
        </div>

        <div className="quickStartContent">
          <div className="codeBlock">
            <div className="codeBlockHeader">
              <span className="codeBlockTitle">Install via NPM</span>
            </div>
            <pre className="codeBlockContent">
              <code>npm install @slimkhemiri/react-design-system</code>
            </pre>
          </div>

          <div className="codeBlock">
            <div className="codeBlockHeader">
              <span className="codeBlockTitle">Import and Use</span>
            </div>
            <pre className="codeBlockContent">
              <code>{`import { SlimButton } from "@slimkhemiri/react-design-system";

function App() {
  return <SlimButton variant="primary">Click me</SlimButton>;
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section className="componentsPreview">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Explore Components</h2>
          <p className="sectionSubtitle">
            Pre-built components ready to use in your applications
          </p>
        </div>

        <div className="componentCategories">
          <Link to="/components?demo=buttons" className="categoryCard">
            <div className="categoryIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9h12a3 3 0 0 1 0 6H6a3 3 0 0 1 0-6Z" strokeLinejoin="round" />
                <path d="M10 12h4" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="categoryTitle">Buttons</h3>
            <p className="categoryDescription">Primary, secondary, ghost, and loading states</p>
          </Link>

          <Link to="/components?demo=inputs" className="categoryCard">
            <div className="categoryIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 7h14v10H5V7Z" strokeLinejoin="round" />
                <path d="M8 12h8" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="categoryTitle">Form Controls</h3>
            <p className="categoryDescription">Inputs, selects, checkboxes, and switches</p>
          </Link>

          <Link to="/components?demo=alerts" className="categoryCard">
            <div className="categoryIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3 2.8 20h18.4L12 3Z" strokeLinejoin="round" />
                <path d="M12 9v4" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill="currentColor" />
              </svg>
            </div>
            <h3 className="categoryTitle">Alerts</h3>
            <p className="categoryDescription">Info, success, warning, and danger variants</p>
          </Link>

          <Link to="/components?demo=badges" className="categoryCard">
            <div className="categoryIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2 9 5H5v4l-3 3 3 3v4h4l3 3 3-3h4v-4l3-3-3-3V5h-4l-3-3Z" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="categoryTitle">Badges</h3>
            <p className="categoryDescription">Status indicators and labels</p>
          </Link>
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link to="/components">
            <SlimButton variant="primary">View All Components</SlimButton>
          </Link>
        </div>
      </section>

      {/* Resources */}
      <section className="resources">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Resources</h2>
          <p className="sectionSubtitle">Everything you need to get started</p>
        </div>

        <div className="resourcesGrid">
          <Link to="/documentation" className="resourceCard">
            <div className="resourceIcon">📚</div>
            <h3 className="resourceTitle">Documentation</h3>
            <p className="resourceDescription">
              Comprehensive guides and API references
            </p>
            <span className="resourceLink">Read docs →</span>
          </Link>

          <Link to="/colors" className="resourceCard">
            <div className="resourceIcon">🎨</div>
            <h3 className="resourceTitle">Color Palette</h3>
            <p className="resourceDescription">
              Explore the color system and design tokens
            </p>
            <span className="resourceLink">View colors →</span>
          </Link>

          <a
            href="https://github.com/slimkhemiri/slim-design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="resourceCard"
          >
            <div className="resourceIcon">💻</div>
            <h3 className="resourceTitle">GitHub</h3>
            <p className="resourceDescription">
              View source code and contribute
            </p>
            <span className="resourceLink">Visit repo →</span>
          </a>
        </div>
      </section>
    </div>
  );
}
