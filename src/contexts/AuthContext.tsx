import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPhoneNumber, ConfirmationResult, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, getRecaptchaVerifier } from "../config/firebase";

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  isPremium: boolean;
  subscriptionStatus?: "active" | "canceled" | "past_due" | "trialing";
  subscriptionEndDate?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  loginWithGoogle: (credential?: string) => Promise<void>;
  signupWithGoogle: (credential?: string) => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  verifyPhoneCode: (confirmationResult: ConfirmationResult, code: string) => Promise<void>;
  signupWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  logout: () => void;
  checkPremiumStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkPremiumStatus = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/subscription/status?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setUser((prev) => (prev ? { ...prev, ...data } : null));
        if (user) {
          localStorage.setItem("slim_ds_user", JSON.stringify({ ...user, ...data }));
        }
      }
    } catch (error) {
      console.error("Error checking premium status:", error);
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("slim_ds_user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          // Check premium status after user is set
          if (parsedUser?.id) {
            try {
              const response = await fetch(`/api/subscription/status?userId=${parsedUser.id}`);
              if (response.ok) {
                const data = await response.json();
                const updatedUser = { ...parsedUser, ...data };
                setUser(updatedUser);
                localStorage.setItem("slim_ds_user", JSON.stringify(updatedUser));
              }
            } catch (error) {
              console.error("Error checking premium status:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    // Test account for demo purposes - only check in frontend
    // Accept both "slim" and "slim@example.com" as email
    if ((email === "slim" || email === "slim@example.com") && password === "123") {
      const testUser: User = {
        id: "test_user_slim",
        email: "slim@example.com",
        name: "Slim",
        isPremium: false,
      };
      setUser(testUser);
      localStorage.setItem("slim_ds_user", JSON.stringify(testUser));
      return;
    }

    // For all other cases, make API call
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, throw a generic error
        throw new Error("Invalid email or password");
      }

      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      const userData: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        isPremium: data.isPremium || false,
        subscriptionStatus: data.subscriptionStatus,
        subscriptionEndDate: data.subscriptionEndDate,
      };

      setUser(userData);
      localStorage.setItem("slim_ds_user", JSON.stringify(userData));
    } catch (error) {
      // Re-throw the error so the LoginPage can handle it
      throw new Error(error instanceof Error ? error.message : "Invalid email or password");
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      // In a real app, this would call your backend API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("slim_ds_user", JSON.stringify(userData));
    } catch (error) {
      // Fallback for demo: create a mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: name || email.split("@")[0],
        isPremium: false,
      };
      setUser(mockUser);
      localStorage.setItem("slim_ds_user", JSON.stringify(mockUser));
    }
  };

  const loginWithGoogle = async (credential?: string) => {
    try {
      // In production, verify the credential token on your backend
      // For demo purposes, we'll decode it client-side (not secure for production!)
      if (credential) {
        try {
          // Decode JWT token (base64url decode)
          const base64Url = credential.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          const payload = JSON.parse(jsonPayload);

          const googleUser: User = {
            id: payload.sub || `google_${Date.now()}`,
            email: payload.email || 'user@gmail.com',
            name: payload.name || payload.given_name || 'Google User',
            isPremium: false,
          };

          setUser(googleUser);
          localStorage.setItem("slim_ds_user", JSON.stringify(googleUser));
        } catch (error) {
          console.error('Error decoding Google token:', error);
          throw error;
        }
      } else {
        // Fallback for demo
        const mockUser: User = {
          id: `google_${Date.now()}`,
          email: 'user@gmail.com',
          name: 'Google User',
          isPremium: false,
        };
        setUser(mockUser);
        localStorage.setItem("slim_ds_user", JSON.stringify(mockUser));
      }
    } catch (error) {
      // Fallback for demo: create a mock Google user
      const mockUser: User = {
        id: `google_${Date.now()}`,
        email: 'user@gmail.com',
        name: 'Google User',
        isPremium: false,
      };
      setUser(mockUser);
      localStorage.setItem("slim_ds_user", JSON.stringify(mockUser));
    }
  };

  const signupWithGoogle = async (credential?: string) => {
    // Signup and login are the same for Google OAuth
    await loginWithGoogle(credential);
  };

  const loginWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    try {
      if (!auth) {
        throw new Error("Firebase is not configured. Please set Firebase environment variables.");
      }
      const appVerifier = getRecaptchaVerifier();
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return confirmationResult;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to send verification code");
    }
  };

  const verifyPhoneCode = async (confirmationResult: ConfirmationResult, code: string) => {
    try {
      const result = await confirmationResult.confirm(code);
      const firebaseUser = result.user;

      const phoneUser: User = {
        id: firebaseUser.uid,
        phone: firebaseUser.phoneNumber || undefined,
        email: firebaseUser.email || undefined,
        name: firebaseUser.displayName || undefined,
        isPremium: false,
      };

      setUser(phoneUser);
      localStorage.setItem("slim_ds_user", JSON.stringify(phoneUser));
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Invalid verification code");
    }
  };

  const signupWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    // Signup and login are the same for phone authentication
    return await loginWithPhone(phoneNumber);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("slim_ds_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        signupWithGoogle,
        loginWithPhone,
        verifyPhoneCode,
        signupWithPhone,
        logout,
        checkPremiumStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook export - must be a function that starts with "use"
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
