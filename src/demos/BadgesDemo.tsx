import React from "react";
import { SlimBadge } from "@slimkhemiri/react-design-system";
import { CodeBlock } from "../components";

interface BadgesDemoProps {
  showDetails?: boolean;
}

export function BadgesDemo({ showDetails = false }: BadgesDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">
        <span className="componentNumber">04</span>
        Badges
      </div>
      
      {showDetails && (
        <p className="componentDescription">
          Small status indicators and labels. Perfect for displaying tags, status, 
          counts, or highlighting important information.
        </p>
      )}
      
      <div className="row">
        <SlimBadge variant="neutral">Standard</SlimBadge>
        <SlimBadge variant="primary">BPCE</SlimBadge>
        <SlimBadge variant="success">Verified</SlimBadge>
        <SlimBadge variant="warning">Pending</SlimBadge>
        <SlimBadge variant="danger">Blocked</SlimBadge>
        <SlimBadge size="sm" variant="primary">
          New
        </SlimBadge>
      </div>

      {showDetails && (
        <>
          <div className="componentCode">
            <h4 className="demoSubtitle">Code Example</h4>
            <CodeBlock
              title="Badge Usage"
              code={`import { SlimBadge } from "@slimkhemiri/react-design-system";

function MyComponent() {
  return (
    <>
      <SlimBadge variant="neutral">Standard</SlimBadge>
      <SlimBadge variant="primary">BPCE</SlimBadge>
      <SlimBadge variant="success">Verified</SlimBadge>
      <SlimBadge variant="warning">Pending</SlimBadge>
      <SlimBadge variant="danger">Blocked</SlimBadge>
      <SlimBadge size="sm" variant="primary">New</SlimBadge>
    </>
  );
}`}
              language="tsx"
            />
          </div>

          <div className="componentProps">
            <h4 className="demoSubtitle">Props</h4>
            <ul className="propsList">
              <li><code>variant</code> - "neutral" | "primary" | "success" | "warning" | "danger"</li>
              <li><code>size</code> - "sm" | "md" | "lg"</li>
              <li><code>children</code> - ReactNode (badge content)</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
