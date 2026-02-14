import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
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
  logout: () => void;
  checkPremiumStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("slim_ds_user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          // Check premium status
          await checkPremiumStatus();
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("slim_ds_user");
  };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        signupWithGoogle,
        logout,
        checkPremiumStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
