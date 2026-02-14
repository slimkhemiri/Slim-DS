import React from "react";
import { Link } from "react-router-dom";
import { SlimButton, SlimBadge } from "@slimkhemiri/react-design-system";
import { useAuth } from "../../contexts/AuthContext";
import "./PremiumGate.css";

interface PremiumGateProps {
  children: React.ReactNode;
  featureName?: string;
  showUpgrade?: boolean;
}

export function PremiumGate({ children, featureName, showUpgrade = true }: PremiumGateProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="premiumGateLoading">
        <div className="loadingSpinner"></div>
        <p>Checking access...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="premiumGate">
        <div className="premiumGateContent">
          <div className="premiumGateIcon">🔒</div>
          <h3 className="premiumGateTitle">Premium Feature</h3>
          <p className="premiumGateDescription">
            {featureName || "This feature"} is available for premium members only.
            Sign up or log in to access premium features.
          </p>
          <div className="premiumGateActions">
            <Link to="/pricing">
              <SlimButton variant="primary">View Pricing</SlimButton>
            </Link>
            <Link to="/login">
              <SlimButton variant="secondary">Log In</SlimButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user.isPremium) {
    return (
      <div className="premiumGate">
        <div className="premiumGateContent">
          <div className="premiumGateIcon">⭐</div>
          <h3 className="premiumGateTitle">Upgrade to Premium</h3>
          <p className="premiumGateDescription">
            {featureName || "This feature"} is available for premium members only.
            Upgrade your account to unlock all premium features.
          </p>
          {showUpgrade && (
            <div className="premiumGateActions">
              <Link to="/pricing">
                <SlimButton variant="primary">Upgrade Now</SlimButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
