import React from "react";

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="px-5 pt-5 pb-2 sticky top-0 bg-white/90 backdrop-blur border-b">
    <div className="text-xs text-neutral-500 tracking-wide">{subtitle}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const Blogs: React.FC = () => (
  <div>
    <SectionTitle title="Blogs" subtitle="Writing" />
    <div className="p-4 space-y-3">
      {[1,2,3].map((i) => (
        <div key={i} className="border border-neutral-900 bg-white p-3">
          <div className="text-sm opacity-70">2024-0{i}</div>
          <div className="font-semibold">Aesthetic explorations #{i}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Blogs;
