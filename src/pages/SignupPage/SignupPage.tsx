import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlimButton, SlimInput, SlimAlert } from "@slimkhemiri/react-design-system";
import { SEO, Footer, PhoneAuth } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import "./SignupPage.css";

export function SignupPage() {
  const { signup, signupWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const googleButtonRef = React.useRef<HTMLDivElement>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Initialize Google Sign-In button
  useEffect(() => {
    const initGoogleSignIn = () => {
      if (typeof window.google !== 'undefined' && window.google.accounts && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '367005494935-h2p30jiktaj2rq46qmf0vm5dkjoao7bs.apps.googleusercontent.com',
          callback: async (response: { credential: string }) => {
            setIsGoogleLoading(true);
            try {
              await signupWithGoogle(response.credential);
              navigate("/");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Google sign-up failed");
            } finally {
              setIsGoogleLoading(false);
            }
          },
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signup_with',
          width: googleButtonRef.current.offsetWidth || 300,
        });
      }
    };

    // Wait for Google script to load
    const checkGoogle = setInterval(() => {
      if (typeof window.google !== 'undefined') {
        clearInterval(checkGoogle);
        initGoogleSignIn();
      }
    }, 100);

    return () => clearInterval(checkGoogle);
  }, [signupWithGoogle, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      await signup(email, password, name);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign Up"
        description="Create a new account to access Slim Design System features and premium content."
        keywords="sign up, register, create account, signup"
      />
      <div className="signupPage">
        <div className="signupContainer">
          <div className="signupHeader">
            <h1 className="signupTitle">Create Account</h1>
            <p className="signupSubtitle">Sign up to get started with Slim Design System</p>
          </div>

          {error && (
            <SlimAlert variant="danger" style={{ marginBottom: "24px" }}>
              {error}
            </SlimAlert>
          )}

          <div className="signupMethodToggle">
            <button
              type="button"
              className={`signupMethodButton ${signupMethod === "email" ? "active" : ""}`}
              onClick={() => setSignupMethod("email")}
            >
              Email
            </button>
            <button
              type="button"
              className={`signupMethodButton ${signupMethod === "phone" ? "active" : ""}`}
              onClick={() => setSignupMethod("phone")}
            >
              Phone
            </button>
          </div>

          <div className="signupFormWrapper">
            {signupMethod === "email" ? (
              <form onSubmit={handleSubmit} className="signupForm signupFormContent">
            <SlimInput
              label="Full Name"
              type="text"
              value={name}
              placeholder="John Doe"
              onSlimChange={(e) => setName(e.detail)}
              disabled={isLoading}
              required
            />

            <SlimInput
              label="Email"
              type="email"
              value={email}
              placeholder="your@email.com"
              onSlimChange={(e) => setEmail(e.detail)}
              disabled={isLoading}
              required
            />

            <SlimInput
              label="Password"
              type="password"
              value={password}
              placeholder="At least 8 characters"
              onSlimChange={(e) => setPassword(e.detail)}
              disabled={isLoading}
              required
            />

            <SlimInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onSlimChange={(e) => setConfirmPassword(e.detail)}
              disabled={isLoading}
              required
            />

            <div className="signupTerms">
              <label className="signupTermsLabel">
                <input type="checkbox" required />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="signupTermsLink">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="signupTermsLink">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <SlimButton
              type="submit"
              variant="primary"
              size="lg"
              style={{ width: "100%" }}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </SlimButton>
              </form>
            ) : (
              <div className="signupForm signupFormContent">
                <PhoneAuth
                  mode="signup"
                  onSuccess={() => navigate("/")}
                />
              </div>
            )}
          </div>

          <div className="signupDivider">
            <span>or</span>
          </div>

          <div className="signupGoogle">
            <div ref={googleButtonRef} className="googleSignInButton"></div>
            {isGoogleLoading && (
              <p style={{ textAlign: "center", marginTop: "12px", color: "var(--sl-text-secondary)" }}>
                Signing up with Google...
              </p>
            )}
          </div>

          <div className="signupFooter">
            <p className="signupFooterText">
              Already have an account?{" "}
              <Link to="/login" className="signupFooterLink">
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
