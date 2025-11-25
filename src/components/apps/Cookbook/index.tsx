import React from "react";

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="px-5 pt-5 pb-2 sticky top-0 bg-white/90 backdrop-blur border-b">
    <div className="text-xs text-neutral-500 tracking-wide">{subtitle}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const Cookbook: React.FC = () => (
  <div>
    <SectionTitle title="Cookbook" subtitle="Tasty" />
    <div className="p-5 grid grid-cols-1 gap-4">
      {[
        { t: "Matcha Cheesecake", tag: "Dessert" },
        { t: "Spicy Ramen", tag: "Noodles" },
        { t: "Mediterranean Bowl", tag: "Healthy" },
      ].map((r) => (
        <div key={r.t} className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
          <div className="h-32 bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="p-4">
            <div className="text-sm text-neutral-500">{r.tag}</div>
            <div className="font-semibold">{r.t}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Cookbook;
