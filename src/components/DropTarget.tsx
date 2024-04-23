import React, { useState, CSSProperties } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { DraggableItem } from "../components/DraggableItem";

interface DropTargetProps {
  children: React.ReactNode;
  onDrop?: (item: DraggableItem, left: number, top: number) => void;
}

const DropTarget: React.FC<DropTargetProps> = ({ children, onDrop }) => {
  const [isOver] = useState(false);

  const imagePosition = { x: 0, y: 0 }; // Replace 0, 0 with the actual position of your image

  const [, drop] = useDrop({
    accept: ["plate", "icon"],
    drop: (item: DraggableItem, monitor: DropTargetMonitor) => {
      console.log("Drop function triggered");
      console.log("Dragging item:", item);
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };
      let left = Math.round(item.position.x + delta.x - imagePosition.x);
      let top = Math.round(item.position.y + delta.y - imagePosition.y);
      const newItem = {
        ...item,
        position: { x: left, y: top },
      };
      console.log("Before calling onDrop", newItem);
      onDrop?.(newItem, left, top);
      console.log("item", newItem);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const style: CSSProperties = {
    border: "1px solid black",
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div ref={drop} style={style}>
      {children}
    </div>
  );
};

export default DropTarget;
