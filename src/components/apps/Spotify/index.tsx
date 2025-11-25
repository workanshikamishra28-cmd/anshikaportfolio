import React from "react";

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="px-5 pt-5 pb-2 sticky top-0 bg-white/90 backdrop-blur border-b">
    <div className="text-xs text-neutral-500 tracking-wide">{subtitle}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const Spotify: React.FC = () => (
  <div>
    <SectionTitle title="Now Playing" subtitle="Spotify" />
    <div className="p-4 space-y-3">
      <div className="border border-neutral-900 bg-white p-3 flex gap-3 items-center">
        <div className="h-16 w-16 bg-neutral-200 border border-neutral-900" />
        <div>
          <div className="font-semibold">Design Beats</div>
          <div className="text-sm opacity-70">Anshika Mishra</div>
        </div>
      </div>
      <div className="h-1.5 bg-neutral-900" />
    </div>
  </div>
);

export default Spotify;
