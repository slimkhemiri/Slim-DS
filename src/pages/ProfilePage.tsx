import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlimButton, SlimInput, SlimAlert, SlimBadge } from "@slimkhemiri/react-design-system";
import { SEO, Footer } from "../components";
import { useAuth } from "../contexts/AuthContext";
import "./ProfilePage.css";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (updateUser) {
        await updateUser(formData);
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      } else {
        throw new Error("Update function not available");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <SEO
        title="Profile"
        description="Manage your profile information and payment methods."
        keywords="profile, account, settings, payment"
      />
      <div className="profilePage">
        <div className="profileContainer">
          <div className="profileHeader">
            <h1 className="profileTitle">Profile</h1>
            <p className="profileSubtitle">Manage your account information and settings</p>
          </div>

          {error && (
            <SlimAlert variant="danger" style={{ marginBottom: "24px" }}>
              {error}
            </SlimAlert>
          )}

          {success && (
            <SlimAlert variant="success" style={{ marginBottom: "24px" }}>
              {success}
            </SlimAlert>
          )}

          <div className="profileSection">
            <div className="profileSectionHeader">
              <h2 className="profileSectionTitle">Account Information</h2>
              {!isEditing && (
                <SlimButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </SlimButton>
              )}
            </div>

            <div className="profileForm">
              <SlimInput
                label="Name"
                type="text"
                value={formData.name}
                placeholder="Enter your name"
                onSlimChange={(e) => handleInputChange("name", e.detail)}
                disabled={!isEditing || isLoading}
                required
              />

              <SlimInput
                label="Email"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                onSlimChange={(e) => handleInputChange("email", e.detail)}
                disabled={!isEditing || isLoading}
                required
              />

              <SlimInput
                label="Phone Number"
                type="tel"
                value={formData.phone}
                placeholder="Enter your phone number"
                onSlimChange={(e) => handleInputChange("phone", e.detail)}
                disabled={!isEditing || isLoading}
              />

              {isEditing && (
                <div className="profileFormActions">
                  <SlimButton
                    variant="secondary"
                    size="lg"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </SlimButton>
                  <SlimButton
                    variant="primary"
                    size="lg"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </SlimButton>
                </div>
              )}
            </div>
          </div>

          <div className="profileSection">
            <div className="profileSectionHeader">
              <h2 className="profileSectionTitle">Subscription</h2>
            </div>
            <div className="profileSubscriptionInfo">
              <div className="profileSubscriptionStatus">
                <span className="profileSubscriptionLabel">Status:</span>
                {user.isPremium ? (
                  <SlimBadge variant="primary" size="sm">
                    Premium
                  </SlimBadge>
                ) : (
                  <SlimBadge variant="neutral" size="sm">
                    Free
                  </SlimBadge>
                )}
              </div>
              {user.subscriptionEndDate && (
                <div className="profileSubscriptionDate">
                  <span className="profileSubscriptionLabel">Renews on:</span>
                  <span>{new Date(user.subscriptionEndDate).toLocaleDateString()}</span>
                </div>
              )}
              {!user.isPremium && (
                <SlimButton
                  variant="primary"
                  size="lg"
                  style={{ marginTop: "16px", width: "100%" }}
                  onClick={() => navigate("/pricing")}
                >
                  Upgrade to Premium
                </SlimButton>
              )}
            </div>
          </div>

          <div className="profileSection">
            <div className="profileSectionHeader">
              <h2 className="profileSectionTitle">Payment Methods</h2>
            </div>
            <div className="profilePaymentMethods">
              <p className="profilePaymentMethodsText">
                Manage your payment methods to keep your subscription active.
              </p>
              <SlimButton
                variant="secondary"
                size="lg"
                style={{ width: "100%", marginTop: "16px" }}
                onClick={() => {
                  // TODO: Implement payment method management
                  alert("Payment method management coming soon!");
                }}
              >
                Add Payment Method
              </SlimButton>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
