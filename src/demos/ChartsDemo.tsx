import React from "react";
import { CodeBlock } from "../components";

interface ChartsDemoProps {
  showDetails?: boolean;
}

export function ChartsDemo({ showDetails = false }: ChartsDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">
        <span className="componentNumber">06</span>
        Charts
      </div>
      
      {showDetails && (
        <p className="componentDescription">
          Premium chart components for data visualization. Perfect for dashboards, analytics, and financial reports.
        </p>
      )}
      
      <div className="row">
        <div className="chartDemo">
          <div className="chartPlaceholder">
            <svg width="100%" height="200" viewBox="0 0 400 200" fill="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--sl-primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--sl-primary)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 20 150 Q 80 100, 120 80 T 200 60 T 280 70 T 360 50"
                stroke="var(--sl-primary)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 20 150 Q 80 100, 120 80 T 200 60 T 280 70 T 360 50 L 360 200 L 20 200 Z"
                fill="url(#chartGradient)"
              />
              <circle cx="120" cy="80" r="4" fill="var(--sl-primary)" />
              <circle cx="200" cy="60" r="4" fill="var(--sl-primary)" />
              <circle cx="280" cy="70" r="4" fill="var(--sl-primary)" />
            </svg>
            <p style={{ textAlign: "center", marginTop: "12px", color: "var(--sl-text-secondary)" }}>
              Line Chart Preview
            </p>
          </div>
        </div>
        <div className="chartDemo">
          <div className="chartPlaceholder">
            <svg width="100%" height="200" viewBox="0 0 400 200" fill="none">
              <rect x="40" y="40" width="60" height="120" rx="4" fill="var(--sl-primary)" opacity="0.8" />
              <rect x="120" y="60" width="60" height="100" rx="4" fill="var(--sl-primary)" opacity="0.8" />
              <rect x="200" y="80" width="60" height="80" rx="4" fill="var(--sl-primary)" opacity="0.8" />
              <rect x="280" y="100" width="60" height="60" rx="4" fill="var(--sl-primary)" opacity="0.8" />
            </svg>
            <p style={{ textAlign: "center", marginTop: "12px", color: "var(--sl-text-secondary)" }}>
              Bar Chart Preview
            </p>
          </div>
        </div>
        <div className="chartDemo">
          <div className="chartPlaceholder">
            <svg width="100%" height="200" viewBox="0 0 400 200" fill="none">
              <circle cx="200" cy="100" r="60" fill="var(--sl-primary)" opacity="0.3" />
              <circle cx="200" cy="100" r="40" fill="var(--sl-primary)" opacity="0.5" />
              <circle cx="200" cy="100" r="20" fill="var(--sl-primary)" />
            </svg>
            <p style={{ textAlign: "center", marginTop: "12px", color: "var(--sl-text-secondary)" }}>
              Pie Chart Preview
            </p>
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          <div className="componentCode">
            <h4 className="demoSubtitle">Code Example</h4>
            <CodeBlock
              title="Charts Usage"
              code={`import { SlimChart } from "@slimkhemiri/react-design-system";

function Dashboard() {
  return (
    <>
      <SlimChart type="line" data={chartData} />
      <SlimChart type="bar" data={barData} />
      <SlimChart type="pie" data={pieData} />
    </>
  );
}`}
              language="tsx"
            />
          </div>

          <div className="componentProps">
            <h4 className="demoSubtitle">Props</h4>
            <ul className="propsList">
              <li><code>type</code> - "line" | "bar" | "pie" | "area"</li>
              <li><code>data</code> - Chart data array</li>
              <li><code>options</code> - Chart configuration options</li>
              <li><code>responsive</code> - boolean (default: true)</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
