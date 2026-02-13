import React from "react";
import { useSearchParams } from "react-router-dom";
import { SlimPlaygroundSidebar } from "@slimkhemiri/react-design-system";
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
        <SlimPlaygroundSidebar
          heading="Components"
          items={menuItems}
          active={demo}
          collapsed={sidebarCollapsed}
          onSlimToggle={(e: CustomEvent<boolean>) => setSidebarCollapsed(e.detail)}
          onSlimSelect={(e: CustomEvent<string>) => setSearchParams({ demo: e.detail })}
        />
      </div>

      <div className="componentsPageContent">
        {content}
      </div>
    </div>
  );
}
