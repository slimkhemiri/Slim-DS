import React from "react";
import { useSearchParams } from "react-router-dom";
import { ButtonsDemo, InputsDemo, AlertsDemo, BadgesDemo, TooltipsDemo } from "../demos";
import { useSidebarCollapse } from "../hooks";
import { menuItems, menuSections } from "../constants";
import { Footer, SEO, PremiumGate, ComingSoonComponent } from "../components";
import { useAuth } from "../contexts/AuthContext";
import "./ComponentsPage.css";

type ComponentDemoId = "all" | "buttons" | "inputs" | "alerts" | "badges" | "tooltips" | "spin" | "drawer" | "notification" | "charts" | "tables" | "cards" | "hack-mode-theme" | "shadcn-like-style" | "cartoon-style" | "illustration-style" | "bootstrap-skeuomorphism" | "glass-style" | "geek-style";

export function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const demo = (searchParams.get("demo") || "all") as ComponentDemoId;
  const [sidebarCollapsed, setSidebarCollapsed] = useSidebarCollapse();
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useAuth();

  // Form state for InputsDemo
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [country, setCountry] = React.useState("fr");
  const [marketing, setMarketing] = React.useState(false);
  const [cardFrozen, setCardFrozen] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const showDetails = demo !== "all";

  // Advanced components overview data
  const advancedComponentsOverview: Record<string, { title: string; description: string; features: Array<{ icon: string; title: string; description: string }> }> = {
    "hack-mode-theme": {
      title: "Hack Mode Theme",
      description: "Transform your application with a terminal-inspired dark theme featuring green degradation colors. Perfect for developer tools, security applications, and tech-focused interfaces.",
      features: [
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Terminal Aesthetics",
          description: "Dark green color palette inspired by classic terminal interfaces"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Developer Focused",
          description: "Designed specifically for developer tools and security apps"
        },
        {
          icon: "M12 2v20",
          title: "Full Theme Support",
          description: "Complete theme system with all components styled"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Easy Integration",
          description: "Seamlessly switch between themes with data attributes"
        }
      ]
    },
    "shadcn-like-style": {
      title: "shadcn-like Style",
      description: "Modern, accessible component library style inspired by shadcn/ui. Clean, minimal design with excellent TypeScript support and customization options.",
      features: [
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Modern Design",
          description: "Clean and minimal aesthetic with excellent UX"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Accessibility First",
          description: "Built with accessibility and keyboard navigation in mind"
        },
        {
          icon: "M12 2v20",
          title: "TypeScript Ready",
          description: "Full TypeScript support with IntelliSense"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Highly Customizable",
          description: "Easy to customize and extend for your needs"
        }
      ]
    },
    "cartoon-style": {
      title: "Cartoon Style",
      description: "Add a playful and fun touch to your application with cartoon-inspired components. Perfect for entertainment apps, games, and creative projects.",
      features: [
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Playful Design",
          description: "Fun and engaging visual style with rounded shapes"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Animated Elements",
          description: "Smooth animations and transitions for interactivity"
        },
        {
          icon: "M12 2v20",
          title: "Colorful Palette",
          description: "Vibrant color scheme perfect for entertainment apps"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Creative Projects",
          description: "Ideal for games, creative tools, and fun applications"
        }
      ]
    },
    "illustration-style": {
      title: "Illustration Style",
      description: "Artistic and visually rich component style with illustration-inspired design. Perfect for portfolios, creative agencies, and design-focused applications.",
      features: [
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Artistic Design",
          description: "Visually rich components with artistic flair"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Creative Layouts",
          description: "Unique layouts perfect for portfolios and agencies"
        },
        {
          icon: "M12 2v20",
          title: "Visual Storytelling",
          description: "Components designed to tell visual stories"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Design Focused",
          description: "Perfect for design and creative industry applications"
        }
      ]
    },
    "bootstrap-skeuomorphism": {
      title: "Bootstrap Skeuomorphism",
      description: "Classic 3D realistic design style with depth and shadows. Inspired by early iOS design, perfect for applications that need a tactile, realistic feel.",
      features: [
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "3D Realistic",
          description: "Components with depth, shadows, and realistic textures"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Tactile Feel",
          description: "Design that feels physical and interactive"
        },
        {
          icon: "M12 2v20",
          title: "Classic Style",
          description: "Inspired by early iOS and macOS design language"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Bootstrap Compatible",
          description: "Works seamlessly with Bootstrap grid and utilities"
        }
      ]
    },
    "glass-style": {
      title: "Glass Style",
      description: "Modern glassmorphism design with frosted glass effects, transparency, and blur. Perfect for modern applications that need a sleek, contemporary look.",
      features: [
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Glassmorphism",
          description: "Frosted glass effects with transparency and blur"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Modern Aesthetic",
          description: "Sleek and contemporary design language"
        },
        {
          icon: "M12 2v20",
          title: "Layered Depth",
          description: "Beautiful depth through layered transparent elements"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Premium Look",
          description: "High-end visual style for premium applications"
        }
      ]
    },
    "geek-style": {
      title: "Geek Theme",
      description: "Tech-focused design style with code-inspired aesthetics. Perfect for developer tools, tech blogs, and applications targeting tech-savvy audiences.",
      features: [
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Code Inspired",
          description: "Design elements inspired by code editors and terminals"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Tech Aesthetic",
          description: "Perfect for developer tools and tech applications"
        },
        {
          icon: "M12 2v20",
          title: "Monospace Fonts",
          description: "Typography choices that evoke programming"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Developer Friendly",
          description: "Designed with developers and tech enthusiasts in mind"
        }
      ]
    }
  };

  // Coming soon components overview data
  const comingSoonComponentsOverview: Record<string, { title: string; description: string; features: Array<{ icon: string; title: string; description: string }> }> = {
    "tables": {
      title: "Data Tables",
      description: "Powerful and flexible data tables with sorting, filtering, pagination, and search capabilities. Perfect for displaying large datasets in a structured and interactive way.",
      features: [
        {
          icon: "M3 3h18v18H3V3Z",
          title: "Sorting & Filtering",
          description: "Sort columns and filter data with ease"
        },
        {
          icon: "M3 9h18M9 3v18",
          title: "Pagination",
          description: "Navigate through large datasets efficiently"
        },
        {
          icon: "M12 2v20",
          title: "Search Functionality",
          description: "Quick search across all table data"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Responsive Design",
          description: "Works seamlessly on all screen sizes"
        }
      ]
    },
    "charts": {
      title: "Charts",
      description: "Beautiful and interactive charts for data visualization. Support for line charts, bar charts, pie charts, and more. Perfect for dashboards and analytics.",
      features: [
        {
          icon: "M3 3v18h18",
          title: "Multiple Chart Types",
          description: "Line, bar, pie, and area charts"
        },
        {
          icon: "M7 12l4-4 4 4 6-6",
          title: "Interactive",
          description: "Hover effects and click interactions"
        },
        {
          icon: "M12 2v20",
          title: "Customizable",
          description: "Fully customizable colors and styles"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Responsive",
          description: "Adapts to any screen size"
        }
      ]
    },
    "spin": {
      title: "Spin",
      description: "Loading spinners and indicators to provide visual feedback during async operations. Multiple styles and sizes available for different use cases.",
      features: [
        {
          icon: "M21 12a9 9 0 1 1-6.219-8.56",
          title: "Multiple Styles",
          description: "Various spinner designs and animations"
        },
        {
          icon: "M12 2v20",
          title: "Customizable Size",
          description: "Small, medium, and large variants"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Smooth Animations",
          description: "Smooth and performant animations"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Accessible",
          description: "ARIA labels and screen reader support"
        }
      ]
    },
    "drawer": {
      title: "Drawer",
      description: "Slide-out panels that appear from the side of the screen. Perfect for navigation menus, filters, settings, and additional content without leaving the current page.",
      features: [
        {
          icon: "M3 12h18M3 6h18M3 18h18",
          title: "Multiple Positions",
          description: "Left, right, top, and bottom placement"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Smooth Animations",
          description: "Smooth slide-in and slide-out transitions"
        },
        {
          icon: "M12 2v20",
          title: "Backdrop Support",
          description: "Optional backdrop overlay for focus"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Keyboard Navigation",
          description: "Full keyboard support and ESC to close"
        }
      ]
    },
    "notification": {
      title: "Notification",
      description: "Toast notifications and alerts that appear temporarily to inform users of actions, errors, or important information. Non-intrusive and dismissible.",
      features: [
        {
          icon: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
          title: "Multiple Variants",
          description: "Success, error, warning, and info types"
        },
        {
          icon: "M9 11l3 3L22 4",
          title: "Auto Dismiss",
          description: "Automatically closes after a set time"
        },
        {
          icon: "M12 2v20",
          title: "Stack Management",
          description: "Smart stacking for multiple notifications"
        },
        {
          icon: "M12 2L2 7l10 5 10-5-10-5Z",
          title: "Position Control",
          description: "Top, bottom, left, or right placement"
        }
      ]
    }
  };

  // Function to render overview for advanced components
  const renderAdvancedComponentOverview = (componentId: string) => {
    const overview = advancedComponentsOverview[componentId];
    if (!overview) return null;

    return (
      <div className="advancedComponentOverview">
        <div className="advancedComponentOverviewContent">
          <h2 className="advancedComponentOverviewTitle">{overview.title}</h2>
          <p className="advancedComponentOverviewDescription">{overview.description}</p>
          <div className="advancedComponentOverviewFeatures">
            {overview.features.map((feature, index) => (
              <div key={index} className="advancedComponentOverviewFeature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={feature.icon} strokeLinejoin="round" />
                </svg>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Function to render overview for coming soon components
  const renderComingSoonComponentOverview = (componentId: string) => {
    const overview = comingSoonComponentsOverview[componentId];
    if (!overview) return null;

    return (
      <div className="advancedComponentOverview">
        <div className="advancedComponentOverviewContent">
          <h2 className="advancedComponentOverviewTitle">{overview.title}</h2>
          <p className="advancedComponentOverviewDescription">{overview.description}</p>
          <div className="advancedComponentOverviewFeatures">
            {overview.features.map((feature, index) => (
              <div key={index} className="advancedComponentOverviewFeature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={feature.icon} strokeLinejoin="round" />
                </svg>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Scroll to top button visibility
  React.useEffect(() => {
    if (demo !== "all") {
      setShowScrollTop(false);
      return;
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [demo]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputsDemo = (
    <InputsDemo
      name={name}
      setName={setName}
      error={error}
      setError={setError}
      country={country}
      setCountry={setCountry}
      notes={notes}
      setNotes={setNotes}
      marketing={marketing}
      setMarketing={setMarketing}
      cardFrozen={cardFrozen}
      setCardFrozen={setCardFrozen}
      showDetails={showDetails}
    />
  );

  // Component list for filtering
  const allComponents = [
    { id: "buttons", component: <ButtonsDemo showDetails={false} />, name: "Buttons", keywords: ["button", "click", "action"], premium: false, comingSoon: false },
    { id: "inputs", component: inputsDemo, name: "Inputs & Forms", keywords: ["input", "form", "text", "select", "checkbox", "switch", "textarea"], premium: false, comingSoon: false },
    { id: "alerts", component: <AlertsDemo showDetails={false} />, name: "Alerts", keywords: ["alert", "message", "notification", "info", "warning", "danger", "success"], premium: false, comingSoon: false },
    { id: "badges", component: <BadgesDemo showDetails={false} />, name: "Badges", keywords: ["badge", "tag", "label", "status"], premium: false, comingSoon: false },
    { id: "tooltips", component: <TooltipsDemo showDetails={false} />, name: "Tooltips", keywords: ["tooltip", "hint", "hover", "popover"], premium: false, comingSoon: false },
    { id: "spin", component: <ComingSoonComponent featureName="Spin" />, name: "Spin", keywords: ["spin", "spinner", "loader", "loading", "animation"], premium: false, comingSoon: true },
    { id: "drawer", component: <ComingSoonComponent featureName="Drawer" />, name: "Drawer", keywords: ["drawer", "sidebar", "panel", "slide", "menu"], premium: false, comingSoon: true },
    { id: "notification", component: <ComingSoonComponent featureName="Notification" />, name: "Notification", keywords: ["notification", "toast", "alert", "message", "popup"], premium: false, comingSoon: true },
    { id: "tables", component: <ComingSoonComponent featureName="Data Tables" />, name: "Data Tables", keywords: ["table", "data", "grid", "sort", "filter", "pagination"], premium: false, comingSoon: true },
    { id: "charts", component: <ComingSoonComponent featureName="Charts" />, name: "Charts", keywords: ["chart", "graph", "data", "visualization", "analytics"], premium: false, comingSoon: true },
    { id: "cards", component: user?.isPremium ? <div></div> : <PremiumGate featureName="Premium Cards" showUpgrade={true}><div></div></PremiumGate>, name: "Premium Cards", keywords: ["card", "premium", "dashboard", "widget"], premium: true, comingSoon: false },
    { id: "hack-mode-theme", component: user?.isPremium ? <div></div> : <PremiumGate featureName="Hack Mode Theme" showUpgrade={true}><div></div></PremiumGate>, name: "Hack Mode Theme", keywords: ["hack", "mode", "theme", "dark", "green", "terminal"], premium: true, comingSoon: false },
    { id: "shadcn-like-style", component: user?.isPremium ? <div></div> : <PremiumGate featureName="shadcn-like Style" showUpgrade={true}><div></div></PremiumGate>, name: "shadcn-like Style", keywords: ["shadcn", "style", "ui", "components", "modern"], premium: true, comingSoon: false },
    { id: "cartoon-style", component: user?.isPremium ? <div></div> : <PremiumGate featureName="Cartoon Style" showUpgrade={true}><div></div></PremiumGate>, name: "Cartoon Style", keywords: ["cartoon", "style", "fun", "playful", "animated"], premium: true, comingSoon: false },
    { id: "illustration-style", component: user?.isPremium ? <div></div> : <PremiumGate featureName="Illustration Style" showUpgrade={true}><div></div></PremiumGate>, name: "Illustration Style", keywords: ["illustration", "style", "artistic", "drawing", "visual"], premium: true, comingSoon: false },
    { id: "bootstrap-skeuomorphism", component: user?.isPremium ? <div></div> : <PremiumGate featureName="Bootstrap Skeuomorphism" showUpgrade={true}><div></div></PremiumGate>, name: "Bootstrap Skeuomorphism", keywords: ["bootstrap", "skeuomorphism", "3d", "realistic", "depth"], premium: true, comingSoon: false },
    { id: "glass-style", component: user?.isPremium ? <div></div> : <PremiumGate featureName="Glass Style" showUpgrade={true}><div></div></PremiumGate>, name: "Glass Style", keywords: ["glass", "style", "morphism", "frosted", "transparent"], premium: true, comingSoon: false },
    { id: "geek-style", component: user?.isPremium ? <div></div> : <PremiumGate featureName="Geek Style" showUpgrade={true}><div></div></PremiumGate>, name: "Geek Style", keywords: ["geek", "style", "tech", "nerd", "code"], premium: true, comingSoon: false },
  ];

  // Filter components based on search query and availability
  // In "all" view, only show available components (not premium, not coming soon)
  const availableComponents = allComponents.filter(comp => !comp.premium && !comp.comingSoon);
  
  const filteredComponents = searchQuery.trim() === ""
    ? availableComponents
    : availableComponents.filter(comp => 
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.keywords.some(keyword => keyword.includes(searchQuery.toLowerCase()))
      );

  const content =
    demo === "all" ? (
      <>
        {/* Search Component */}
        <div className="componentsSearch">
          <div className="searchHeader">
            <h1 className="searchTitle">Component Library</h1>
            <p className="searchDescription">
              Browse and explore all available components. Use the search below to quickly find what you need.
            </p>
          </div>
          <div className="searchInputWrapper">
            <svg className="searchIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="searchInput"
              placeholder="Search components... (e.g., buttons, forms, alerts)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search components"
            />
            {searchQuery && (
              <button 
                className="searchClear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
          {filteredComponents.length === 0 && (
            <div className="noResults">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>No components found for "<strong>{searchQuery}</strong>"</p>
              <button onClick={() => setSearchQuery("")} className="clearSearchButton">
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Components Grid */}
        <main className="grid" aria-label="Component demos">
          {filteredComponents.map((comp) => (
            <React.Fragment key={comp.id}>{comp.component}</React.Fragment>
          ))}
        </main>
      </>
    ) : (
      <main className="content" aria-label="Component demo">
        {demo === "buttons" && <ButtonsDemo showDetails={true} />}
        {demo === "inputs" && inputsDemo}
        {demo === "alerts" && <AlertsDemo showDetails={true} />}
        {demo === "badges" && <BadgesDemo showDetails={true} />}
        {demo === "tooltips" && <TooltipsDemo showDetails={true} />}
        {demo === "spin" && (
          <>
            {renderComingSoonComponentOverview("spin")}
            <ComingSoonComponent featureName="Spin" />
          </>
        )}
        {demo === "drawer" && (
          <>
            {renderComingSoonComponentOverview("drawer")}
            <ComingSoonComponent featureName="Drawer" />
          </>
        )}
        {demo === "notification" && (
          <>
            {renderComingSoonComponentOverview("notification")}
            <ComingSoonComponent featureName="Notification" />
          </>
        )}
        {demo === "tables" && (
          <>
            {renderComingSoonComponentOverview("tables")}
            <ComingSoonComponent featureName="Data Tables" />
          </>
        )}
        {demo === "charts" && (
          <>
            {renderComingSoonComponentOverview("charts")}
            <ComingSoonComponent featureName="Charts" />
          </>
        )}
        {demo === "cards" && (
          <PremiumGate featureName="Premium Cards" showUpgrade={true}>
            <div></div>
          </PremiumGate>
        )}
        {demo === "hack-mode-theme" && (
          <>
            {renderAdvancedComponentOverview("hack-mode-theme")}
            <PremiumGate featureName="Hack Mode Theme" showUpgrade={true}>
              <div></div>
            </PremiumGate>
          </>
        )}
        {demo === "shadcn-like-style" && (
          <>
            {renderAdvancedComponentOverview("shadcn-like-style")}
            <PremiumGate featureName="shadcn-like Style" showUpgrade={true}>
              <div></div>
            </PremiumGate>
          </>
        )}
        {demo === "cartoon-style" && (
          <>
            {renderAdvancedComponentOverview("cartoon-style")}
            <PremiumGate featureName="Cartoon Style" showUpgrade={true}>
              <div></div>
            </PremiumGate>
          </>
        )}
        {demo === "illustration-style" && (
          <>
            {renderAdvancedComponentOverview("illustration-style")}
            <PremiumGate featureName="Illustration Style" showUpgrade={true}>
              <div></div>
            </PremiumGate>
          </>
        )}
        {demo === "bootstrap-skeuomorphism" && (
          <>
            {renderAdvancedComponentOverview("bootstrap-skeuomorphism")}
            <PremiumGate featureName="Bootstrap Skeuomorphism" showUpgrade={true}>
              <div></div>
            </PremiumGate>
          </>
        )}
        {demo === "glass-style" && (
          <>
            {renderAdvancedComponentOverview("glass-style")}
            <PremiumGate featureName="Glass Style" showUpgrade={true}>
              <div></div>
            </PremiumGate>
          </>
        )}
        {demo === "geek-style" && (
          <>
            {renderAdvancedComponentOverview("geek-style")}
            <PremiumGate featureName="Geek Style" showUpgrade={true}>
              <div></div>
            </PremiumGate>
          </>
        )}
      </main>
    );

  return (
    <>
      <SEO
        title="Components"
        description="Browse and explore all available components in the Slim Design System. Interactive demos and examples for buttons, inputs, alerts, badges, tooltips, and more."
        keywords="React components, UI components, buttons, inputs, alerts, badges, tooltips, design system components"
      />
      <div className="componentsPageLayout">
      <div className={`componentsPageSidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebarHeader">
          <h2 className="sidebarTitle">Components</h2>
          <button 
            className="sidebarToggle" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarCollapsed ? (
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>

        <nav className="sidebarNav">
          {menuSections.map((section) => (
            <div key={section.id} className="sidebarSection">
              <h3 className="sidebarSectionTitle">{section.label}</h3>
              <div className="sidebarSectionItems">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    className={`sidebarNavItem ${demo === item.id ? "active" : ""} ${item.premium ? "premium" : ""}`}
                    onClick={() => setSearchParams({ demo: item.id })}
                    title={item.label}
                  >
                    <svg 
                      className="sidebarNavIcon" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      {item.icon.map((path, idx: number) => (
                        <path
                          key={idx}
                          d={path.d}
                          strokeWidth={path.strokeWidth || 2}
                          strokeLinecap={path.strokeLinecap || "round"}
                          strokeLinejoin={path.strokeLinejoin || "round"}
                        />
                      ))}
                    </svg>
                    <span className="sidebarNavLabel">{item.label}</span>
                    {item.premium && (
                      <span className="sidebarNavPremium">
                        PREMIUM
                      </span>
                    )}
                    {item.comingSoon && (
                      <span className="sidebarNavComingSoon">
                        COMING SOON
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="componentsPageContent">
        {content}
        <Footer />
      </div>

      {/* Scroll to top button - only for "all" view */}
      {demo === "all" && (
        <button
          className={`componentsScrollIndicator ${showScrollTop ? "visible" : ""}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
    </>
  );
}
