import React from "react";

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="px-5 pt-5 pb-2 sticky top-0 bg-white/90 backdrop-blur border-b">
    <div className="text-xs text-neutral-500 tracking-wide">{subtitle}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const Letter: React.FC = () => (
  <div>
    <SectionTitle title="Letter" subtitle="Say hello" />
    <div className="p-4">
      <div className="border border-neutral-900 bg-white p-3">
        <p className="text-sm leading-6">
          Dear Visitor, thanks for stopping by this playful vintage desktop. Explore apps, drag windows, and enjoy the vibes.
        </p>
      </div>
    </div>
  </div>
);

export default Letter;
