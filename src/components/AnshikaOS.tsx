import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { getOSApps, getProjects } from "@/lib/sanity-queries";
import type { OSApp, Project } from "@/types/sanity";

interface AnshikaOSProps {
  open: boolean;
  onClose: () => void;
}

type WindowState = {
  id: string;
  app: OSApp;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

// macOS system apps that are always in the dock
const systemDockApps = [
  { id: 'finder', icon: 'fluent:folder-48-filled', color: '#4A9EFF', label: 'Finder' },
  { id: 'launchpad', icon: 'fluent:grid-dots-28-filled', color: '#8E8E93', label: 'Launchpad' },
  { id: 'safari', icon: 'simple-icons:safari', color: '#006EE6', label: 'Safari' },
  { id: 'messages', icon: 'fluent:chat-bubbles-question-24-filled', color: '#34C759', label: 'Messages' },
  { id: 'mail', icon: 'fluent:mail-48-filled', color: '#007AFF', label: 'Mail' },
  { id: 'maps', icon: 'fluent:location-48-filled', color: '#34C759', label: 'Maps' },
  { id: 'photos', icon: 'fluent:image-multiple-24-filled', color: '#FF3B30', label: 'Photos' },
  { id: 'facetime', icon: 'fluent:video-24-filled', color: '#34C759', label: 'FaceTime' },
  { id: 'calendar', icon: 'fluent:calendar-ltr-48-filled', color: '#FF3B30', label: 'Calendar' },
  { id: 'notes', icon: 'fluent:note-48-filled', color: '#FFD60A', label: 'Notes' },
  { id: 'reminders', icon: 'fluent:checkbox-checked-24-filled', color: '#FF9500', label: 'Reminders' },
  { id: 'tv', icon: 'fluent:tv-48-filled', color: '#000000', label: 'TV' },
  { id: 'music', icon: 'fluent:music-note-2-24-filled', color: '#FF3B30', label: 'Music' },
  { id: 'podcasts', icon: 'fluent:mic-pulse-48-filled', color: '#8E3FD9', label: 'Podcasts' },
  { id: 'appstore', icon: 'simple-icons:appstore', color: '#007AFF', label: 'App Store' },
  { id: 'settings', icon: 'fluent:settings-48-filled', color: '#8E8E93', label: 'Settings' },
  { id: 'spotify', icon: 'simple-icons:spotify', color: '#1DB954', label: 'Spotify' },
];

const AnshikaOS: React.FC<AnshikaOSProps> = ({ open, onClose }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [apps, setApps] = useState<OSApp[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [drag, setDrag] = useState<{ id: string; offX: number; offY: number } | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      // Trigger fade-in animation
      setTimeout(() => setIsVisible(true), 10);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      // Restore body scroll
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const [appsData, projectsData] = await Promise.all([
            getOSApps(),
            getProjects()
          ]);
          setApps(appsData);
          setProjects(projectsData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [open]);

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
        setWindows((ws) =>
          ws.map((w) =>
            w.id === drag.id ? { ...w, x: e.clientX - drag.offX, y: e.clientY - drag.offY } : w
          )
        );
      }
    };
    const onUp = () => setDrag(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag]);

  const topZ = (wins: WindowState[]) => (wins.length ? Math.max(...wins.map((w) => w.z)) + 1 : 1);

  const openApp = (app: OSApp) => {
    const id = `${app.appId}-${Date.now()}`;
    const rect = desktopRef.current?.getBoundingClientRect();
    const centerX = ((rect?.width || 1200) - (app.defaultSize?.width || 600)) / 2;
    const centerY = ((rect?.height || 800) - (app.defaultSize?.height || 500)) / 2;
    const x = centerX + Math.random() * 40 - 20;
    const y = centerY + Math.random() * 40 - 20;
    
    setWindows((ws) => [
      ...ws,
      {
        id,
        app,
        x,
        y,
        w: app.defaultSize?.width || 600,
        h: app.defaultSize?.height || 500,
        z: topZ(ws),
        minimized: false,
        maximized: false,
      },
    ]);
  };

  const bringToFront = (id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: topZ(ws) } : w)));
  };

  const closeWindow = (id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  };

  const restoreWindow = (id: string) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, minimized: false, z: topZ(ws) } : w))
    );
  };

  const toggleMaximize = (id: string) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id === id) {
          if (w.maximized) {
            return { ...w, maximized: false };
          } else {
            const rect = desktopRef.current?.getBoundingClientRect();
            return {
              ...w,
              maximized: true,
              x: 0,
              y: 0,
              w: rect?.width || 1200,
              h: (rect?.height || 800) - 100,
            };
          }
        }
        return w;
      })
    );
  };

  const renderAppContent = (app: OSApp) => {
    switch (app.appType) {
      case "about":
        return (
          <div className="h-full flex">
            {/* Sidebar */}
            <div className="w-48 bg-[#F8EDEA] border-r border-black/10 p-4">
              <div className="space-y-2 text-sm">
                <div className="font-medium text-[#78201B]">Session Header</div>
                <div className="pl-4 space-y-1 text-[#3d0f0d]/70">
                  <div>Work</div>
                  <div>About Me</div>
                  <div>Resume</div>
                  <div>Trash</div>
                </div>
                <div className="font-medium text-[#78201B] mt-4">Project Header</div>
                <div className="pl-4 space-y-1 text-[#3d0f0d]/70">
                  <div>Project 01</div>
                  <div>Project 02</div>
                  <div>Project 03</div>
                  <div>Project 04</div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
              <div className="max-w-2xl">
                {app.content?.image && (
                  <img
                    src={app.content.image}
                    alt={app.title}
                    className="w-64 h-64 object-cover rounded-2xl mb-6 shadow-lg"
                  />
                )}
                <h2 className="text-3xl font-bold text-[#78201B] mb-4">{app.title}</h2>
                <p className="text-[#3d0f0d] leading-relaxed whitespace-pre-wrap text-base">
                  {app.content?.text}
                </p>
              </div>
            </div>
          </div>
        );
      
      case "work":
        return (
          <div className="h-full flex">
            {/* Sidebar */}
            <div className="w-48 bg-[#F8EDEA] border-r border-black/5 p-3">
              <div className="space-y-2 text-xs">
                <div className="font-semibold text-[#78201B] text-[11px] mb-2">Session Header</div>
                <div className="pl-3 space-y-1.5 text-[#3d0f0d]/70">
                  <div className="flex items-center gap-2">
                    <Icon icon="fluent:briefcase-24-filled" className="text-xs" />
                    <span>Work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="fluent:person-24-filled" className="text-xs" />
                    <span>About Me</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="fluent:document-24-filled" className="text-xs" />
                    <span>Resume</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="fluent:delete-24-filled" className="text-xs" />
                    <span>Trash</span>
                  </div>
                </div>
                <div className="font-semibold text-[#78201B] text-[11px] mt-3 mb-2 bg-white/50 px-2 py-1 rounded">Project Header</div>
                <div className="pl-3 space-y-1.5 text-[#3d0f0d]/70">
                  {projects.slice(0, 4).map((project, i) => (
                    <div key={project._id} className="flex items-center gap-2">
                      <Icon icon="fluent:folder-24-filled" className="text-xs" />
                      <span>Project {String(i + 1).padStart(2, '0')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
              <div className="grid grid-cols-2 gap-6">
                {projects.slice(0, 4).map((project, i) => (
                  <div key={project._id} className="space-y-2">
                    {project.image?.asset?.url ? (
                      <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
                        <img 
                          src={project.image.asset.url} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-gradient-to-br from-[#78201B] to-[#5c1a1a] rounded-xl flex items-center justify-center text-white shadow-lg">
                        <Icon icon="fluent:folder-48-filled" className="text-4xl" />
                      </div>
                    )}
                    <p className="text-xs font-medium text-center">
                      Project {String(i + 1).padStart(2, '0')} ({project.category})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case "resume":
        return (
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <Icon icon="vscode-icons:file-type-pdf2" className="text-5xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#78201B]">Resume.pdf</h2>
                <p className="text-sm text-[#3d0f0d]/70">PDF Document</p>
              </div>
            </div>
            <div className="bg-[#F8EDEA] p-6 rounded-xl border border-[#78201B]/20">
              <p className="text-sm text-[#3d0f0d] mb-4">
                View my complete professional experience, education, and skills.
              </p>
              {app.content?.fileUrl && (
                <a
                  href={app.content.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-[#78201B] text-white rounded-lg hover:bg-[#5c1a1a] transition-colors"
                >
                  Download Resume
                </a>
              )}
            </div>
          </div>
        );
      
      case "todo":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#78201B] mb-4">{app.title}</h2>
            <div className="space-y-2">
              {app.content?.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-[#F8EDEA] rounded-lg hover:bg-[#F8EDEA]/80 transition-colors">
                  <input type="checkbox" className="w-4 h-4 accent-[#78201B]" />
                  <span className="text-sm text-[#3d0f0d]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "text":
        return (
          <div className="p-6 h-full">
            <div className="bg-white h-full p-6 rounded-lg shadow-inner font-sans text-sm leading-relaxed whitespace-pre-wrap text-[#3d0f0d]">
              {app.content?.text || "Empty file"}
            </div>
          </div>
        );
      
      case "spotify":
        return (
          <div className="h-full bg-gradient-to-br from-[#1DB954] to-[#1ed760] p-8 flex items-center justify-center">
            <div className="text-center text-white">
              <Icon icon="simple-icons:spotify" className="text-6xl mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-2">Switched Up</h2>
              <p className="text-lg opacity-90">Oliver Malcolm</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#78201B]">{app.title}</h2>
            <p className="text-[#3d0f0d] mt-4">{app.content?.text || "Content coming soon..."}</p>
          </div>
        );
    }
  };

  if (!open) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] select-none bg-[#e8e8e8] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00000015 1px, transparent 1px),
            linear-gradient(to bottom, #00000015 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      {/* macOS Menu Bar */}
      <div className="absolute top-0 inset-x-0 h-10 md:h-6 bg-white/70 backdrop-blur-2xl border-b border-black/5 flex items-center px-2 md:px-3 text-[10px] md:text-xs font-medium z-50">
        <Icon icon="simple-icons:apple" className="text-sm md:text-base mr-2 md:mr-3" />
        <span className="font-semibold text-[10px] md:text-xs hidden sm:inline"> Anshika Mishra Portfolio</span>
        <span className="font-semibold text-[10px] md:text-xs sm:hidden">Portfolio</span>
        <span className="ml-2 md:ml-4 opacity-70 hidden md:inline">Contact</span>
        <span className="ml-2 md:ml-4 opacity-70 hidden md:inline">Resume</span>
        
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Icon icon="fluent:search-24-filled" className="text-xs md:text-sm opacity-70 hidden sm:inline" />
          <Icon icon="fluent:wifi-1-24-filled" className="text-xs md:text-sm opacity-70 hidden sm:inline" />
          <Icon icon="fluent:battery-charge-24-filled" className="text-xs md:text-sm opacity-70 hidden sm:inline" />
          <span className="opacity-70 text-[9px] md:text-xs hidden sm:inline">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} {currentTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          </span>
          <span className="opacity-70 text-[9px] sm:hidden">
            {currentTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          </span>
          <button
            onClick={onClose}
            className="px-2 md:px-2 py-1 md:py-0.5 bg-[#78201B] text-white rounded text-[9px] md:text-[10px] hover:bg-[#5c1a1a] font-medium"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div ref={desktopRef} className="absolute inset-0 pt-10 md:pt-6 pb-16 md:pb-20">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#78201B] text-base md:text-lg">Loading...</p>
          </div>
        ) : (
          <>
            {/* Center Text - Welcome to my portfolio */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
              <div className="text-center">
                <p className="text-base md:text-2xl font-light text-black/80 mb-1 md:mb-2">welcome to my</p>
                <h1 className="text-5xl md:text-8xl font-serif italic text-black tracking-tight">
                  portfolio.
                </h1>
              </div>
            </div>

            {/* Sticky Note - To Do - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block absolute top-8 left-8 w-52 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] p-4 shadow-2xl rotate-[-1.5deg]">
              <h3 className="font-bold text-sm mb-2 text-[#78201B]">To do:</h3>
              <ul className="text-[11px] space-y-0.5 text-[#3d0f0d] leading-relaxed">
                <li>Land my dream UX job</li>
                <li>Drink water</li>
                <li>Move to the US</li>
                <li>Finish grad school without losing my mind</li>
                <li>Build that banger spotify playlist</li>
                <li>World domination</li>
                <li>Get really good at making pasta</li>
                <li>Travel somewhere new every year</li>
              </ul>
            </div>

            {/* Desktop Icons - Scattered Layout - Responsive Grid on Mobile */}
            {/* Mobile: Grid Layout */}
            <div className="md:hidden absolute inset-0 flex items-center justify-center px-4 pt-20 pb-20">
              <div className="grid grid-cols-3 gap-4 max-w-sm w-full">
                {/* Resume PDF */}
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon icon="vscode-icons:file-type-pdf2" className="text-[40px] drop-shadow-lg" />
                  </div>
                  <span className="text-[9px] font-medium text-black text-center px-1 py-0.5 bg-white/70 rounded shadow-sm line-clamp-2">
                    Resume
                  </span>
                </button>

                {/* About Me Folder */}
                <button 
                  onClick={() => apps.find(a => a.appId === 'about-me') && openApp(apps.find(a => a.appId === 'about-me')!)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon icon="vscode-icons:default-folder" className="text-[40px] drop-shadow-lg" />
                  </div>
                  <span className="text-[9px] font-medium text-black text-center px-1 py-0.5 bg-white/70 rounded shadow-sm line-clamp-2">
                    About Me
                  </span>
                </button>

                {/* Project 01 */}
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon icon="vscode-icons:default-folder" className="text-[40px] drop-shadow-lg" />
                  </div>
                  <span className="text-[9px] font-medium text-black text-center px-1 py-0.5 bg-white/70 rounded shadow-sm line-clamp-2">
                    Project 01
                  </span>
                </button>

                {/* Project 02 */}
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon icon="vscode-icons:default-folder" className="text-[40px] drop-shadow-lg" />
                  </div>
                  <span className="text-[9px] font-medium text-black text-center px-1 py-0.5 bg-white/70 rounded shadow-sm line-clamp-2">
                    Project 02
                  </span>
                </button>

                {/* Project 03 */}
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon icon="vscode-icons:default-folder" className="text-[40px] drop-shadow-lg" />
                  </div>
                  <span className="text-[9px] font-medium text-black text-center px-1 py-0.5 bg-white/70 rounded shadow-sm line-clamp-2">
                    Project 03
                  </span>
                </button>

                {/* Project 04 */}
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="relative">
                      <Icon icon="vscode-icons:default-folder" className="text-[40px] drop-shadow-lg" />
                      <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-md">
                        <Icon icon="logos:aws" className="text-xs" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-medium text-black text-center px-1 py-0.5 bg-white/70 rounded shadow-sm line-clamp-2">
                    Project 04
                  </span>
                </button>

                {/* Trash */}
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon icon="vscode-icons:default-folder" className="text-[40px] drop-shadow-lg opacity-60" />
                  </div>
                  <span className="text-[9px] font-medium text-black text-center px-1 py-0.5 bg-white/70 rounded shadow-sm line-clamp-2">
                    Don't Look
                  </span>
                </button>

                {/* Empty slots for balance */}
                <div className="opacity-0"></div>
                <div className="opacity-0"></div>
              </div>
            </div>

            {/* Tablet/Desktop: Scattered Layout */}
            {/* Resume PDF - Top Right */}
            <button className="hidden md:flex absolute top-8 right-8 flex-col items-center gap-1 group w-20">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon icon="vscode-icons:file-type-pdf2" className="text-[56px] drop-shadow-lg" />
              </div>
              <span className="text-[11px] font-medium text-black text-center px-2 py-0.5 bg-white/70 rounded shadow-sm">
                Resume.pdf
              </span>
            </button>

            {/* About Me Folder - Left Side, Below Sticky Note */}
            <button 
              onClick={() => apps.find(a => a.appId === 'about-me') && openApp(apps.find(a => a.appId === 'about-me')!)}
              className="hidden md:flex absolute top-64 left-16 flex-col items-center gap-1 group w-20"
            >
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon icon="vscode-icons:default-folder" className="text-[56px] drop-shadow-lg" />
              </div>
              <span className="text-[11px] font-medium text-black text-center px-2 py-0.5 bg-white/70 rounded shadow-sm">
                About Me
              </span>
            </button>

            {/* Project 02 - Top Right, Below Resume */}
            <button className="hidden md:flex absolute top-32 right-8 flex-col items-center gap-1 group w-24">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon icon="vscode-icons:default-folder" className="text-[56px] drop-shadow-lg" />
              </div>
              <span className="text-[11px] font-medium text-black text-center px-2 py-0.5 bg-white/70 rounded shadow-sm leading-tight">
                Project 02<br/>(Simplething)
              </span>
            </button>

            {/* Project 01 - Right Side, Middle */}
            <button className="hidden md:flex absolute top-56 right-8 flex-col items-center gap-1 group w-24">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon icon="vscode-icons:default-folder" className="text-[56px] drop-shadow-lg" />
              </div>
              <span className="text-[11px] font-medium text-black text-center px-2 py-0.5 bg-white/70 rounded shadow-sm leading-tight">
                Project 01<br/>(AbsolutMess)
              </span>
            </button>

            {/* Project 03 - Right Side, Lower Middle */}
            <button className="hidden md:flex absolute top-80 right-8 flex-col items-center gap-1 group w-24">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon icon="vscode-icons:default-folder" className="text-[56px] drop-shadow-lg" />
              </div>
              <span className="text-[11px] font-medium text-black text-center px-2 py-0.5 bg-white/70 rounded shadow-sm leading-tight">
                Project 03<br/>(Leafpress)
              </span>
            </button>

            {/* Project 04 - Right Side, Lower */}
            <button className="hidden md:flex absolute bottom-32 right-8 flex-col items-center gap-1 group w-24">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="relative">
                  <Icon icon="vscode-icons:default-folder" className="text-[56px] drop-shadow-lg" />
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-md">
                    <Icon icon="logos:aws" className="text-base" />
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-medium text-black text-center px-2 py-0.5 bg-white/70 rounded shadow-sm leading-tight">
                Project 04<br/>(Amazon)
              </span>
            </button>

            {/* Trash - Bottom Right */}
            <button className="hidden md:flex absolute bottom-8 right-8 flex-col items-center gap-1 group w-20">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon icon="vscode-icons:default-folder" className="text-[56px] drop-shadow-lg opacity-60" />
              </div>
              <span className="text-[11px] font-medium text-black text-center px-2 py-0.5 bg-white/70 rounded shadow-sm">
                Don't Look
              </span>
            </button>

            {/* Windows */}
            {windows
              .filter((w) => !w.minimized)
              .map((w) => {
                // Mobile: Full screen windows
                const isMobile = window.innerWidth < 768;
                const windowStyle = isMobile ? {
                  left: 0,
                  top: 40,
                  width: '100%',
                  height: 'calc(100% - 100px)',
                  zIndex: w.z,
                } : {
                  left: w.x,
                  top: w.y,
                  width: w.w,
                  height: w.h,
                  zIndex: w.z,
                };

                return (
                  <div
                    key={w.id}
                    style={windowStyle}
                    className="absolute bg-white/95 backdrop-blur-xl rounded-none md:rounded-xl shadow-2xl border border-black/10 overflow-hidden"
                    onMouseDown={() => bringToFront(w.id)}
                  >
                    {/* Window Title Bar */}
                    <div
                      className="h-10 md:h-9 bg-gradient-to-b from-[#F8EDEA] to-[#f0e8dd] border-b border-black/5 flex items-center px-2 md:px-3 cursor-move"
                      onMouseDown={(e) => {
                        if (!w.maximized && !isMobile) {
                          const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                          setDrag({ id: w.id, offX: e.clientX - rect.left, offY: e.clientY - rect.top });
                          bringToFront(w.id);
                        }
                      }}
                    >
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <button
                          onClick={() => closeWindow(w.id)}
                          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4136] transition-colors flex items-center justify-center group"
                        >
                          <span className="text-[8px] text-[#4d0000] opacity-0 md:group-hover:opacity-100">✕</span>
                        </button>
                        <button
                          onClick={() => minimizeWindow(w.id)}
                          className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffb700] transition-colors flex items-center justify-center group hidden md:flex"
                        >
                          <span className="text-[8px] text-[#4d3900] opacity-0 group-hover:opacity-100">−</span>
                        </button>
                        <button
                          onClick={() => toggleMaximize(w.id)}
                          className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20a030] transition-colors flex items-center justify-center group hidden md:flex"
                        >
                          <span className="text-[8px] text-[#003d00] opacity-0 group-hover:opacity-100">⤢</span>
                        </button>
                      </div>
                      <div className="flex-1 flex items-center justify-center gap-1.5 md:gap-2">
                        <Icon icon="fluent:folder-48-filled" className="text-[#78201B] text-xs md:text-sm" />
                        <span className="text-[10px] md:text-xs font-medium text-[#3d0f0d] truncate">{w.app.title}</span>
                      </div>
                    </div>

                    {/* Window Content */}
                    <div className="w-full h-[calc(100%-2.5rem)] md:h-[calc(100%-2.25rem)] overflow-auto bg-white">
                      {renderAppContent(w.app)}
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>

      {/* macOS Dock */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-1 bg-white/20 backdrop-blur-3xl rounded-xl md:rounded-2xl px-1.5 md:px-2 py-1 md:py-1.5 border border-white/30 shadow-2xl max-w-[95vw] overflow-x-auto scrollbar-hide">
        <div className="flex items-end gap-0.5 md:gap-1">
          {/* System Apps - Show fewer on mobile */}
          {systemDockApps.slice(0, window.innerWidth < 640 ? 6 : systemDockApps.length).map((app) => {
            const minimizedWindow = windows.find((w) => w.app.appId === app.id && w.minimized);
            
            return (
              <button
                key={app.id}
                onClick={() => {
                  if (minimizedWindow) {
                    restoreWindow(minimizedWindow.id);
                  }
                }}
                className="relative group flex-shrink-0"
                title={app.label}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-200 md:group-hover:scale-125 md:group-hover:-translate-y-3 active:scale-95">
                  <Icon 
                    icon={app.icon} 
                    className="text-[32px] md:text-[42px]"
                    style={{ color: app.color }}
                  />
                </div>
                {minimizedWindow && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full" />
                )}
              </button>
            );
          })}
          
          {/* Separator */}
          <div className="w-px h-10 md:h-12 bg-white/30 mx-0.5 md:mx-1 flex-shrink-0" />
          
          {/* User Apps from Sanity */}
          {apps.slice(0, 3).map((app) => {
            const minimizedWindow = windows.find((w) => w.app.appId === app.appId && w.minimized);
            
            return (
              <button
                key={app.appId}
                onClick={() => {
                  if (minimizedWindow) {
                    restoreWindow(minimizedWindow.id);
                  } else {
                    openApp(app);
                  }
                }}
                className="relative group flex-shrink-0"
                title={app.title}
              >
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-white text-lg md:text-xl shadow-lg transition-all duration-200 md:group-hover:scale-125 md:group-hover:-translate-y-3 active:scale-95"
                  style={{ backgroundColor: app.iconColor || "#78201B" }}
                >
                  <Icon icon="fluent:folder-48-filled" />
                </div>
                {minimizedWindow && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full" />
                )}
              </button>
            );
          })}
          
          {/* Trash */}
          <button
            className="relative group flex-shrink-0"
            title="Trash"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-200 md:group-hover:scale-125 md:group-hover:-translate-y-3 active:scale-95">
              <Icon icon="fluent:delete-48-filled" className="text-[32px] md:text-[42px] text-[#8E8E93]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnshikaOS;
