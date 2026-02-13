import React from "react";
import { SlimButton } from "@slimkhemiri/react-design-system";
import { CodeBlock } from "../components";

interface ButtonsDemoProps {
  showDetails?: boolean;
}

export function ButtonsDemo({ showDetails = false }: ButtonsDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">
        <span className="componentNumber">01</span>
        Buttons
      </div>
      
      {showDetails && (
        <p className="componentDescription">
          Versatile button component with multiple variants, sizes, and loading states. 
          Perfect for actions, forms, and interactive elements.
        </p>
      )}
      
      <div className="row">
        <SlimButton variant="primary">Activate</SlimButton>
        <SlimButton variant="secondary">Cancel</SlimButton>
        <SlimButton variant="danger">Freeze</SlimButton>
        <SlimButton variant="ghost">Learn more</SlimButton>
        <SlimButton loading>Loading</SlimButton>
      </div>

      {showDetails && (
        <>
          <div className="componentCode">
            <h4 className="demoSubtitle">Code Example</h4>
            <CodeBlock
              title="Button Usage"
              code={`import { SlimButton } from "@slimkhemiri/react-design-system";

function MyComponent() {
  return (
    <>
      <SlimButton variant="primary">Activate</SlimButton>
      <SlimButton variant="secondary">Cancel</SlimButton>
      <SlimButton variant="danger">Freeze</SlimButton>
      <SlimButton variant="ghost">Learn more</SlimButton>
      <SlimButton loading>Loading</SlimButton>
    </>
  );
}`}
              language="tsx"
            />
          </div>

          <div className="componentProps">
            <h4 className="demoSubtitle">Props</h4>
            <ul className="propsList">
              <li><code>variant</code> - "primary" | "secondary" | "danger" | "ghost"</li>
              <li><code>size</code> - "sm" | "md" | "lg"</li>
              <li><code>loading</code> - boolean (shows loading spinner)</li>
              <li><code>disabled</code> - boolean</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
