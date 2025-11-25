import React from "react";

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="px-5 pt-5 pb-2 sticky top-0 bg-white/90 backdrop-blur border-b">
    <div className="text-xs text-neutral-500 tracking-wide">{subtitle}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const Hobbies: React.FC = () => (
  <div>
    <SectionTitle title="Hobbies" subtitle="Personal" />
    <div className="p-5 grid grid-cols-2 gap-4">
      {[
        { t: "Illustration", e: "🖌️" },
        { t: "Photography", e: "📸" },
        { t: "Motion", e: "🎞️" },
        { t: "Cooking", e: "🍰" },
        { t: "Reading", e: "📚" },
        { t: "Travel", e: "🗺️" },
      ].map((it) => (
        <div key={it.t} className="h-28 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white shadow-sm p-4 flex flex-col justify-between">
          <span className="text-2xl">{it.e}</span>
          <span className="text-sm font-medium">{it.t}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Hobbies;
