import React from "react";

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="px-5 pt-5 pb-2 sticky top-0 bg-white/90 backdrop-blur border-b">
    <div className="text-xs text-neutral-500 tracking-wide">{subtitle}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const Achievements: React.FC = () => (
  <div>
    <SectionTitle title="Achievements" subtitle="Milestones" />
    <ol className="p-5 space-y-5">
      {[
        { y: "2024", t: "Behance Feature", d: "Featured in curated galleries" },
        { y: "2023", t: "Award of Excellence", d: "International design contest" },
        { y: "2022", t: "Top 10 Illustrator", d: "University creative fest" },
      ].map((a) => (
        <li key={a.t} className="relative pl-6">
          <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-neutral-800" />
          <div className="text-xs text-neutral-500">{a.y}</div>
          <div className="font-medium">{a.t}</div>
          <div className="text-sm text-neutral-600">{a.d}</div>
        </li>
      ))}
    </ol>
  </div>
);

export default Achievements;
