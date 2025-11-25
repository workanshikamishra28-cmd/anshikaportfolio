import React, { useEffect, useRef } from "react";

interface WindowOverlayProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const WindowOverlay: React.FC<WindowOverlayProps> = ({ open, title, onClose, children }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus trap and body scroll lock
  useEffect(() => {
    if (!open) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Restore body scroll on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* backdrop with blur effect - z-index 1 */}
      <div 
        className="absolute inset-0 z-[1] bg-black/50 backdrop-blur-sm" 
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* floating window with slide-up animation - z-index 10 */}
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative z-[10] w-[min(90vw,1100px)] h-[min(80vh,900px)] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden animate-slide-up focus:outline-none"
        style={{
          animation: 'slideUp 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}
      >
        {/* titlebar */}
        <div className="h-12 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-between px-4 shadow-sm">
          <div id="modal-title" className="font-semibold tracking-wide">{title}</div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="h-8 w-8 grid place-items-center rounded-md bg-[hsl(var(--destructive))] text-white text-xl hover:bg-[hsl(var(--destructive))]/90 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[hsl(var(--primary))]"
          >
            ×
          </button>
        </div>

        {/* content area */}
        <div className="h-[calc(100%-3rem)] overflow-auto p-6 text-[hsl(var(--foreground))] bg-[hsl(var(--background))]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WindowOverlay;
