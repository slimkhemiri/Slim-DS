import React from "react";
import { useSearchParams } from "react-router-dom";
import { ButtonsDemo, InputsDemo, AlertsDemo, BadgesDemo, TooltipsDemo } from "../demos";
import { useSidebarCollapse } from "../hooks";
import { menuItems } from "../constants";
import "./ComponentsPage.css";

type ComponentDemoId = "all" | "buttons" | "inputs" | "alerts" | "badges" | "tooltips";

export function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const demo = (searchParams.get("demo") || "all") as ComponentDemoId;
  const [sidebarCollapsed, setSidebarCollapsed] = useSidebarCollapse();

  // Form state for InputsDemo
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [country, setCountry] = React.useState("fr");
  const [marketing, setMarketing] = React.useState(false);
  const [cardFrozen, setCardFrozen] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

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
    />
  );

  const content =
    demo === "all" ? (
      <main className="grid" aria-label="Component demos">
        <ButtonsDemo />
        {inputsDemo}
        <AlertsDemo />
        <BadgesDemo />
        <TooltipsDemo />
      </main>
    ) : (
      <main className="content" aria-label="Component demo">
        {demo === "buttons" && <ButtonsDemo />}
        {demo === "inputs" && inputsDemo}
        {demo === "alerts" && <AlertsDemo />}
        {demo === "badges" && <BadgesDemo />}
        {demo === "tooltips" && <TooltipsDemo />}
      </main>
    );

  return (
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
      </div>
    </div>
  );
}
