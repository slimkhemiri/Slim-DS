import React from "react";
import { SlimButton, SlimTooltip } from "@slimkhemiri/react-design-system";
import { CodeBlock } from "../components";

interface TooltipsDemoProps {
  showDetails?: boolean;
}

export function TooltipsDemo({ showDetails = false }: TooltipsDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">
        <span className="componentNumber">05</span>
        Tooltips
      </div>
      
      {showDetails && (
        <p className="componentDescription">
          Contextual information displayed on hover. Use tooltips to provide additional 
          context or help text without cluttering the interface.
        </p>
      )}
      
      <div className="row">
        <SlimTooltip text="Top tooltip" placement="top">
          <SlimButton slot="trigger" variant="secondary">
            Hover (top)
          </SlimButton>
        </SlimTooltip>
        <SlimTooltip text="Right tooltip" placement="right">
          <SlimButton slot="trigger" variant="secondary">
            Hover (right)
          </SlimButton>
        </SlimTooltip>
        <SlimTooltip text="Bottom tooltip" placement="bottom">
          <SlimButton slot="trigger" variant="secondary">
            Hover (bottom)
          </SlimButton>
        </SlimTooltip>
        <SlimTooltip placement="left">
          <SlimButton slot="trigger" variant="secondary">
            Hover (left)
          </SlimButton>
          Left Tooltip
        </SlimTooltip>
      </div>

      {showDetails && (
        <>
          <div className="componentCode">
            <h4 className="demoSubtitle">Code Example</h4>
            <CodeBlock
              title="Tooltip Usage"
              code={`import { SlimButton, SlimTooltip } from "@slimkhemiri/react-design-system";

function MyComponent() {
  return (
    <>
      <SlimTooltip text="Top tooltip" placement="top">
        <SlimButton slot="trigger" variant="secondary">
          Hover (top)
        </SlimButton>
      </SlimTooltip>
      
      <SlimTooltip text="Right tooltip" placement="right">
        <SlimButton slot="trigger" variant="secondary">
          Hover (right)
        </SlimButton>
      </SlimTooltip>
      
      <SlimTooltip text="Bottom tooltip" placement="bottom">
        <SlimButton slot="trigger" variant="secondary">
          Hover (bottom)
        </SlimButton>
      </SlimTooltip>
      
      {/* Or use children as content */}
      <SlimTooltip placement="left">
        <SlimButton slot="trigger">Hover</SlimButton>
        Custom tooltip content
      </SlimTooltip>
    </>
  );
}`}
              language="tsx"
            />
          </div>

          <div className="componentProps">
            <h4 className="demoSubtitle">Props</h4>
            <ul className="propsList">
              <li><code>text</code> - string (tooltip content)</li>
              <li><code>placement</code> - "top" | "right" | "bottom" | "left"</li>
              <li><code>children</code> - ReactNode (custom content or trigger element with slot="trigger")</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
