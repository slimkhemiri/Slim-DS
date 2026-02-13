export interface ComponentMenuItem {
  id: string;
  label: string;
  icon: Array<{
    d: string;
    strokeWidth?: number;
    strokeLinecap?: "round" | "square" | "butt";
    strokeLinejoin?: "round" | "bevel" | "miter";
  }>;
}

export const menuItems: ComponentMenuItem[] = [
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
];
