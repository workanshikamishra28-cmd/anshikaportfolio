import React from "react";

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="px-5 pt-5 pb-2 sticky top-0 bg-white/90 backdrop-blur border-b">
    <div className="text-xs text-neutral-500 tracking-wide">{subtitle}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const Gallery: React.FC = () => (
  <div>
    <SectionTitle title="Gallery" subtitle="Works" />
    <div className="p-3 columns-2 gap-3 [column-fill:_balance]"><div className="space-y-3">
      {[1,2,3,4,5,6,7,8].map((n) => (
        <img key={n} src={`https://picsum.photos/seed/anshika-${n}/400/300`} alt="Gallery item" className="w-full rounded-xl border border-neutral-200" />
      ))}
    </div></div>
  </div>
);

export default Gallery;
