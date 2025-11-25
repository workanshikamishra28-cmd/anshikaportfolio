import { useState } from "react";

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
}: {
  items: React.ReactNode[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [cards] = useState(items);

  return (
    <div className="relative h-full w-full">
      {cards.map((card, index) => {
        return (
          <div
            key={index}
            className="absolute w-full h-full transition-all duration-500 ease-out"
            style={{
              transformOrigin: "top center",
              top: index * -offset,
              scale: `${1 - index * scaleFactor}`,
              zIndex: cards.length - index,
            }}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
};
