import React from "react";

export function useSidebarCollapse() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    try {
      const v = window.localStorage.getItem("slim.playground.sidebarCollapsed");
      if (v != null) setSidebarCollapsed(v === "1");
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem("slim.playground.sidebarCollapsed", sidebarCollapsed ? "1" : "0");
    } catch {
      // ignore
    }
  }, [sidebarCollapsed]);

  return [sidebarCollapsed, setSidebarCollapsed] as const;
}
