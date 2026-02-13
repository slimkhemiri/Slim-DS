import { tokens } from "@slimkhemiri/tokens";

interface ColorSwatchProps {
  name: string;
  cssVar: string;
  colorValue: string;
  description?: string;
}

function ColorSwatch({ name, cssVar, colorValue, description }: ColorSwatchProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px",
        border: "1px solid var(--sl-border)",
        borderRadius: "var(--sl-radius-1)",
        background: "var(--sl-surface-2)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "80px",
          background: `var(${cssVar})`,
          borderRadius: "var(--sl-radius-1)",
          border: "2px solid var(--sl-border-strong)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      />
      <div style={{ fontSize: "var(--sl-font-size-2)" }}>
        <div style={{ fontWeight: "var(--sl-font-weight-bold)", color: "var(--sl-text)" }}>
          {name}
        </div>
        <code
          style={{
            fontSize: "11px",
            color: "var(--sl-muted)",
            background: "var(--sl-surface-3)",
            padding: "2px 6px",
            borderRadius: "4px",
            display: "inline-block",
            marginTop: "4px",
          }}
        >
          {cssVar}
        </code>
        <div style={{ fontSize: "11px", color: "var(--sl-text-light)", marginTop: "4px" }}>
          {colorValue}
        </div>
        {description && (
          <div style={{ fontSize: "11px", color: "var(--sl-text-light)", marginTop: "4px" }}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

interface ColorSectionProps {
  title: string;
  colors: Array<{ name: string; cssVar: string; colorValue: string; description?: string }>;
}

function ColorSection({ title, colors }: ColorSectionProps) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "var(--sl-font-weight-bold)",
          marginBottom: "16px",
          color: "var(--sl-text)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {colors.map((color) => (
          <ColorSwatch
            key={color.cssVar}
            name={color.name}
            cssVar={color.cssVar}
            colorValue={color.colorValue}
            description={color.description}
          />
        ))}
      </div>
    </div>
  );
}

export function ColorPalette() {
  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "var(--sl-font-weight-bold)",
          marginBottom: "32px",
          color: "var(--sl-text)",
        }}
      >
        🎨 Color Palette
      </h1>
      <div style={{ marginTop: "48px", padding: "24px", background: "var(--sl-surface-2)", borderRadius: "var(--sl-radius-2)" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "var(--sl-font-weight-bold)", marginBottom: "12px", color: "var(--sl-text)" }}>
          💡 Tip
        </h3>
        <p style={{ color: "var(--sl-text-light)", lineHeight: "1.6" }}>
          Change the theme in the top menu to see how colors automatically adapt 
          between light, dark, and high-contrast themes.
        </p>
      </div>
      <ColorSection
        title="🎨 Gray Palette"
        colors={[
          { name: "Gray 50", cssVar: "--sl-gray-50", colorValue: tokens.base["--sl-gray-50"] },
          { name: "Gray 100", cssVar: "--sl-gray-100", colorValue: tokens.base["--sl-gray-100"] },
          { name: "Gray 200", cssVar: "--sl-gray-200", colorValue: tokens.base["--sl-gray-200"] },
          { name: "Gray 300", cssVar: "--sl-gray-300", colorValue: tokens.base["--sl-gray-300"] },
          { name: "Gray 400", cssVar: "--sl-gray-400", colorValue: tokens.base["--sl-gray-400"] },
          { name: "Gray 500", cssVar: "--sl-gray-500", colorValue: tokens.base["--sl-gray-500"] },
          { name: "Gray 600", cssVar: "--sl-gray-600", colorValue: tokens.base["--sl-gray-600"] },
          { name: "Gray 700", cssVar: "--sl-gray-700", colorValue: tokens.base["--sl-gray-700"] },
          { name: "Gray 800", cssVar: "--sl-gray-800", colorValue: tokens.base["--sl-gray-800"] },
          { name: "Gray 900", cssVar: "--sl-gray-900", colorValue: tokens.base["--sl-gray-900"] },
        ]}
      />

      <ColorSection
        title="🏢 Semantic Colors"
        colors={[
          { name: "Surface", cssVar: "--sl-surface", colorValue: tokens.base["--sl-surface"], description: "Main background" },
          { name: "Surface 2", cssVar: "--sl-surface-2", colorValue: tokens.base["--sl-surface-2"], description: "Secondary background" },
          { name: "Surface 3", cssVar: "--sl-surface-3", colorValue: tokens.base["--sl-surface-3"], description: "Tertiary background" },
          { name: "Text", cssVar: "--sl-text", colorValue: tokens.base["--sl-text"], description: "Main text" },
          { name: "Text Light", cssVar: "--sl-text-light", colorValue: tokens.base["--sl-text-light"], description: "Secondary text" },
          { name: "Muted", cssVar: "--sl-muted", colorValue: tokens.base["--sl-muted"], description: "Muted text" },
          { name: "Border", cssVar: "--sl-border", colorValue: tokens.base["--sl-border"], description: "Standard border" },
          { name: "Border Light", cssVar: "--sl-border-light", colorValue: tokens.base["--sl-border-light"], description: "Light border" },
          { name: "Border Strong", cssVar: "--sl-border-strong", colorValue: tokens.base["--sl-border-strong"], description: "Strong border" },
        ]}
      />

      <ColorSection
        title="🎯 Primary Color"
        colors={[
          { name: "Primary", cssVar: "--sl-primary", colorValue: tokens.base["--sl-primary"], description: "Main color" },
          { name: "Primary Hover", cssVar: "--sl-primary-hover", colorValue: tokens.base["--sl-primary-hover"], description: "Hover state" },
          { name: "Primary Active", cssVar: "--sl-primary-active", colorValue: tokens.base["--sl-primary-active"], description: "Active state" },
          { name: "Primary Contrast", cssVar: "--sl-primary-contrast", colorValue: tokens.base["--sl-primary-contrast"], description: "Text on primary" },
          { name: "Primary Soft", cssVar: "--sl-primary-soft", colorValue: tokens.base["--sl-primary-soft"], description: "Soft version" },
        ]}
      />

      <ColorSection
        title="🔵 Secondary Color"
        colors={[
          { name: "Secondary", cssVar: "--sl-secondary", colorValue: tokens.base["--sl-secondary"], description: "Secondary color" },
          { name: "Secondary Hover", cssVar: "--sl-secondary-hover", colorValue: tokens.base["--sl-secondary-hover"], description: "Hover state" },
          { name: "Secondary Active", cssVar: "--sl-secondary-active", colorValue: tokens.base["--sl-secondary-active"], description: "Active state" },
          { name: "Secondary Contrast", cssVar: "--sl-secondary-contrast", colorValue: tokens.base["--sl-secondary-contrast"], description: "Text on secondary" },
          { name: "Secondary Soft", cssVar: "--sl-secondary-soft", colorValue: tokens.base["--sl-secondary-soft"], description: "Soft version" },
        ]}
      />

      <ColorSection
        title="🟠 Accent Color"
        colors={[
          { name: "Accent", cssVar: "--sl-accent", colorValue: tokens.base["--sl-accent"], description: "Accent color" },
          { name: "Accent Hover", cssVar: "--sl-accent-hover", colorValue: tokens.base["--sl-accent-hover"], description: "Hover state" },
          { name: "Accent Active", cssVar: "--sl-accent-active", colorValue: tokens.base["--sl-accent-active"], description: "Active state" },
          { name: "Accent Contrast", cssVar: "--sl-accent-contrast", colorValue: tokens.base["--sl-accent-contrast"], description: "Text on accent" },
          { name: "Accent Soft", cssVar: "--sl-accent-soft", colorValue: tokens.base["--sl-accent-soft"], description: "Soft version" },
        ]}
      />

      <ColorSection
        title="📊 Status Colors"
        colors={[
          { name: "Info", cssVar: "--sl-info", colorValue: tokens.base["--sl-info"], description: "Information" },
          { name: "Info Contrast", cssVar: "--sl-info-contrast", colorValue: tokens.base["--sl-info-contrast"] },
          { name: "Info Soft", cssVar: "--sl-info-soft", colorValue: tokens.base["--sl-info-soft"] },
          { name: "Danger", cssVar: "--sl-danger", colorValue: tokens.base["--sl-danger"], description: "Error/Danger" },
          { name: "Danger Contrast", cssVar: "--sl-danger-contrast", colorValue: tokens.base["--sl-danger-contrast"] },
          { name: "Danger Soft", cssVar: "--sl-danger-soft", colorValue: tokens.base["--sl-danger-soft"] },
          { name: "Success", cssVar: "--sl-success", colorValue: tokens.base["--sl-success"], description: "Success" },
          { name: "Success Contrast", cssVar: "--sl-success-contrast", colorValue: tokens.base["--sl-success-contrast"] },
          { name: "Success Soft", cssVar: "--sl-success-soft", colorValue: tokens.base["--sl-success-soft"] },
          { name: "Warning", cssVar: "--sl-warning", colorValue: tokens.base["--sl-warning"], description: "Warning" },
          { name: "Warning Contrast", cssVar: "--sl-warning-contrast", colorValue: tokens.base["--sl-warning-contrast"] },
          { name: "Warning Soft", cssVar: "--sl-warning-soft", colorValue: tokens.base["--sl-warning-soft"] },
        ]}
      />
    </div>
  );
}
