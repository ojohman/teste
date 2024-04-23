// MappedPlates.tsx
import React from "react";
import DragItem from "./DraggableItem";

interface MappedPlatesProps {
  plates: any[];
}

const MappedPlates: React.FC<MappedPlatesProps> = ({ plates }) => {
  return (
    <div>
      {plates.map((plate) => (
        <DragItem key={plate.id} {...plate} />
      ))}
    </div>
  );
};

export default MappedPlates;
