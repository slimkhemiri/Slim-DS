import React from "react";
import { SlimAlert } from "@slimkhemiri/react-design-system";
import { CodeBlock } from "../components";

interface AlertsDemoProps {
  showDetails?: boolean;
}

export function AlertsDemo({ showDetails = false }: AlertsDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">
        <span className="componentNumber">03</span>
        Alerts
      </div>
      
      {showDetails && (
        <p className="componentDescription">
          Contextual feedback messages with different severity levels. 
          Use alerts to display important information, warnings, or success messages to users.
        </p>
      )}
      
      <div className="stack">
        <SlimAlert variant="info" heading="Security tip">
          Never share your one-time code with anyone.
        </SlimAlert>
        <SlimAlert variant="success" heading="Payment scheduled">
          Your transfer will run on the next business day.
        </SlimAlert>
        <SlimAlert variant="warning" heading="Unusual activity">
          We noticed a new device. Review recent logins.
        </SlimAlert>
        <SlimAlert variant="danger" heading="Action required">
          Your session is about to expire. Save your work.
        </SlimAlert>
      </div>

      {showDetails && (
        <>
          <div className="componentCode">
            <h4 className="demoSubtitle">Code Example</h4>
            <CodeBlock
              title="Alert Usage"
              code={`import { SlimAlert } from "@slimkhemiri/react-design-system";

function MyComponent() {
  return (
    <>
      <SlimAlert variant="info" heading="Security tip">
        Never share your one-time code with anyone.
      </SlimAlert>
      
      <SlimAlert variant="success" heading="Payment scheduled">
        Your transfer will run on the next business day.
      </SlimAlert>
      
      <SlimAlert variant="warning" heading="Unusual activity">
        We noticed a new device. Review recent logins.
      </SlimAlert>
      
      <SlimAlert variant="danger" heading="Action required">
        Your session is about to expire. Save your work.
      </SlimAlert>
    </>
  );
}`}
              language="tsx"
            />
          </div>

          <div className="componentProps">
            <h4 className="demoSubtitle">Props</h4>
            <ul className="propsList">
              <li><code>variant</code> - "info" | "success" | "warning" | "danger"</li>
              <li><code>heading</code> - string (alert title)</li>
              <li><code>children</code> - ReactNode (alert content)</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
