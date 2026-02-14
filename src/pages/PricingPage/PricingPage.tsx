import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SlimButton, SlimBadge } from "@slimkhemiri/react-design-system";
import { SEO, Footer, CheckoutModal } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import "./PricingPage.css";

interface Plan {
  id: string;
  name: string;
  price: number;
  priceId: string; // Stripe Price ID
  interval: "month" | "year";
  description: string;
  features: string[];
  popular?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceId: "",
    interval: "month",
    description: "Perfect for getting started",
    features: [
      "Access to basic components",
      "Documentation access",
      "Community support",
      "Basic examples",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    priceId: "price_pro_monthly", // Replace with your Stripe Price ID
    interval: "month",
    description: "For professional developers",
    features: [
      "Everything in Free",
      "Premium components",
      "Advanced examples",
      "Priority support",
      "Custom theme builder",
      "Export design tokens",
      "API access",
    ],
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    priceId: "price_enterprise_monthly", // Replace with your Stripe Price ID
    interval: "month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom training",
      "White-label options",
    ],
    badge: "Best Value",
  },
];

export function PricingPage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleSelectPlan = (plan: Plan) => {
    if (plan.id === "free") {
      // Free plan doesn't require payment
      return;
    }
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    setSelectedPlan(null);
    // Refresh user data to update premium status
    window.location.reload();
  };

  return (
    <>
      <SEO
        title="Pricing"
        description="Choose the perfect plan for your needs. Free, Pro, and Enterprise plans available."
        keywords="pricing, subscription, premium, pro, enterprise"
      />
      <div className="pricingPage">
        <div className="pricingHeader">
          <h1 className="pricingTitle">Choose Your Plan</h1>
          <p className="pricingSubtitle">
            Select the plan that best fits your needs. All plans include our core features.
          </p>
          <div className="pricingTrialBanner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
            </svg>
            <span className="pricingTrialText">
              <strong>14-Day Free Trial</strong> on all paid plans • No credit card required
            </span>
          </div>
        </div>

        <div className="pricingGrid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricingCard ${plan.popular ? "popular" : ""} ${
                user?.isPremium && plan.id !== "free" ? "current" : ""
              }`}
            >
              {plan.badge && (
                <div className="pricingBadge">
                  <SlimBadge variant="primary" size="sm">
                    {plan.badge}
                  </SlimBadge>
                </div>
              )}
              {user?.isPremium && plan.id !== "free" && (
                <div className="pricingCurrent">
                  <SlimBadge variant="success" size="sm">
                    Current Plan
                  </SlimBadge>
                </div>
              )}
              <div className="pricingCardHeader">
                <h3 className="pricingCardTitle">{plan.name}</h3>
                <p className="pricingCardDescription">{plan.description}</p>
              </div>
              <div className="pricingCardPrice">
                <span className="pricingPriceAmount">
                  ${plan.price}
                  {plan.price > 0 && (
                    <span className="pricingPriceInterval">/{plan.interval}</span>
                  )}
                </span>
                {plan.price > 0 && (
                  <div className="pricingTrialBadge">
                    <SlimBadge variant="success" size="sm">
                      14-Day Free Trial
                    </SlimBadge>
                  </div>
                )}
              </div>
              <ul className="pricingFeatures">
                {plan.features.map((feature, index) => (
                  <li key={index} className="pricingFeature">
                    <svg
                      className="pricingFeatureIcon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pricingCardActions">
                {plan.id === "free" ? (
                  <Link to="/">
                    <SlimButton variant="secondary" size="lg" style={{ width: "100%" }}>
                      Get Started
                    </SlimButton>
                  </Link>
                ) : user?.isPremium ? (
                  <SlimButton variant="secondary" size="lg" style={{ width: "100%" }} disabled>
                    Current Plan
                  </SlimButton>
                ) : (
                  <SlimButton
                    variant={plan.popular ? "primary" : "secondary"}
                    size="lg"
                    style={{ width: "100%" }}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {user ? "Upgrade Now" : "Get Started"}
                  </SlimButton>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pricingFAQ">
          <h2 className="pricingFAQTitle">Frequently Asked Questions</h2>
          <div className="pricingFAQGrid">
            <div className="pricingFAQItem">
              <h3 className="pricingFAQQuestion">Can I change plans later?</h3>
              <p className="pricingFAQAnswer">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected
                in your next billing cycle.
              </p>
            </div>
            <div className="pricingFAQItem">
              <h3 className="pricingFAQQuestion">What payment methods do you accept?</h3>
              <p className="pricingFAQAnswer">
                We accept all major credit cards, debit cards, and PayPal through our secure
                payment processor.
              </p>
            </div>
            <div className="pricingFAQItem">
              <h3 className="pricingFAQQuestion">Is there a free trial?</h3>
              <p className="pricingFAQAnswer">
                Yes! All paid plans come with a 14-day free trial. No credit card required to start
                your trial.
              </p>
            </div>
            <div className="pricingFAQItem">
              <h3 className="pricingFAQQuestion">Can I cancel anytime?</h3>
              <p className="pricingFAQAnswer">
                Absolutely. You can cancel your subscription at any time. You'll continue to have
                access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {selectedPlan && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          plan={selectedPlan}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </>
  );
}
