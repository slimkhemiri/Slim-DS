import React from "react";
import { Link } from "react-router-dom";
import { SlimButton, SlimBadge } from "@slimkhemiri/react-design-system";
import { CodeBlock, Footer, SEO, FreeTrialBanner } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import "./HomePage.css";

export function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <SEO
        title="Home"
        description="A modern, accessible, and lightweight design system built for financial applications. Create beautiful user interfaces with pre-built components and design tokens."
        keywords="design system, component library, React, TypeScript, UI components, accessible design, financial applications"
      />
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
            <Link to="/premium">
              <SlimButton variant="secondary" size="lg">
                Premium Features
              </SlimButton>
            </Link>
          </div>
          
          {!user && (
            <div className="heroAuth">
              <p className="heroAuthText">Already have an account?</p>
              <div className="heroAuthButtons">
                <Link to="/login">
                  <SlimButton variant="secondary" size="md">
                    Sign In
                  </SlimButton>
                </Link>
                <Link to="/signup">
                  <SlimButton variant="primary" size="md">
                    Sign Up
                  </SlimButton>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Free Trial Banner */}
      <FreeTrialBanner />

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
          <CodeBlock
            title="Install via NPM"
            code="npm install @slimkhemiri/react-design-system"
            language="bash"
          />

          <CodeBlock
            title="Import and Use"
            code={`import { SlimButton } from "@slimkhemiri/react-design-system";

function App() {
  return <SlimButton variant="primary">Click me</SlimButton>;
}`}
            language="tsx"
          />
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

      {/* AI Design Feature Section */}
      <section className="aiDesignFeature">
        <div className="aiDesignFeatureContent">
          <div className="aiDesignFeatureHeader">
            <div className="aiDesignFeatureIcon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                <circle cx="17" cy="7" r="2" fill="currentColor"/>
                <circle cx="17" cy="12" r="2" fill="currentColor"/>
                <circle cx="17" cy="17" r="2" fill="currentColor"/>
              </svg>
            </div>
            <SlimBadge variant="primary" size="sm">Premium</SlimBadge>
            <h2 className="aiDesignFeatureTitle">AI Design Component</h2>
            <p className="aiDesignFeatureSubtitle">
              Transform your ideas into production-ready React components with AI-powered generation
            </p>
          </div>

          <div className="aiDesignFeatureOverview">
            <div className="aiDesignFeatureOverviewContent">
              <h3 className="aiDesignFeatureOverviewTitle">Transform Ideas into Code</h3>
              <p className="aiDesignFeatureOverviewDescription">
                Our AI-powered component generator uses advanced machine learning to understand your requirements
                and generate production-ready React components with TypeScript, styling, and best practices built-in.
              </p>
              <div className="aiDesignFeatureOverviewFeatures">
                <div className="aiDesignFeatureOverviewFeature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h4>Instant Generation</h4>
                    <p>Get your component code in seconds, not hours</p>
                  </div>
                </div>
                <div className="aiDesignFeatureOverviewFeature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h4>Production Ready</h4>
                    <p>Code follows industry standards and best practices</p>
                  </div>
                </div>
                <div className="aiDesignFeatureOverviewFeature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h4>TypeScript Support</h4>
                    <p>Fully typed components with IntelliSense support</p>
                  </div>
                </div>
                <div className="aiDesignFeatureOverviewFeature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                    <path d="M12 2v20" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <h4>Customizable</h4>
                    <p>Easy to modify and integrate into your projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="aiDesignFeatureActions">
            <Link to="/ai-design">
              <SlimButton variant="primary" size="lg">
                Try AI Design
              </SlimButton>
            </Link>
            <Link to="/pricing">
              <SlimButton variant="secondary" size="lg">
                {user?.isPremium ? "Manage Subscription" : "Upgrade to Premium"}
              </SlimButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="premiumCTA">
        <div className="premiumCTAContent">
          <SlimBadge variant="primary" size="sm">Premium</SlimBadge>
          <h2 className="premiumCTATitle">Unlock Premium Features</h2>
          <p className="premiumCTADescription">
            Get access to advanced components, custom themes, API access, priority support, and more.
            {!user?.isPremium && " Start your 14-day free trial today - no credit card required."}
          </p>
          <Link to="/pricing">
            <SlimButton variant="primary" size="lg">
              {user?.isPremium ? "Manage Subscription" : "View Pricing Plans"}
            </SlimButton>
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

          <Link to="/premium" className="resourceCard">
            <div className="resourceIcon">⭐</div>
            <h3 className="resourceTitle">Premium Features</h3>
            <p className="resourceDescription">
              Discover advanced features and tools
            </p>
            <span className="resourceLink">Explore premium →</span>
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

      {/* Contact Section */}
      <section className="contactSection">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Need Help?</h2>
          <p className="sectionSubtitle">
            We're here to help you get the most out of Slim Design System
          </p>
        </div>
        <div className="contactGrid">
          <a href="mailto:support@slimdesign.com" className="contactCard">
            <div className="contactIcon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contactTitle">Contact Us</h3>
            <p className="contactDescription">
              Get in touch with our support team for assistance
            </p>
            <span className="contactLink">support@slimdesign.com →</span>
          </a>

          <a href="mailto:help@slimdesign.com" className="contactCard">
            <div className="contactIcon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contactTitle">Help Center</h3>
            <p className="contactDescription">
              Find answers to common questions and guides
            </p>
            <span className="contactLink">help@slimdesign.com →</span>
          </a>

          <a href="https://github.com/slimkhemiri/slim-design-system/issues" target="_blank" rel="noopener noreferrer" className="contactCard">
            <div className="contactIcon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contactTitle">Report Issue</h3>
            <p className="contactDescription">
              Found a bug? Let us know on GitHub
            </p>
            <span className="contactLink">Open issue →</span>
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
    </>
  );
}
