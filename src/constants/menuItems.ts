export interface ComponentMenuItem {
  id: string;
  label: string;
  premium?: boolean;
  comingSoon?: boolean;
  icon: Array<{
    d: string;
    strokeWidth?: number;
    strokeLinecap?: "round" | "square" | "butt";
    strokeLinejoin?: "round" | "bevel" | "miter";
  }>;
}

export interface MenuSection {
  id: string;
  label: string;
  items: ComponentMenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    id: "components",
    label: "Components",
    items: [
      {
        id: "all",
        label: "All components",
        icon: [{ d: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z", strokeLinejoin: "round" }],
      },
      {
        id: "buttons",
        label: "Buttons",
        icon: [
          { d: "M6 9h12a3 3 0 0 1 0 6H6a3 3 0 0 1 0-6Z", strokeLinejoin: "round" },
          { d: "M10 12h4", strokeLinecap: "round" },
        ],
      },
      {
        id: "inputs",
        label: "Inputs",
        icon: [
          { d: "M5 7h14v10H5V7Z", strokeLinejoin: "round" },
          { d: "M8 12h8", strokeLinecap: "round" },
        ],
      },
      {
        id: "alerts",
        label: "Alerts",
        icon: [
          { d: "M12 3 2.8 20h18.4L12 3Z", strokeLinejoin: "round" },
          { d: "M12 9v4", strokeLinecap: "round" },
          { d: "M12 16h.01", strokeWidth: 3, strokeLinecap: "round" },
        ],
      },
      {
        id: "badges",
        label: "Badges",
        icon: [
          { d: "M12 2 9 5H5v4l-3 3 3 3v4h4l3 3 3-3h4v-4l3-3-3-3V5h-4l-3-3Z", strokeLinejoin: "round" },
          { d: "M9.5 12h5", strokeLinecap: "round" },
        ],
      },
      {
        id: "tooltips",
        label: "Tooltips",
        icon: [
          { d: "M12 21c5 0 9-4 9-9s-4-9-9-9-9 4-9 9 4 9 9 9Z" },
          { d: "M12 10v6", strokeLinecap: "round" },
          { d: "M12 7h.01", strokeWidth: 3, strokeLinecap: "round" },
        ],
      },
      {
        id: "tables",
        label: "Data Tables",
        comingSoon: false,
        icon: [
          { d: "M3 3h18v18H3V3Z", strokeLinejoin: "round" },
          { d: "M3 9h18M9 3v18", strokeLinecap: "round" },
        ],
      },
      {
        id: "spin",
        label: "Spin",
        comingSoon: true,
        icon: [
          { d: "M21 12a9 9 0 1 1-6.219-8.56", strokeLinecap: "round" },
        ],
      },
      {
        id: "drawer",
        label: "Drawer",
        comingSoon: true,
        icon: [
          { d: "M3 12h18M3 6h18M3 18h18", strokeLinecap: "round" },
        ],
      },
      {
        id: "notification",
        label: "Notification",
        comingSoon: true,
        icon: [
          { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0", strokeLinecap: "round", strokeLinejoin: "round" },
        ],
      },
      {
        id: "charts",
        label: "Charts",
        comingSoon: true,
        icon: [
          { d: "M3 3v18h18", strokeLinecap: "round" },
          { d: "M7 12l4-4 4 4 6-6", strokeLinecap: "round", strokeLinejoin: "round" },
        ],
      },
      {
        id: "cards",
        label: "Cards",
        comingSoon: true,
        icon: [
          { d: "M4 4h16v16H4V4Z", strokeLinejoin: "round" },
          { d: "M4 8h16M8 4v16", strokeLinecap: "round" },
        ],
      },
    ],
  },
  {
    id: "custom-components",
    label: "Advanced Components",
    items: [
      {
        id: "cartoon-style",
        label: "Cartoon",
        premium: true,
        icon: [
          { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" },
          { d: "M8 10c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2ZM14 10c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2Z" },
          { d: "M12 16c-2.67 0-4-1.33-4-2.67 0-.66.33-1.33 1-2 1.33-1.33 3-2 3-2s1.67.67 3 2c.67.67 1 1.34 1 2 0 1.34-1.33 2.67-4 2.67Z" },
        ],
      },
      {
        id: "illustration-style",
        label: "Illustration",
        premium: true,
        icon: [
          { d: "M12 2L2 7l10 5 10-5-10-5Z", strokeLinejoin: "round" },
          { d: "M2 17l10 5 10-5M2 12l10 5 10-5", strokeLinejoin: "round" },
          { d: "M12 2v20", strokeLinecap: "round" },
        ],
      },
      {
        id: "bootstrap-skeuomorphism",
        label: "Bootstrap",
        premium: true,
        icon: [
          { d: "M4 4h16v16H4V4Z", strokeLinejoin: "round" },
          { d: "M4 4l8 8 8-8", strokeLinecap: "round", strokeLinejoin: "round" },
          { d: "M4 20l8-8 8 8", strokeLinecap: "round", strokeLinejoin: "round" },
        ],
      },
      {
        id: "glass-style",
        label: "Glass Style",
        premium: true,
        icon: [
          { d: "M4 4h16v16H4V4Z", strokeLinejoin: "round" },
          { d: "M8 8h8v8H8V8Z", strokeLinejoin: "round", strokeWidth: 1.5 },
          { d: "M12 4v16M4 12h16", strokeLinecap: "round", strokeWidth: 1 },
        ],
      },
      {
        id: "geek-style",
        label: "Geek Theme",
        premium: true,
        icon: [
          { d: "M8 3L4 7l4 4M16 21l4-4-4-4", strokeLinecap: "round", strokeLinejoin: "round" },
          { d: "M4 7h16M16 17H4", strokeLinecap: "round" },
          { d: "M9 12h6", strokeLinecap: "round" },
        ],
      },
    ],
  },
];

// Flattened list for backward compatibility
export const menuItems: ComponentMenuItem[] = menuSections.flatMap(section => section.items);
