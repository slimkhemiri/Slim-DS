# @slimkhemiri/react-design-system

React bindings for the **Slim Design System** (Stencil Web Components).

This package provides:

- React components like `SlimButton`, `SlimInput`, …

## Install

```bash
npm i @slimkhemiri/react-design-system
```

This package depends on `@slimkhemiri/web-components` and `@slimkhemiri/tokens` (installed automatically).

```
// App.tsx
import { SlimButton, SlimInput } from "@slimkhemiri/react-design-system";

export function App() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <SlimInput label="Email" type="email" onSlimChange={(e) => console.log(e.detail)} />
      <SlimButton variant="primary">Click me !</SlimButton>
    </div>
  );
}
```


```

## Components

Currently exported:

- `SlimAlert` - Info, success, warning, and danger alerts
- `SlimBadge` - Status badges with multiple variants
- `SlimButton` - Primary, secondary, ghost, and danger buttons with loading states
- `SlimCheckbox` - Checkbox input (`onSlimChange` → `CustomEvent<boolean>`)
- `SlimInput` - Text input with validation (`onSlimChange` → `CustomEvent<string>`)
- `SlimSelect` - Dropdown select (`onSlimChange` → `CustomEvent<string>`)
- `SlimSwitch` - Toggle switch (`onSlimChange` → `CustomEvent<boolean>`)
- `SlimTextarea` - Multi-line text input (`onSlimChange` → `CustomEvent<string>`)
- `SlimTooltip` - Contextual tooltip with multiple placements
- `SlimPlaygroundSidebar` - Collapsible sidebar navigation

## Design Tokens

Access design tokens in JavaScript for dynamic styling:

```tsx
import { tokens } from "@slimkhemiri/tokens";

// Access base (light theme) tokens
const primaryColor = tokens.base['--sl-primary']; // "#581d74"
const spacing = tokens.base['--sl-space-4']; // "16px"

// Access theme-specific tokens
const darkSurface = tokens.themes.dark['--sl-surface']; // "#0b1220"
const hcPrimary = tokens.themes.hc['--sl-primary']; // "#fff"

// Use in your components
function MyComponent() {
  return (
    <div style={{ 
      padding: spacing,
      backgroundColor: primaryColor 
    }}>
      Custom styled content
    </div>
  );
}
```

### CSS Variables

All tokens are also available as CSS variables:

```css
.my-component {
  /* Colors */
  background: var(--sl-primary);
  color: var(--sl-primary-contrast);
  
  /* Spacing */
  padding: var(--sl-space-4);
  
  /* Typography */
  font-size: var(--sl-font-size-2);
  
  /* Border Radius */
  border-radius: var(--sl-radius-1);
  
  /* Transitions */
  transition: all var(--sl-duration-fast);
}
```

## Theming

The design system supports three themes: Light (default), Dark, and High Contrast.

```tsx
// Change theme dynamically
document.documentElement.dataset.theme = 'dark'; // or 'hc' for high contrast
```

## Resources

- 📚 [Full Documentation](https://your-playground-url.com/documentation)
- 🎨 [Color Palette](https://your-playground-url.com/colors)
- 🧩 [Component Examples](https://your-playground-url.com/components)
- 📦 [NPM Package](https://www.npmjs.com/package/@slimkhemiri/react-design-system)

