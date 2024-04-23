// MappedIcons.tsx
import React from "react";
import DragItem from "./DraggableItem";

interface MappedIconsProps {
  icons: any[];
}

const MappedIcons: React.FC<MappedIconsProps> = ({ icons }) => {
  return (
    <div>
      {icons.map((icon: any) => (
        <DragItem key={icon.id} {...icon} />
      ))}
    </div>
  );
};

export default MappedIcons;
