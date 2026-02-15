import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlimButton, SlimInput, SlimAlert } from "@slimkhemiri/react-design-system";
import { useAuth } from "../../contexts/AuthContext";
import "./CheckoutModal.css";

interface Plan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  interval: "month" | "year";
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  onSuccess: () => void;
}

export function CheckoutModal({ isOpen, onClose, plan, onSuccess }: CheckoutModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleContinue = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    onClose();
    // Navigate to payment page with plan and email info
    navigate("/payment", {
      state: {
        plan: {
          id: plan.id,
          name: plan.name,
          price: plan.price,
          priceId: plan.priceId,
          interval: plan.interval,
        },
        email,
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="checkoutModalOverlay" onClick={onClose}>
      <div className="checkoutModal" onClick={(e) => e.stopPropagation()}>
        <button className="checkoutModalClose" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="checkoutModalContent">
          <h2 className="checkoutModalTitle">Complete Your Purchase</h2>
          <p className="checkoutModalSubtitle">
            You're about to subscribe to the <strong>{plan.name}</strong> plan
          </p>

          <div className="checkoutModalPlan">
            <div className="checkoutModalPlanInfo">
              <span className="checkoutModalPlanName">{plan.name} Plan</span>
              <span className="checkoutModalPlanPrice">
                ${plan.price}/{plan.interval}
              </span>
            </div>
            <div className="checkoutModalTrial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5Z" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"/>
              </svg>
              <span className="checkoutModalTrialText">
                <strong>14-Day Free Trial</strong> • No credit card required to start
              </span>
            </div>
          </div>

          {error && (
            <SlimAlert variant="danger" style={{ marginBottom: "16px" }}>
              {error}
            </SlimAlert>
          )}

          <div className="checkoutModalForm">
            <SlimInput
              label="Email"
              type="email"
              value={email}
              placeholder="your@email.com"
              onSlimChange={(e) => setEmail(e.detail)}
            />

            <div className="checkoutModalActions">
              <SlimButton
                variant="secondary"
                onClick={onClose}
                style={{ flex: 1 }}
              >
                Cancel
              </SlimButton>
              <SlimButton
                variant="primary"
                onClick={handleContinue}
                style={{ flex: 1 }}
              >
                Continue
              </SlimButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
