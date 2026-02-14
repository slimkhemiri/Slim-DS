import React from "react";
import { SlimBadge } from "@slimkhemiri/react-design-system";
import "./PremiumFeatureCard.css";

interface PremiumFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
  isActive?: boolean;
  features?: string[];
}

export function PremiumFeatureCard({
  icon,
  title,
  description,
  image,
  isActive = false,
  features = [],
}: PremiumFeatureCardProps) {
  return (
    <div className="premiumFeatureCard">
      <div className="premiumFeatureCardImage">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="premiumFeatureCardPlaceholder">
            <div className="premiumFeatureCardIcon">{icon}</div>
          </div>
        )}
        {isActive && (
          <div className="premiumFeatureCardBadge">
            <SlimBadge variant="success" size="sm">Active</SlimBadge>
          </div>
        )}
      </div>
      <div className="premiumFeatureCardContent">
        <h3 className="premiumFeatureCardTitle">{title}</h3>
        <p className="premiumFeatureCardDescription">{description}</p>
        {features.length > 0 && (
          <ul className="premiumFeatureCardFeatures">
            {features.map((feature, index) => (
              <li key={index}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
