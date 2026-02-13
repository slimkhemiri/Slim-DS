import React from "react";

export function useSidebarPosition() {
  const [sidebarTop, setSidebarTop] = React.useState(24);

  React.useEffect(() => {
    const header = document.querySelector(".header") as HTMLElement | null;
    if (!header) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = header.getBoundingClientRect();
        const next = Math.max(24, Math.round(rect.bottom + 16));
        setSidebarTop(next);
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(header);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return sidebarTop;
}
