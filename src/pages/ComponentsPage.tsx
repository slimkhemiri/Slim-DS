import React from "react";
import { useSearchParams } from "react-router-dom";
import { ButtonsDemo, InputsDemo, AlertsDemo, BadgesDemo, TooltipsDemo } from "../demos";
import { useSidebarCollapse } from "../hooks";
import { menuItems } from "../constants";
import { Footer, SEO } from "../components";
import "./ComponentsPage.css";

type ComponentDemoId = "all" | "buttons" | "inputs" | "alerts" | "badges" | "tooltips";

export function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const demo = (searchParams.get("demo") || "all") as ComponentDemoId;
  const [sidebarCollapsed, setSidebarCollapsed] = useSidebarCollapse();
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Form state for InputsDemo
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [country, setCountry] = React.useState("fr");
  const [marketing, setMarketing] = React.useState(false);
  const [cardFrozen, setCardFrozen] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const showDetails = demo !== "all";

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
    { id: "buttons", component: <ButtonsDemo showDetails={false} />, name: "Buttons", keywords: ["button", "click", "action"] },
    { id: "inputs", component: inputsDemo, name: "Inputs & Forms", keywords: ["input", "form", "text", "select", "checkbox", "switch", "textarea"] },
    { id: "alerts", component: <AlertsDemo showDetails={false} />, name: "Alerts", keywords: ["alert", "message", "notification", "info", "warning", "danger", "success"] },
    { id: "badges", component: <BadgesDemo showDetails={false} />, name: "Badges", keywords: ["badge", "tag", "label", "status"] },
    { id: "tooltips", component: <TooltipsDemo showDetails={false} />, name: "Tooltips", keywords: ["tooltip", "hint", "hover", "popover"] },
  ];

  // Filter components based on search query
  const filteredComponents = searchQuery.trim() === ""
    ? allComponents
    : allComponents.filter(comp => 
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
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebarNavItem ${demo === item.id ? "active" : ""}`}
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
                {item.icon.map((path, idx) => (
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
            </button>
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
