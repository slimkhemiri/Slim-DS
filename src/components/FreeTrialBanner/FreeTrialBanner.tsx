import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./FreeTrialBanner.css";
import logo from "../../icons/logo.png";
export function FreeTrialBanner() {
  const { user } = useAuth();

  if (user?.isPremium) {
    return null;
  }

  return (
    <section className="freeTrialBanner">
      <div className="freeTrialBannerContent">
        <div className="freeTrialBannerLeft">
          <img src={logo} alt="logo" className="logoImage" />
          <div className="freeTrialBannerText">
            <h3 className="freeTrialBannerTitle">Start Your 14-Day Free Trial</h3>
            <p className="freeTrialBannerDescription">
              Experience all premium features with no credit card required. Cancel anytime during your trial.
            </p>
            <div className="freeTrialBannerFeatures">
              <div className="freeTrialBannerFeature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Full access to premium features</span>
              </div>
              <div className="freeTrialBannerFeature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>AI Design Component included</span>
              </div>
              <div className="freeTrialBannerFeature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Cancel anytime, no commitment</span>
              </div>
            </div>
          </div>
        </div>
        <div className="freeTrialBannerRight">
          <Link to="/pricing" className="freeTrialBannerButton">
            <span className="freeTrialBannerButtonText">Start Free Trial</span>
            <span className="freeTrialBannerButtonSubtext">14 days • No credit card</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
