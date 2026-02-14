import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlimButton, SlimInput, SlimAlert } from "@slimkhemiri/react-design-system";
import { SEO, Footer, PhoneAuth } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import "./LoginPage.css";

export function LoginPage() {
  const { login, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
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
              await loginWithGoogle(response.credential);
              navigate("/");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Google sign-in failed");
            } finally {
              setIsGoogleLoading(false);
            }
          },
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
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
  }, [loginWithGoogle, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await performLogin();
  };

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email !== "slim") {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const performLogin = async () => {
    // Clear previous errors
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid email or password";
      // Display user-friendly error message
      const userFriendlyError = errorMessage.includes("Invalid") || errorMessage.includes("email") || errorMessage.includes("password")
        ? "Invalid email or password"
        : errorMessage;
      
      setError(userFriendlyError);
      // Set field errors for better UX
      setEmailError("Invalid email or password");
      setPasswordError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Login"
        description="Login to your Slim Design System account to access premium features."
        keywords="login, sign in, account, authentication"
      />
      <div className="loginPage">
        <div className="loginContainer">
          <div className="loginHeader">
            <h1 className="loginTitle">Welcome Back</h1>
            <p className="loginSubtitle">Sign in to your account to continue</p>
          </div>

          {error && (
            <SlimAlert variant="danger" style={{ marginBottom: "24px" }}>
              {error}
            </SlimAlert>
          )}

          <div className="loginMethodToggle">
            <button
              type="button"
              className={`loginMethodButton ${loginMethod === "email" ? "active" : ""}`}
              onClick={() => setLoginMethod("email")}
            >
              Email
            </button>
            <button
              type="button"
              className={`loginMethodButton ${loginMethod === "phone" ? "active" : ""}`}
              onClick={() => setLoginMethod("phone")}
            >
              Phone
            </button>
          </div>

          <div className="loginFormWrapper">
            {loginMethod === "email" ? (
              <form 
                onSubmit={handleSubmit} 
                className="loginForm loginFormContent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    e.preventDefault();
                    performLogin();
                  }
                }}
              >
              <SlimInput
                label="Email or Username"
                type="text"
                value={email}
                placeholder="your@email.com"
                onSlimChange={(e) => {
                  setEmail(e.detail);
                  setEmailError(null);
                  setError(null);
                }}
                error={emailError || undefined}
                disabled={isLoading}
                required
              />

              <SlimInput
                label="Password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onSlimChange={(e) => {
                  setPassword(e.detail);
                  setPasswordError(null);
                  setError(null);
                }}
                error={passwordError || undefined}
                disabled={isLoading}
                required
              />

              <div className="loginOptions">
                <label className="loginRemember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="loginForgot">
                  Forgot password?
                </Link>
              </div>

              <SlimButton
                type="button"
                variant="primary"
                size="lg"
                style={{ width: "100%" }}
                disabled={isLoading}
                onClick={(e: any) => {
                  e?.preventDefault?.();
                  e?.stopPropagation?.();
                  performLogin();
                }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </SlimButton>
              </form>
            ) : (
              <div className="loginForm loginFormContent">
                <PhoneAuth
                  mode="login"
                  onSuccess={() => navigate("/")}
                />
              </div>
            )}
          </div>

          <div className="loginDivider">
            <span>or</span>
          </div>

          <div className="loginGoogle">
            <div ref={googleButtonRef} className="googleSignInButton"></div>
            {isGoogleLoading && (
              <p style={{ textAlign: "center", marginTop: "12px", color: "var(--sl-text-secondary)" }}>
                Signing in with Google...
              </p>
            )}
          </div>

          <div className="loginFooter">
            <p className="loginFooterText">
              Don't have an account?{" "}
              <Link to="/signup" className="loginFooterLink">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
