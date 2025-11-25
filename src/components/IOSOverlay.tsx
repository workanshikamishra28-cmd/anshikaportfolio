import React, { useEffect, useRef, useState } from "react";
import Hobbies from "./apps/Hobbies";
import Gallery from "./apps/Gallery";
import Achievements from "./apps/Achievements";
import Cookbook from "./apps/Cookbook";
import Spotify from "./apps/Spotify";
import Letter from "./apps/Letter";
import Blogs from "./apps/Blogs";

interface IOSOverlayProps {
  open: boolean;
  onClose: () => void;
}

type AppKey =
  | "hobbies"
  | "gallery"
  | "achievements"
  | "cookbook"
  | "spotify"
  | "letter"
  | "blogs";

type WindowState = {
  id: string;
  app: AppKey;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
};

const desktopApps: { key: AppKey; label: string; icon: string }[] = [
  { key: "hobbies", label: "Hobbies", icon: "🎨" },
  { key: "gallery", label: "Gallery", icon: "🖼️" },
  { key: "achievements", label: "Badges", icon: "🏅" },
  { key: "cookbook", label: "Cookbook", icon: "🍳" },
  { key: "spotify", label: "Spotify", icon: "🎧" },
  { key: "letter", label: "Letter", icon: "✉️" },
  { key: "blogs", label: "Blogs", icon: "📚" },
];

const topZ = (wins: WindowState[]) => (wins.length ? Math.max(...wins.map((w) => w.z)) + 1 : 1);

const IOSOverlay: React.FC<IOSOverlayProps> = ({ open, onClose }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [drag, setDrag] = useState<{ id: string; offX: number; offY: number } | null>(null);
  const [sizeDrag, setSizeDrag] = useState<{ id: string; startX: number; startY: number; startW: number; startH: number } | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (drag) {
        setWindows((ws) => ws.map((w) => (w.id === drag.id ? { ...w, x: e.clientX - drag.offX, y: e.clientY - drag.offY } : w)));
      }
      if (sizeDrag) {
        const dx = e.clientX - sizeDrag.startX;
        const dy = e.clientY - sizeDrag.startY;
        setWindows((ws) =>
          ws.map((w) => (w.id === sizeDrag.id ? { ...w, w: Math.max(260, sizeDrag.startW + dx), h: Math.max(200, sizeDrag.startH + dy) } : w))
        );
      }
    };
    const onUp = () => {
      setDrag(null);
      setSizeDrag(null);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag, sizeDrag]);

  const openApp = (app: AppKey) => {
    const id = `${app}-${Date.now()}`;
    const rect = desktopRef.current?.getBoundingClientRect();
    const x = (rect?.width || 1200) * 0.18 + Math.random() * 80;
    const y = (rect?.height || 800) * 0.16 + Math.random() * 60;
    setWindows((ws) => [
      ...ws,
      { id, app, title: app.charAt(0).toUpperCase() + app.slice(1), x, y, w: 560, h: 400, z: topZ(ws) },
    ]);
  };

  const bringToFront = (id: string) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: topZ(ws) } : w)));
  const closeWindow = (id: string) => setWindows((ws) => ws.filter((w) => w.id !== id));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] select-none" role="dialog" aria-modal="true">
      {/* Wallpaper: warm paper tone + black grid */}
      <div className="absolute inset-0 bg-[#f7f3df]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#00000022 1px, transparent 1px), linear-gradient(90deg, #00000022 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top menu bar */}
      <div className="absolute top-0 inset-x-0 h-10 bg-[#ffd44d] border-b border-neutral-900 flex items-center px-3 gap-4 text-sm font-medium">
        <span className="text-neutral-900">Anshika Desktop</span>
        <span className="opacity-70">File</span>
        <span className="opacity-70">Contact</span>
        <span className="opacity-70">Settings</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="opacity-70 hidden md:inline">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <button className="px-2 py-1 border border-neutral-900 bg-white shadow-[0_2px_0_#000]" onClick={onClose}>
            Exit
          </button>
        </div>
      </div>

      {/* Desktop area */}
      <div ref={desktopRef} className="absolute inset-0 pt-12 pb-16 px-6">
        {/* Desktop icons */}
        <div className="grid grid-cols-6 md:grid-cols-10 gap-6 w-max">
          {desktopApps.map((a) => (
            <button key={a.key} onClick={() => openApp(a.key)} className="group text-center">
              <div className="mx-auto h-14 w-16 border border-neutral-900 bg-white shadow-[0_4px_0_#000] flex items-center justify-center text-2xl">
                {a.icon}
              </div>
              <div className="mt-1 text-[12px] font-medium">{a.label}</div>
            </button>
          ))}
        </div>

        {/* Windows */}
        {windows.map((w) => (
          <div
            key={w.id}
            style={{ left: w.x, top: w.y, width: w.w, height: w.h, zIndex: w.z }}
            className="absolute border border-neutral-900 bg-[#f3f0e7] shadow-[0_6px_0_#000]"
            onMouseDown={() => bringToFront(w.id)}
          >
            {/* Titlebar */}
            <div
              className="h-8 flex items-center justify-between px-2 bg-[#e6e1d2] border-b border-neutral-900 cursor-move"
              onMouseDown={(e) => {
                const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                setDrag({ id: w.id, offX: e.clientX - rect.left, offY: e.clientY - rect.top });
                bringToFront(w.id);
              }}
            >
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 border border-neutral-900 bg-[#ff605c]" />
                <span className="h-3 w-3 border border-neutral-900 bg-[#ffbd44]" />
                <span className="h-3 w-3 border border-neutral-900 bg-[#00ca4e]" />
                <span className="ml-2 text-xs font-semibold uppercase tracking-wide">{w.title}</span>
              </div>
              <button
                onClick={() => closeWindow(w.id)}
                className="ml-auto px-2 py-0.5 border border-neutral-900 bg-white shadow-[0_2px_0_#000] text-xs"
              >
                Close
              </button>
            </div>
            {/* Content */}
            <div className="w-full h-[calc(100%-2rem)] overflow-auto p-3">
              {w.app === "hobbies" && <Hobbies />}
              {w.app === "gallery" && <Gallery />}
              {w.app === "achievements" && <Achievements />}
              {w.app === "cookbook" && <Cookbook />}
              {w.app === "spotify" && <Spotify />}
              {w.app === "letter" && <Letter />}
              {w.app === "blogs" && <Blogs />}
            </div>
            {/* Resize handle */}
            <div
              className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize border-l border-t border-neutral-900 bg-[#e6e1d2]"
              onMouseDown={(e) => setSizeDrag({ id: w.id, startX: e.clientX, startY: e.clientY, startW: w.w, startH: w.h })}
            />
          </div>
        ))}
      </div>

      {/* Dock */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-end gap-3">
        {desktopApps.map((a) => (
          <button key={a.key} onClick={() => openApp(a.key)} className="transition-transform hover:scale-110">
            <div className="h-14 w-14 rounded-full border border-neutral-900 bg-white shadow-[0_6px_0_#000] flex items-center justify-center text-xl">
              {a.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IOSOverlay;
