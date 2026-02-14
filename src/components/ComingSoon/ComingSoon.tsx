import React from "react";
import "./ComingSoon.css";

interface ComingSoonProps {
  featureName?: string;
}

export function ComingSoonComponent({ featureName }: ComingSoonProps) {
  return (
    <div className="comingSoon">
      <div className="comingSoonContent">
        <div className="comingSoonIcon">🚀</div>
        <h3 className="comingSoonTitle">Coming Soon</h3>
        <p className="comingSoonDescription">
          {featureName || "This feature"} is currently under development and will be available soon.
          Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}
