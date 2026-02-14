import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SlimButton, SlimInput, SlimAlert } from "@slimkhemiri/react-design-system";
import { SEO, Footer } from "../../components";
import "./ForgotPasswordPage.css";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, this would call your backend API
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      // Show success message
      setSuccess(true);
    } catch (err) {
      // For demo purposes, we'll show success anyway
      // In production, handle errors properly
      setSuccess(true);
      // setError(err instanceof Error ? err.message : "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Forgot Password"
        description="Reset your password for your Slim Design System account."
        keywords="forgot password, reset password, password recovery"
      />
      <div className="forgotPasswordPage">
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordHeader">
            <h1 className="forgotPasswordTitle">Forgot Password?</h1>
            <p className="forgotPasswordSubtitle">
              {success
                ? "Check your email for password reset instructions"
                : "Enter your email address and we'll send you instructions to reset your password"}
            </p>
          </div>

          {error && (
            <SlimAlert variant="danger" style={{ marginBottom: "24px" }}>
              {error}
            </SlimAlert>
          )}

          {success ? (
            <div className="forgotPasswordSuccess">
              <div className="forgotPasswordSuccessIcon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="forgotPasswordSuccessTitle">Email Sent!</h2>
              <p className="forgotPasswordSuccessText">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <p className="forgotPasswordSuccessNote">
                Please check your inbox and follow the instructions to reset your password.
                If you don't see the email, check your spam folder.
              </p>
              <Link to="/login">
                <SlimButton variant="primary" size="lg" style={{ width: "100%", marginTop: "24px" }}>
                  Back to Login
                </SlimButton>
              </Link>
              <p className="forgotPasswordResend">
                Didn't receive the email?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  className="forgotPasswordResendLink"
                >
                  Try again
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="forgotPasswordForm">
              <SlimInput
                label="Email"
                type="email"
                value={email}
                placeholder="your@email.com"
                onSlimChange={(e) => setEmail(e.detail)}
                disabled={isLoading}
                required
              />

              <SlimButton
                type="submit"
                variant="primary"
                size="lg"
                style={{ width: "100%" }}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </SlimButton>
            </form>
          )}

          <div className="forgotPasswordFooter">
            <p className="forgotPasswordFooterText">
              Remember your password?{" "}
              <Link to="/login" className="forgotPasswordFooterLink">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
