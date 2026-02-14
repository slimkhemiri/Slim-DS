import React from "react";
import { Footer } from "../../components";
import "./ThemesPage.css";

export function ThemesPage() {
  const themes = [
    {
      id: "default",
      name: "Default Style",
      description: "Clean and minimal design with balanced colors and spacing.",
      status: "available",
      preview: "var(--sl-surface)",
    },
    {
      id: "dark",
      name: "Dark Style",
      description: "Dark theme optimized for low-light environments and reduced eye strain.",
      status: "available",
      preview: "#1a1a1a",
    },
    {
      id: "hc",
      name: "High Contrast",
      description: "Enhanced contrast theme for improved accessibility and readability.",
      status: "available",
      preview: "#000000",
    },
    {
      id: "mui",
      name: "MUI-like Style",
      description: "Material Design inspired theme with elevation and shadows.",
      status: "coming-soon",
      preview: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "shadcn",
      name: "shadcn-like Style",
      description: "Modern, accessible design system with subtle borders and shadows.",
      status: "coming-soon",
      preview: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    },
    {
      id: "cartoon",
      name: "Cartoon Style",
      description: "Playful and vibrant theme with rounded corners and bold colors.",
      status: "coming-soon",
      preview: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    },
    {
      id: "illustration",
      name: "Illustration Style",
      description: "Artistic theme with hand-drawn elements and organic shapes.",
      status: "coming-soon",
      preview: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
    {
      id: "bootstrap",
      name: "Bootstrap Skeuomorphism",
      description: "Classic design with depth, shadows, and realistic textures.",
      status: "coming-soon",
      preview: "linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%)",
    },
    {
      id: "glass",
      name: "Glass Style",
      description: "Glassmorphism theme with blur effects and transparency.",
      status: "coming-soon",
      preview: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
    },
    {
      id: "geek",
      name: "Geek Style",
      description: "Tech-inspired theme with neon accents and futuristic aesthetics.",
      status: "coming-soon",
      preview: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    },
  ];

  return (
    <div className="themesPage">
      <div className="themesPageContent">
        {/* Header Section */}
        <div className="themesHeader">
          <h1 className="themesTitle">Themes</h1>
          <p className="themesSubtitle">
            Flexible theme customization with open style algorithms and semantic structures 
            make it easy for you and AI to customize themes.
          </p>
        </div>

        {/* Available Themes */}
        <section className="themesSection">
          <h2 className="sectionTitle">Available Themes</h2>
          <div className="themesGrid">
            {themes.filter(t => t.status === "available").map((theme) => (
              <div key={theme.id} className="themeCard available">
                <div className="themePreview" style={{ background: theme.preview }}>
                  {theme.id === "dark" && (
                    <div className="themePreviewContent">
                      <div className="previewDot"></div>
                      <div className="previewDot"></div>
                      <div className="previewDot"></div>
                    </div>
                  )}
                  {theme.id === "default" && (
                    <div className="themePreviewContent">
                      <div className="previewBar"></div>
                      <div className="previewBar"></div>
                      <div className="previewBar short"></div>
                    </div>
                  )}
                  {theme.id === "hc" && (
                    <div className="themePreviewContent">
                      <div className="previewBar hc"></div>
                      <div className="previewBar hc"></div>
                      <div className="previewBar hc short"></div>
                    </div>
                  )}
                </div>
                <div className="themeInfo">
                  <h3 className="themeName">{theme.name}</h3>
                  <p className="themeDescription">{theme.description}</p>
                  <span className="themeBadge available">Available</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon Themes */}
        <section className="themesSection">
          <h2 className="sectionTitle">Coming Soon</h2>
          <p className="sectionDescription">
            New themes are coming soon! These styles will expand the design system's versatility 
            and provide more customization options.
          </p>
          <div className="themesGrid">
            {themes.filter(t => t.status === "coming-soon").map((theme) => (
              <div key={theme.id} className="themeCard coming-soon">
                <div className="themePreview" style={{ background: theme.preview }}>
                  <div className="comingSoonOverlay">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="themeInfo">
                  <h3 className="themeName">{theme.name}</h3>
                  <p className="themeDescription">{theme.description}</p>
                  <span className="themeBadge coming-soon">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customization Info */}
        <section className="customizationSection">
          <div className="customizationCard">
            <div className="customizationIcon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="customizationTitle">Flexible Theme Customization</h3>
            <p className="customizationDescription">
              Open style algorithms and semantic structures make it easy for you and AI to customize themes. 
              Modify colors, spacing, typography, and more with our intuitive theming system.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
