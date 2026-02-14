import React from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const defaultSEO = {
  title: "Slim Design System - Modern, Accessible Component Library",
  description: "A modern, accessible, and lightweight design system built for financial applications. Create beautiful user interfaces with pre-built components and design tokens.",
  keywords: "design system, component library, React, TypeScript, UI components, accessible design, financial applications",
  image: "/og-image.png",
  siteUrl: "https://slim-ds.vercel.app",
};

export function SEO({ title, description, keywords, image }: SEOProps) {
  const location = useLocation();
  const currentUrl = `${defaultSEO.siteUrl}${location.pathname}`;
  const pageTitle = title ? `${title} | ${defaultSEO.title.split(" - ")[0]}` : defaultSEO.title;
  const pageDescription = description || defaultSEO.description;
  const pageKeywords = keywords || defaultSEO.keywords;
  const pageImage = image || defaultSEO.image;

  React.useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", pageDescription);
    updateMetaTag("keywords", pageKeywords);
    updateMetaTag("author", "Slim Khemiri");
    updateMetaTag("robots", "index, follow");

    // Open Graph tags
    updateMetaTag("og:title", pageTitle, "property");
    updateMetaTag("og:description", pageDescription, "property");
    updateMetaTag("og:image", pageImage, "property");
    updateMetaTag("og:url", currentUrl, "property");
    updateMetaTag("og:type", "website", "property");
    updateMetaTag("og:site_name", "Slim Design System", "property");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", pageTitle);
    updateMetaTag("twitter:description", pageDescription);
    updateMetaTag("twitter:image", pageImage);

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);
  }, [pageTitle, pageDescription, pageKeywords, pageImage, currentUrl]);

  return null;
}
