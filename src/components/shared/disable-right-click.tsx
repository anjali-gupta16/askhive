"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

export function DisableRightClick() {
  const [toast, setToast] = useState<{ visible: boolean; x: number; y: number }>({
    visible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleContextMenu = (e: MouseEvent) => {
      // Prevent the default browser context menu
      e.preventDefault();

      // Show brief sleek tooltip at cursor position
      setToast({
        visible: true,
        x: Math.min(e.clientX, window.innerWidth - 220),
        y: Math.min(e.clientY, window.innerHeight - 60),
      });

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 1400);
    };

    window.addEventListener("contextmenu", handleContextMenu, { capture: true });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      clearTimeout(timeoutId);
    };
  }, []);

  if (!toast.visible) return null;

  return (
    <div
      style={{ left: `${toast.x}px`, top: `${toast.y}px` }}
      className="fixed z-[9999] pointer-events-none animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-highest/95 border border-primary/40 text-on-surface shadow-2xl backdrop-blur-md text-xs font-medium">
        <Lock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <span>Right-click is locked</span>
      </div>
    </div>
  );
}
