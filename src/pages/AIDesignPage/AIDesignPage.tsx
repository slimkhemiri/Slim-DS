import React, { useState } from "react";
import { SlimButton, SlimInput, SlimAlert, SlimBadge } from "@slimkhemiri/react-design-system";
import { SEO, Footer, PremiumGate } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import "./AIDesignPage.css";

export function AIDesignPage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your component");
      return;
    }

    setIsGenerating(true);
    setError(null);

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setError("AI Design Component feature is coming soon! Stay tuned for updates.");
    }, 2000);
  };

  return (
    <>
      <SEO
        title="AI Design Component"
        description="Generate React components using AI. Describe what you need and get code instantly."
        keywords="ai, artificial intelligence, component generator, design, react components"
      />
      <div className="aiDesignPage">
        <div className="aiDesignContainer">
          <div className="aiDesignHeader">
            <div className="aiDesignHeaderIcon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5Z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                <path d="M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="17" cy="7" r="2"/>
                <circle cx="17" cy="12" r="2"/>
                <circle cx="17" cy="17" r="2"/>
              </svg>
            </div>
            <h1 className="aiDesignTitle">AI Design Component</h1>
            <p className="aiDesignSubtitle">
              Describe your component and let AI generate the perfect React code for you
            </p>
            <SlimBadge variant="primary" size="sm" style={{ marginTop: "16px" }}>
              Premium Feature
            </SlimBadge>
          </div>

          <div className="aiDesignOverview">
            <div className="aiDesignOverviewContent">
              <h2 className="aiDesignOverviewTitle">Transform Ideas into Code</h2>
              <p className="aiDesignOverviewDescription">
                Our AI-powered component generator uses advanced machine learning to understand your requirements
                and generate production-ready React components with TypeScript, styling, and best practices built-in.
              </p>
              <div className="aiDesignOverviewFeatures">
                <div className="aiDesignOverviewFeature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h3>Instant Generation</h3>
                    <p>Get your component code in seconds, not hours</p>
                  </div>
                </div>
                <div className="aiDesignOverviewFeature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h3>Production Ready</h3>
                    <p>Code follows industry standards and best practices</p>
                  </div>
                </div>
                <div className="aiDesignOverviewFeature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h3>TypeScript Support</h3>
                    <p>Fully typed components with IntelliSense support</p>
                  </div>
                </div>
                <div className="aiDesignOverviewFeature">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                    <path d="M12 2v20" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <h3>Customizable</h3>
                    <p>Easy to modify and integrate into your projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PremiumGate featureName="AI Design Component" showUpgrade={true}>
            <div className="aiDesignCard">
              <div className="aiDesignCardHeader">
                <h2 className="aiDesignCardTitle">Component Generator</h2>
                <p className="aiDesignCardDescription">
                  Enter a description of the component you want to create. Our AI will generate
                  production-ready React code with TypeScript and styling.
                </p>
              </div>

              {error && (
                <SlimAlert variant="danger" style={{ marginBottom: "24px" }}>
                  {error}
                </SlimAlert>
              )}

              <div className="aiDesignForm">
                <SlimInput
                  label="Component Description"
                  type="text"
                  value={prompt}
                  placeholder="e.g., A button with gradient background and hover animation"
                  onSlimChange={(e) => {
                    setPrompt(e.detail);
                    setError(null);
                  }}
                  disabled={isGenerating}
                  required
                />

                <div className="aiDesignExamples">
                  <p className="aiDesignExamplesTitle">Example prompts:</p>
                  <div className="aiDesignExamplesList">
                    <button
                      type="button"
                      className="aiDesignExample"
                      onClick={() => setPrompt("A card component with shadow and rounded corners")}
                      disabled={isGenerating}
                    >
                      A card component with shadow and rounded corners
                    </button>
                    <button
                      type="button"
                      className="aiDesignExample"
                      onClick={() => setPrompt("An input field with validation and error messages")}
                      disabled={isGenerating}
                    >
                      An input field with validation and error messages
                    </button>
                    <button
                      type="button"
                      className="aiDesignExample"
                      onClick={() => setPrompt("A modal dialog with backdrop and close button")}
                      disabled={isGenerating}
                    >
                      A modal dialog with backdrop and close button
                    </button>
                  </div>
                </div>

                <SlimButton
                  variant="primary"
                  size="lg"
                  style={{ width: "100%", marginTop: "24px" }}
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <svg className="aiDesignSpinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round"/>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                        <circle cx="17" cy="7" r="1.5" fill="currentColor"/>
                        <circle cx="17" cy="12" r="1.5" fill="currentColor"/>
                        <circle cx="17" cy="17" r="1.5" fill="currentColor"/>
                      </svg>
                      Generate Component
                    </>
                  )}
                </SlimButton>
              </div>
            </div>

            <div className="aiDesignFeatures">
              <h2 className="aiDesignFeaturesTitle">What you'll get</h2>
              <div className="aiDesignFeaturesGrid">
                <div className="aiDesignFeature">
                  <div className="aiDesignFeatureIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="aiDesignFeatureTitle">React Components</h3>
                  <p className="aiDesignFeatureDescription">
                    Production-ready React components with TypeScript support
                  </p>
                </div>
                <div className="aiDesignFeature">
                  <div className="aiDesignFeatureIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="aiDesignFeatureTitle">Styled Components</h3>
                  <p className="aiDesignFeatureDescription">
                    Beautiful styling with CSS modules or styled-components
                  </p>
                </div>
                <div className="aiDesignFeature">
                  <div className="aiDesignFeatureIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="aiDesignFeatureTitle">Best Practices</h3>
                  <p className="aiDesignFeatureDescription">
                    Code follows React best practices and accessibility standards
                  </p>
                </div>
                <div className="aiDesignFeature">
                  <div className="aiDesignFeatureIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="aiDesignFeatureTitle">Customizable</h3>
                  <p className="aiDesignFeatureDescription">
                    Easy to customize and integrate into your existing projects
                  </p>
                </div>
              </div>
            </div>
          </PremiumGate>
        </div>
      </div>
      <Footer />
    </>
  );
}
