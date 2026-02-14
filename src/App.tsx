import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, ScrollToTop, SkipLink } from "./components";
import { HomePage, ComponentsPage, DocumentationPage, ColorPalettePage, NotFoundPage, PricingPage, PremiumFeaturesPage, LoginPage, SignupPage, ForgotPasswordPage, ProfilePage } from "./pages";
import { IconsPage } from "./pages/IconsPage";
import { ThemesPage } from "./pages/ThemesPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "hc" | "hacker">("light");

  React.useEffect(() => {
    if (theme === "light") {
      document.documentElement.dataset.theme = "";
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  // Listen for theme changes from ColorPalette
  React.useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      setTheme(e.detail as "light" | "dark" | "hc" | "hacker");
    };
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    return () => window.removeEventListener('theme-change', handleThemeChange as EventListener);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <SkipLink />
        <ScrollToTop />
        <div className="page">
          <Header theme={theme} setTheme={setTheme} />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
              <Route path="/colors" element={<ColorPalettePage />} />
              <Route path="/icons" element={<IconsPage />} />
              <Route path="/themes" element={<ThemesPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/premium" element={<PremiumFeaturesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
