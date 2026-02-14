import React from "react";
import { Link } from "react-router-dom";
import { CodeBlock, Footer } from "./components";

export function Documentation() {
  return (
    <div className="documentationPage">
      <style>{`
        .documentationPage {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }
        .resourceCardHover:hover {
          transform: translateY(-4px);
          box-shadow: var(--sl-shadow-1);
          border-color: var(--sl-primary) !important;
        }
      `}</style>
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "var(--sl-font-weight-bold)",
          marginBottom: "16px",
          color: "var(--sl-text)",
        }}
      >
        📚 Documentation
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "var(--sl-text-light)",
          marginBottom: "40px",
          lineHeight: "1.6",
        }}
      >
        Learn how to use the Slim Design System in your projects
      </p>

      {/* Getting Started */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          🚀 Getting Started
        </h2>
        
        <h3 style={{ fontSize: "18px", fontWeight: "var(--sl-font-weight-bold)", marginTop: "24px", marginBottom: "12px", color: "var(--sl-text)" }}>
          Installation
        </h3>
        <CodeBlock
          title="Install with NPM or PNPM"
          code={`# Install with npm
npm install @slimkhemiri/react-design-system

# Or with pnpm
pnpm add @slimkhemiri/react-design-system`}
          language="bash"
        />
        <div style={{ marginTop: "12px", padding: "12px", background: "var(--sl-info-soft)", border: "1px solid var(--sl-info)", borderRadius: "var(--sl-radius-1)" }}>
          <div style={{ fontSize: "13px", color: "var(--sl-text)", lineHeight: "1.6" }}>
            <strong>💡 Note:</strong> The design tokens are automatically included as a dependency. No need to install them separately!
          </div>
        </div>

        <h3 style={{ fontSize: "18px", fontWeight: "var(--sl-font-weight-bold)", marginTop: "24px", marginBottom: "12px", color: "var(--sl-text)" }}>
          Basic Setup
        </h3>
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          Start using components right away with minimal setup:
        </p>
        <CodeBlock
          title="Basic Usage Example"
          code={`// Import components
import { SlimButton, SlimInput } from '@slimkhemiri/react-design-system';

function App() {
  return (
    <div>
      <SlimButton variant="primary">Click me</SlimButton>
      <SlimInput label="Name" placeholder="Enter your name" />
    </div>
  );
}`}
          language="tsx"
        />

        <h3 style={{ fontSize: "18px", fontWeight: "var(--sl-font-weight-bold)", marginTop: "24px", marginBottom: "12px", color: "var(--sl-text)" }}>
          Using Design Tokens
        </h3>
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          Access design tokens in JavaScript for advanced customization:
        </p>
        <CodeBlock
          title="Using Design Tokens"
          code={`// Import components
import { SlimButton, SlimInput } from '@slimkhemiri/react-design-system';

function App() {
  // Access design tokens in JavaScript
  const primaryColor = var('--sl-primary');
  const spacing = var('--sl-space-4');
  const background = var('--sl-surface');
  
  return (
    <div style={{ 
      padding: spacing,
      background: background
    }}>
      <h1 style={{ color: primaryColor }}>
        Welcome to Slim Design
      </h1>
      <SlimButton variant="primary">Click me</SlimButton>
      <SlimInput label="Name" placeholder="Enter your name" />
    </div>
  );
}`}
          language="tsx"
        />

        <div style={{ marginTop: "16px", padding: "16px", background: "var(--sl-info-soft)", border: "1px solid var(--sl-info)", borderRadius: "var(--sl-radius-1)" }}>
          <div style={{ fontSize: "14px", color: "var(--sl-text)", lineHeight: "1.6" }}>
            <strong>💡 Tip:</strong> You can also use CSS variables directly in your styles: <code style={{ background: "var(--sl-surface)", padding: "2px 6px", borderRadius: "4px" }}>var(--sl-primary)</code>. JavaScript tokens are useful when you need dynamic values or calculations.
          </div>
        </div>
      </section>

      {/* Components */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          🧩 Available Components
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "24px" }}>
          {[
            { name: "SlimButton", desc: "Primary, secondary, and ghost button variants with loading states" },
            { name: "SlimInput", desc: "Text input with label, error states, and validation" },
            { name: "SlimTextarea", desc: "Multi-line text input with resize options" },
            { name: "SlimSelect", desc: "Dropdown select with custom options" },
            { name: "SlimCheckbox", desc: "Checkbox with label and indeterminate state" },
            { name: "SlimSwitch", desc: "Toggle switch for on/off states" },
            { name: "SlimAlert", desc: "Info, success, warning, and danger alerts" },
            { name: "SlimBadge", desc: "Status badges with different variants" },
            { name: "SlimTooltip", desc: "Contextual tooltip with multiple positions" },
          ].map((comp) => (
            <div
              key={comp.name}
              style={{
                padding: "16px",
                background: "var(--sl-surface-2)",
                border: "1px solid var(--sl-border)",
                borderRadius: "var(--sl-radius-1)",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
                {comp.name}
              </div>
              <div style={{ fontSize: "14px", color: "var(--sl-text-light)", lineHeight: "1.5" }}>
                {comp.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Tokens */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          🎨 Design Tokens
        </h2>
        
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. They provide a consistent way to reference colors, spacing, typography, and other design values.
        </p>

        <h3 style={{ fontSize: "18px", fontWeight: "var(--sl-font-weight-bold)", marginTop: "24px", marginBottom: "12px", color: "var(--sl-text)" }}>
          Using CSS Variables
        </h3>
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          All design tokens are available as CSS variables. Use them in your custom styles:
        </p>

        <pre
          style={{
            background: "var(--sl-surface-2)",
            padding: "16px",
            borderRadius: "var(--sl-radius-1)",
            border: "1px solid var(--sl-border)",
            overflow: "auto",
            fontSize: "14px",
          }}
        >
          <code style={{ color: "var(--sl-text)" }}>
{`.my-custom-card {
  /* Brand Colors */
  background: var(--sl-primary);
  color: var(--sl-primary-contrast);
  
  /* Borders */
  border: 1px solid var(--sl-border);
  border-radius: var(--sl-radius-1);
  
  /* Spacing */
  padding: var(--sl-space-4);
  margin-bottom: var(--sl-space-2);
  
  /* Typography */
  font-family: var(--sl-font-family);
  font-size: var(--sl-font-size-2);
  font-weight: var(--sl-font-weight-regular);
  line-height: var(--sl-line-height-2);
  
  /* Effects */
  box-shadow: var(--sl-shadow-1);
  transition: all var(--sl-duration-fast);
}

.my-custom-card:hover {
  background: var(--sl-primary-hover);
  transform: translateY(-2px);
}

.my-custom-card:focus {
  outline: var(--sl-focus-ring);
}`}
          </code>
        </pre>

        <h3 style={{ fontSize: "18px", fontWeight: "var(--sl-font-weight-bold)", marginTop: "32px", marginBottom: "12px", color: "var(--sl-text)" }}>
          Token Categories
        </h3>
        
        <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
              🎨 Colors
            </div>
            <ul style={{ color: "var(--sl-text-light)", lineHeight: "1.6", paddingLeft: "20px", margin: "0" }}>
              <li><strong style={{ color: "var(--sl-text)" }}>Gray Palette:</strong> --sl-gray-50 to --sl-gray-900</li>
              <li><strong style={{ color: "var(--sl-text)" }}>Brand Colors:</strong> --sl-primary, --sl-secondary, --sl-accent (with hover, active, contrast, soft variants)</li>
              <li><strong style={{ color: "var(--sl-text)" }}>Status Colors:</strong> --sl-info, --sl-success, --sl-warning, --sl-danger</li>
              <li><strong style={{ color: "var(--sl-text)" }}>Semantic Colors:</strong> --sl-surface, --sl-text, --sl-border, --sl-muted</li>
            </ul>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
              📏 Spacing
            </div>
            <ul style={{ color: "var(--sl-text-light)", lineHeight: "1.6", paddingLeft: "20px", margin: "0" }}>
              <li>--sl-space-1: 4px</li>
              <li>--sl-space-2: 8px</li>
              <li>--sl-space-3: 12px</li>
              <li>--sl-space-4: 16px</li>
              <li>--sl-space-5: 24px</li>
            </ul>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
              ✍️ Typography
            </div>
            <ul style={{ color: "var(--sl-text-light)", lineHeight: "1.6", paddingLeft: "20px", margin: "0" }}>
              <li><strong style={{ color: "var(--sl-text)" }}>Font Sizes:</strong> --sl-font-size-1 (12px), --sl-font-size-2 (14px), --sl-font-size-3 (16px)</li>
              <li><strong style={{ color: "var(--sl-text)" }}>Font Weights:</strong> --sl-font-weight-regular (500), --sl-font-weight-bold (700)</li>
              <li><strong style={{ color: "var(--sl-text)" }}>Line Heights:</strong> --sl-line-height-1 (1.2), --sl-line-height-2 (1.35)</li>
            </ul>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
              ⚡ Other Tokens
            </div>
            <ul style={{ color: "var(--sl-text-light)", lineHeight: "1.6", paddingLeft: "20px", margin: "0" }}>
              <li><strong style={{ color: "var(--sl-text)" }}>Border Radius:</strong> --sl-radius-1 (6px), --sl-radius-2 (10px), --sl-radius-round (999px)</li>
              <li><strong style={{ color: "var(--sl-text)" }}>Motion:</strong> --sl-duration-instant (30ms), --sl-duration-fast (120ms)</li>
              <li><strong style={{ color: "var(--sl-text)" }}>Effects:</strong> --sl-shadow-1, --sl-focus-ring</li>
            </ul>
          </div>
        </div>

        <h3 style={{ fontSize: "18px", fontWeight: "var(--sl-font-weight-bold)", marginTop: "32px", marginBottom: "12px", color: "var(--sl-text)" }}>
          Accessing Tokens in JavaScript
        </h3>
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          Import tokens directly in your JavaScript/TypeScript code for dynamic styling:
        </p>
        <pre
          style={{
            background: "var(--sl-surface-2)",
            padding: "16px",
            borderRadius: "var(--sl-radius-1)",
            border: "1px solid var(--sl-border)",
            overflow: "auto",
            fontSize: "14px",
          }}
        >
          <code style={{ color: "var(--sl-text)" }}>
{`import { tokens } from '@slimkhemiri/react-design-system';

// Access base (light theme) tokens
const primaryColor = tokens.base['--sl-primary']; // "#581d74"
const spacing = tokens.base['--sl-space-3']; // "12px"
const borderRadius = tokens.base['--sl-radius-1']; // "6px"

// Access theme-specific tokens
const darkSurface = tokens.themes.dark['--sl-surface']; // "#0b1220"
const darkText = tokens.themes.dark['--sl-text']; // "#eef2ff"
const hcPrimary = tokens.themes.hc['--sl-primary']; // "#fff"

// Use in dynamic styles
const dynamicStyles = {
  backgroundColor: primaryColor,
  padding: spacing,
  borderRadius: borderRadius
};`}
          </code>
        </pre>

        <div style={{ marginTop: "16px", padding: "16px", background: "var(--sl-success-soft)", border: "1px solid var(--sl-success)", borderRadius: "var(--sl-radius-1)" }}>
          <div style={{ fontSize: "14px", color: "var(--sl-text)", lineHeight: "1.6" }}>
            <strong>💡 Best Practice:</strong> Use CSS variables (<code style={{ background: "var(--sl-surface)", padding: "2px 6px", borderRadius: "4px" }}>var(--sl-primary)</code>) whenever possible. JavaScript tokens are best for dynamic calculations, conditional logic, or when you need the raw values.
          </div>
        </div>
      </section>

      {/* Framework Support */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          🔧 Framework Support
        </h2>
        
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          Built with Web Components (Stencil), Slim Design System works with any modern JavaScript framework:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px", marginTop: "24px" }}>
          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
              ⚛️ React
            </div>
            <div style={{ fontSize: "13px", color: "var(--sl-text-light)", lineHeight: "1.5" }}>
              React wrappers with full TypeScript support and type-safe props
            </div>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
              🟩 Vue
            </div>
            <div style={{ fontSize: "13px", color: "var(--sl-text-light)", lineHeight: "1.5" }}>
              Import web components directly, works with Vue 2 and Vue 3
            </div>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
              🅰️ Angular
            </div>
            <div style={{ fontSize: "13px", color: "var(--sl-text-light)", lineHeight: "1.5" }}>
              Use CUSTOM_ELEMENTS_SCHEMA for seamless integration
            </div>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-primary)" }}>
              📦 Vanilla JS
            </div>
            <div style={{ fontSize: "13px", color: "var(--sl-text-light)", lineHeight: "1.5" }}>
              Works in any HTML file with standard DOM APIs
            </div>
          </div>
        </div>
      </section>

      {/* Theming */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          🎭 Theming
        </h2>
        
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          The design system supports three themes: Light, Dark, and High Contrast. Change themes by setting the <code style={{ background: "var(--sl-surface-2)", padding: "2px 6px", borderRadius: "4px" }}>data-theme</code> attribute:
        </p>

        <pre
          style={{
            background: "var(--sl-surface-2)",
            padding: "16px",
            borderRadius: "var(--sl-radius-1)",
            border: "1px solid var(--sl-border)",
            overflow: "auto",
            fontSize: "14px",
          }}
        >
          <code style={{ color: "var(--sl-text)" }}>
{`// Light theme (default)
document.documentElement.dataset.theme = '';

// Dark theme
document.documentElement.dataset.theme = 'dark';

// High contrast theme
document.documentElement.dataset.theme = 'hc';`}
          </code>
        </pre>

        <div style={{ marginTop: "24px", padding: "16px", background: "var(--sl-info-soft)", border: "1px solid var(--sl-info)", borderRadius: "var(--sl-radius-1)" }}>
          <div style={{ fontSize: "14px", color: "var(--sl-text)", lineHeight: "1.6" }}>
            <strong>💡 Tip:</strong> All colors and components automatically adapt to the selected theme. No additional configuration needed!
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          ♿ Accessibility
        </h2>
        
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          The Slim Design System is built with accessibility in mind:
        </p>

        <ul style={{ color: "var(--sl-text-light)", lineHeight: "1.8", paddingLeft: "24px" }}>
          <li>✅ <strong style={{ color: "var(--sl-text)" }}>WCAG AA Compliant:</strong> All color combinations meet contrast ratio requirements</li>
          <li>✅ <strong style={{ color: "var(--sl-text)" }}>Keyboard Navigation:</strong> All interactive elements are keyboard accessible</li>
          <li>✅ <strong style={{ color: "var(--sl-text)" }}>Screen Reader Support:</strong> Proper ARIA labels and semantic HTML</li>
          <li>✅ <strong style={{ color: "var(--sl-text)" }}>Focus Management:</strong> Clear focus indicators on all interactive elements</li>
          <li>✅ <strong style={{ color: "var(--sl-text)" }}>Reduced Motion:</strong> Respects prefers-reduced-motion setting</li>
          <li>✅ <strong style={{ color: "var(--sl-text)" }}>High Contrast Mode:</strong> Dedicated high contrast theme available</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          ✨ Best Practices
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "16px", background: "var(--sl-success-soft)", border: "1px solid var(--sl-success)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
              ✅ Do: Use semantic color tokens
            </div>
            <div style={{ fontSize: "14px", color: "var(--sl-text-light)" }}>
              Use <code style={{ background: "var(--sl-surface)", padding: "2px 6px", borderRadius: "4px" }}>var(--sl-primary)</code> instead of hardcoded hex values. This ensures automatic theme adaptation.
            </div>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-success-soft)", border: "1px solid var(--sl-success)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
              ✅ Do: Always provide labels for form inputs
            </div>
            <div style={{ fontSize: "14px", color: "var(--sl-text-light)" }}>
              Use the <code style={{ background: "var(--sl-surface)", padding: "2px 6px", borderRadius: "4px" }}>label</code> prop on all input components for accessibility.
            </div>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-danger-soft)", border: "1px solid var(--sl-danger)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
              ❌ Don&apos;t: Override component internals
            </div>
            <div style={{ fontSize: "14px", color: "var(--sl-text-light)" }}>
              Avoid using CSS to deeply override component styles. Use provided props and CSS variables instead.
            </div>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-danger-soft)", border: "1px solid var(--sl-danger)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
              ❌ Don&apos;t: Mix design systems
            </div>
            <div style={{ fontSize: "14px", color: "var(--sl-text-light)" }}>
              Avoid mixing components from different design systems in the same interface for consistency.
            </div>
          </div>
        </div>
      </section>


      {/* Package Information */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          📦 Package Structure
        </h2>
        
        <p style={{ color: "var(--sl-text-light)", marginBottom: "16px", lineHeight: "1.6" }}>
          The design system is composed of multiple packages that work together seamlessly:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
              @slimkhemiri/react-design-system
            </div>
            <div style={{ fontSize: "14px", color: "var(--sl-text-light)", marginBottom: "8px", lineHeight: "1.6" }}>
              Main package with all React components, web components, and design tokens. This is the only package you need to install.
            </div>
            <div style={{ fontSize: "13px", color: "var(--sl-muted)", fontFamily: "monospace" }}>
              npm install @slimkhemiri/react-design-system
            </div>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
              @slimkhemiri/tokens
            </div>
            <div style={{ fontSize: "14px", color: "var(--sl-text-light)", marginBottom: "8px", lineHeight: "1.6" }}>
              Design tokens package included as a dependency. Contains CSS variables and JavaScript exports for all design tokens.
            </div>
            <div style={{ fontSize: "13px", color: "var(--sl-muted)", fontStyle: "italic" }}>
              ✓ Automatically installed with react-design-system
            </div>
          </div>

          <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)" }}>
            <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
              @slimkhemiri/web-components
            </div>
            <div style={{ fontSize: "14px", color: "var(--sl-text-light)", marginBottom: "8px", lineHeight: "1.6" }}>
              Core web components built with Stencil. Provides framework-agnostic components.
            </div>
            <div style={{ fontSize: "13px", color: "var(--sl-muted)", fontStyle: "italic" }}>
              ✓ Automatically included with react-design-system
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "var(--sl-font-weight-bold)",
            marginBottom: "16px",
            color: "var(--sl-text)",
            borderBottom: "2px solid var(--sl-primary)",
            paddingBottom: "8px",
          }}
        >
          📖 Additional Resources
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          <Link to="/colors" style={{ textDecoration: "none" }}>
            <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)", transition: "all 0.2s ease", cursor: "pointer" }} className="resourceCardHover">
              <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
                🎨 Color Palette
              </div>
              <div style={{ fontSize: "14px", color: "var(--sl-text-light)", marginBottom: "12px" }}>
                Explore all available colors and their variants across themes
              </div>
              <div style={{ fontSize: "12px", color: "var(--sl-primary)", fontWeight: "var(--sl-font-weight-bold)" }}>
                View colors →
              </div>
            </div>
          </Link>

          <Link to="/components" style={{ textDecoration: "none" }}>
            <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)", transition: "all 0.2s ease", cursor: "pointer" }} className="resourceCardHover">
              <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
                🧩 Component Examples
              </div>
              <div style={{ fontSize: "14px", color: "var(--sl-text-light)", marginBottom: "12px" }}>
                See all components in action with live examples
              </div>
              <div style={{ fontSize: "12px", color: "var(--sl-primary)", fontWeight: "var(--sl-font-weight-bold)" }}>
                View components →
              </div>
            </div>
          </Link>

          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ padding: "16px", background: "var(--sl-surface-2)", border: "1px solid var(--sl-border)", borderRadius: "var(--sl-radius-1)", transition: "all 0.2s ease", cursor: "pointer" }} className="resourceCardHover">
              <div style={{ fontSize: "16px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "8px", color: "var(--sl-text)" }}>
                🏠 Get Started
              </div>
              <div style={{ fontSize: "14px", color: "var(--sl-text-light)", marginBottom: "12px" }}>
                Quick start guide and feature overview
              </div>
              <div style={{ fontSize: "12px", color: "var(--sl-primary)", fontWeight: "var(--sl-font-weight-bold)" }}>
                Go to home →
              </div>
            </div>
          </Link>
        </div>
      </section>
      </div>
      
      <Footer />
    </div>
  );
}
