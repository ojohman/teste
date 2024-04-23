import React, { useCallback } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

export interface DraggableItem {
  id: string;
  type: "plate" | "icon";
  position: { x: number; y: number };
  url: string;
  text?: string;
  date?: string;
  alt?: string;
  style?: React.CSSProperties;
  size?: number;
}

const DragItem: React.FC<DraggableItem> = ({
  id,
  type,
  position,
  style,
  text,
  date,
  url,
  alt,
  size,
}) => {
  const dragSpec = useCallback(
    () => ({
      type,
      item: { id, type, position, url, style, size },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, type, position, url, style, size]
  );

  const [{ isDragging }, drag, _] = useDrag(dragSpec);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? "5px solid green" : "none",
        position: "relative",
        left: position.x,
        top: position.y,
        width: `${size}px`,
        height: `${size}px`,
        zIndex: 1000,
      }}
    >
      <img
        src={url}
        alt={alt}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "contain",
        }}
        onError={(e) => {
          console.error(`Failed to load image: ${url}`);
          e.currentTarget.src = "https://via.placeholder.com/150";
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>{text}</div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default DragItem;
