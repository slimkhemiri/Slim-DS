import React from "react";
import { CodeBlock } from "../components";

interface CardsDemoProps {
  showDetails?: boolean;
}

export function CardsDemo({ showDetails = false }: CardsDemoProps) {
  return (
    <section className="card">
      <div className="cardTitle">
        <span className="componentNumber">08</span>
        Premium Cards
      </div>
      
      {showDetails && (
        <p className="componentDescription">
          Advanced card components with interactive features, animations, and rich content support.
        </p>
      )}
      
      <div className="row">
        <div className="premiumCard">
          <div className="premiumCardHeader">
            <h3>Analytics Dashboard</h3>
            <span className="premiumBadge">Premium</span>
          </div>
          <div className="premiumCardContent">
            <div className="statItem">
              <span className="statLabel">Total Revenue</span>
              <span className="statValue">$45,231</span>
              <span className="statChange positive">+12.5%</span>
            </div>
          </div>
        </div>
        <div className="premiumCard">
          <div className="premiumCardHeader">
            <h3>User Activity</h3>
            <span className="premiumBadge">Premium</span>
          </div>
          <div className="premiumCardContent">
            <div className="statItem">
              <span className="statLabel">Active Users</span>
              <span className="statValue">2,341</span>
              <span className="statChange positive">+8.2%</span>
            </div>
          </div>
        </div>
        <div className="premiumCard">
          <div className="premiumCardHeader">
            <h3>Performance</h3>
            <span className="premiumBadge">Premium</span>
          </div>
          <div className="premiumCardContent">
            <div className="statItem">
              <span className="statLabel">Response Time</span>
              <span className="statValue">142ms</span>
              <span className="statChange negative">-5.1%</span>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          <div className="componentCode">
            <h4 className="demoSubtitle">Code Example</h4>
            <CodeBlock
              title="Premium Cards Usage"
              code={`import { SlimCard } from "@slimkhemiri/react-design-system";

function Dashboard() {
  return (
    <SlimCard
      title="Analytics"
      header={<CustomHeader />}
      footer={<CustomFooter />}
      interactive
      hoverable
    >
      <CardContent />
    </SlimCard>
  );
}`}
              language="tsx"
            />
          </div>

          <div className="componentProps">
            <h4 className="demoSubtitle">Props</h4>
            <ul className="propsList">
              <li><code>title</code> - Card title string</li>
              <li><code>header</code> - Custom header component</li>
              <li><code>footer</code> - Custom footer component</li>
              <li><code>interactive</code> - boolean (enable interactions)</li>
              <li><code>hoverable</code> - boolean (enable hover effects)</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
