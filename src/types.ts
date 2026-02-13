export type DemoId = "all" | "documents" | "buttons" | "inputs" | "alerts" | "badges" | "tooltips" | "colors";

export interface MenuItem {
  id: DemoId;
  label: string;
  icon: Array<{
    d: string;
    strokeWidth?: number;
    strokeLinecap?: "round" | "square" | "butt";
    strokeLinejoin?: "round" | "bevel" | "miter";
  }>;
}
