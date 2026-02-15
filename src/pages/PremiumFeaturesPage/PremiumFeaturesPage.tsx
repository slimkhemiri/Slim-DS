import React from "react";
import { Link } from "react-router-dom";
import { SlimButton, SlimBadge } from "@slimkhemiri/react-design-system";
import { SEO, PremiumFeatureCard } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
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
    id: "hacker-colors",
    title: "Hacker Mode Colors",
    description: "Access exclusive color palettes including the Hacker Mode theme with green degradation colors for a unique dark aesthetic.",
    icon: "💚",
    category: "components",
  },
  {
    id: "premium-themes",
    title: "Premium Themes",
    description: "Unlock exclusive themes like Hacker Mode with custom color schemes and advanced theming options.",
    icon: "🎨",
    category: "components",
  },
  {
    id: "premium-icons",
    title: "Premium Icon Library",
    description: "Access to an extensive premium icon library with 100+ icons in SVG format, fully customizable and theme-aware.",
    icon: "🎯",
    category: "components",
  },
  {
    id: "custom-components",
    title: "Customizable Components",
    description: "Get components fully customizable to meet your client's specific needs with advanced configuration options.",
    icon: "⚙️",
    category: "components",
  },
  {
    id: "advanced-components",
    title: "Advanced Components",
    description: "Access to premium UI components including charts, premium cards, data tables, and more advanced components.",
    icon: "📊",
    category: "components",
  },
  {
    id: "custom-themes",
    title: "Custom Theme Builder",
    description: "Create and export custom themes with our visual theme builder tool tailored to your brand.",
    icon: "🛠️",
    category: "tools",
  },
  {
    id: "design-tokens",
    title: "Design Token Export",
    description: "Export design tokens in multiple formats (JSON, CSS, SCSS, JS) for seamless integration with your projects.",
    icon: "📦",
    category: "tools",
  },
  {
    id: "api-access",
    title: "API Access",
    description: "Programmatic access to component documentation and design tokens via REST API for automation.",
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
    description: "Access to comprehensive code examples and real-world implementation patterns for all premium features.",
    icon: "💻",
    category: "components",
  },
  {
    id: "white-label",
    title: "White-Label Options",
    description: "Remove branding and customize the design system to match your brand identity perfectly.",
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

const overviewFeatures = [
  {
    icon: "🤖",
    title: "AI Design Component",
    description: "Transform ideas into code with our AI-powered component generator. Describe what you need and get production-ready React components with TypeScript, styling, and best practices built-in.",
    features: ["Instant generation", "Production-ready code", "TypeScript support", "Best practices"],
  },
  {
    icon: "💚",
    title: "Hacker Mode Colors",
    description: "Exclusive green degradation color palette with dark aesthetic. Perfect for creating unique, eye-catching interfaces with a hacker-inspired theme.",
    features: ["Green degradation palette", "Dark aesthetic", "Custom color schemes", "Theme integration"],
  },
  {
    icon: "🎨",
    title: "Premium Themes",
    description: "Access to exclusive themes including Hacker Mode with custom color schemes and advanced theming options for your applications.",
    features: ["Hacker Mode theme", "Custom color schemes", "Advanced theming", "Theme builder"],
  },
  {
    icon: "🎯",
    title: "Premium Icon Library",
    description: "100+ premium icons in SVG format, fully customizable and theme-aware. Access an extensive icon library designed for the Slim Design System.",
    features: ["100+ premium icons", "SVG format", "Fully customizable", "Theme-aware"],
  },
  {
    icon: "⚙️",
    title: "Customizable Components",
    description: "Get components fully customizable to meet your client's specific needs. Tailor every aspect of components to match your project requirements.",
    features: ["Client-specific customization", "Advanced configuration", "Flexible components", "Brand matching"],
  },
  {
    icon: "📊",
    title: "Advanced Components",
    description: "Charts, premium cards, data tables, and more advanced UI components. Build sophisticated dashboards and data visualizations.",
    features: ["Charts & graphs", "Premium cards", "Data tables", "Dashboard components"],
  },
  {
    icon: "🛠️",
    title: "Developer Tools",
    description: "Theme builder, design token export, API access, and more powerful tools to streamline your development workflow.",
    features: ["Theme builder", "Token export", "API access", "Development tools"],
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

        <div className="premiumFeaturesContent">
          <div className="premiumFeaturesOverview">
            <h2 className="premiumFeaturesOverviewTitle">Premium Features Overview</h2>
            <p className="premiumFeaturesOverviewDescription">
              {user?.isPremium 
                ? "As a premium member, you have access to exclusive features that enhance your development experience:"
                : "Unlock powerful premium features to take your development to the next level. Upgrade to access:"}
            </p>
            <div className="premiumFeaturesOverviewGrid">
              {overviewFeatures.map((feature, index) => (
                <PremiumFeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  features={feature.features}
                  isActive={user?.isPremium}
                />
              ))}
            </div>
          </div>

        {user?.isPremium ? (
          <>

            <div className="premiumFeaturesCategory">
              <h2 className="premiumFeaturesCategoryTitle">
                <span className="premiumFeaturesCategoryIcon">🎨</span>
                Premium Components
              </h2>
              <div className="premiumFeaturesGrid">
                {featuresByCategory.components.map((feature) => (
                  <PremiumFeatureCard
                    key={feature.id}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    isActive={true}
                  />
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
                  <PremiumFeatureCard
                    key={feature.id}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    isActive={true}
                  />
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
                  <PremiumFeatureCard
                    key={feature.id}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    isActive={true}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="premiumFeaturesUpgrade">
            <h2 className="premiumFeaturesUpgradeTitle">Ready to Unlock Premium Features?</h2>
            <p className="premiumFeaturesUpgradeDescription">
              Upgrade to Pro or Enterprise to access all premium features and take your development to the next level.
            </p>
            <Link to="/pricing">
              <SlimButton variant="primary" size="lg">
                View Pricing Plans
              </SlimButton>
            </Link>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
