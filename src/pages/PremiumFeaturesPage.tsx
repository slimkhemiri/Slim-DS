import React from "react";
import { Link } from "react-router-dom";
import { SlimButton, SlimBadge } from "@slimkhemiri/react-design-system";
import { SEO, PremiumGate } from "../components";
import { useAuth } from "../contexts/AuthContext";
import "./PremiumFeaturesPage.css";

interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "components" | "tools" | "support";
}

const premiumFeatures: PremiumFeature[] = [
  {
    id: "advanced-components",
    title: "Advanced Components",
    description: "Access to premium UI components including data tables, charts, calendars, and more.",
    icon: "🎨",
    category: "components",
  },
  {
    id: "custom-themes",
    title: "Custom Theme Builder",
    description: "Create and export custom themes with our visual theme builder tool.",
    icon: "🎨",
    category: "tools",
  },
  {
    id: "design-tokens",
    title: "Design Token Export",
    description: "Export design tokens in multiple formats (JSON, CSS, SCSS, JS) for your projects.",
    icon: "📦",
    category: "tools",
  },
  {
    id: "api-access",
    title: "API Access",
    description: "Programmatic access to component documentation and design tokens via REST API.",
    icon: "🔌",
    category: "tools",
  },
  {
    id: "priority-support",
    title: "Priority Support",
    description: "Get faster response times and dedicated support for your questions and issues.",
    icon: "💬",
    category: "support",
  },
  {
    id: "code-examples",
    title: "Advanced Code Examples",
    description: "Access to comprehensive code examples and real-world implementation patterns.",
    icon: "💻",
    category: "components",
  },
  {
    id: "white-label",
    title: "White-Label Options",
    description: "Remove branding and customize the design system to match your brand identity.",
    icon: "🏷️",
    category: "tools",
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    description: "Share components and themes with your team members in a collaborative workspace.",
    icon: "👥",
    category: "tools",
  },
];

export function PremiumFeaturesPage() {
  const { user } = useAuth();

  const featuresByCategory = {
    components: premiumFeatures.filter((f) => f.category === "components"),
    tools: premiumFeatures.filter((f) => f.category === "tools"),
    support: premiumFeatures.filter((f) => f.category === "support"),
  };

  return (
    <>
      <SEO
        title="Premium Features"
        description="Unlock powerful premium features with a Pro or Enterprise subscription."
        keywords="premium, features, pro, enterprise, subscription"
      />
      <div className="premiumFeaturesPage">
        <div className="premiumFeaturesHeader">
          <SlimBadge variant="primary" size="sm">
            Premium
          </SlimBadge>
          <h1 className="premiumFeaturesTitle">Premium Features</h1>
          <p className="premiumFeaturesSubtitle">
            Unlock powerful features to take your development to the next level
          </p>
          {!user?.isPremium && (
            <Link to="/pricing">
              <SlimButton variant="primary" size="lg">
                Upgrade to Premium
              </SlimButton>
            </Link>
          )}
        </div>

        {user?.isPremium ? (
          <div className="premiumFeaturesContent">
            <div className="premiumFeaturesCategory">
              <h2 className="premiumFeaturesCategoryTitle">
                <span className="premiumFeaturesCategoryIcon">🎨</span>
                Premium Components
              </h2>
              <div className="premiumFeaturesGrid">
                {featuresByCategory.components.map((feature) => (
                  <div key={feature.id} className="premiumFeatureCard">
                    <div className="premiumFeatureIcon">{feature.icon}</div>
                    <h3 className="premiumFeatureTitle">{feature.title}</h3>
                    <p className="premiumFeatureDescription">{feature.description}</p>
                    <SlimBadge variant="success" size="sm">
                      Available
                    </SlimBadge>
                  </div>
                ))}
              </div>
            </div>

            <div className="premiumFeaturesCategory">
              <h2 className="premiumFeaturesCategoryTitle">
                <span className="premiumFeaturesCategoryIcon">🛠️</span>
                Developer Tools
              </h2>
              <div className="premiumFeaturesGrid">
                {featuresByCategory.tools.map((feature) => (
                  <div key={feature.id} className="premiumFeatureCard">
                    <div className="premiumFeatureIcon">{feature.icon}</div>
                    <h3 className="premiumFeatureTitle">{feature.title}</h3>
                    <p className="premiumFeatureDescription">{feature.description}</p>
                    <SlimBadge variant="success" size="sm">
                      Available
                    </SlimBadge>
                  </div>
                ))}
              </div>
            </div>

            <div className="premiumFeaturesCategory">
              <h2 className="premiumFeaturesCategoryTitle">
                <span className="premiumFeaturesCategoryIcon">💬</span>
                Support & Collaboration
              </h2>
              <div className="premiumFeaturesGrid">
                {featuresByCategory.support.map((feature) => (
                  <div key={feature.id} className="premiumFeatureCard">
                    <div className="premiumFeatureIcon">{feature.icon}</div>
                    <h3 className="premiumFeatureTitle">{feature.title}</h3>
                    <p className="premiumFeatureDescription">{feature.description}</p>
                    <SlimBadge variant="success" size="sm">
                      Available
                    </SlimBadge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <PremiumGate featureName="Premium Features">
            <div className="premiumFeaturesContent">
              <p>Please upgrade to access premium features.</p>
            </div>
          </PremiumGate>
        )}
      </div>
    </>
  );
}
