import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, ScrollToTop, SkipLink } from "./components";
import { HomePage, ComponentsPage, DocumentationPage, ColorPalettePage, NotFoundPage } from "./pages";
import { IconsPage } from "./pages/IconsPage";
import { ThemesPage } from "./pages/ThemesPage";
import { ResourcesPage } from "./pages/ResourcesPage";

export function App() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "hc">("light");

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme === "light" ? "" : theme;
  }, [theme]);

  return (
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
