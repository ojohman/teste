import { useState } from "react";
import { useParams } from "react-router-dom";
import DragItem from "../components/DraggableItem";
import DropTarget from "../components/DropTarget";
//import MappedIcons from "../components/MappedIcons";
//import MappedPlates from "../components/MappedPlates";
import { nanoid } from "nanoid";
import { plates } from "../resources/plates";
import { icons } from "../resources/icons";
import { shirts } from "../resources/shirts";
import { DraggableItem } from "../components/DraggableItem";

const Design = () => {
  const { id } = useParams();
  const shirt = shirts.find((shirt) => shirt.id === id);

  const [localPlates, setLocalPlates] = useState<DraggableItem[]>(plates);
  const [localIcons, setLocalIcons] = useState<DraggableItem[]>(icons);
  const [droppedItems, setDroppedItems] = useState<DraggableItem[]>([]);

  const [inputText, setInputText] = useState("");
  const [inputDate, setInputDate] = useState("");

  const handleDrop = (item: DraggableItem, left: number, top: number) => {
    if (!item || !item.position) {
      console.error("Dropped item is missing or has no position", item);
      return;
    }

    const updateItem = {
      ...item,
      position: { x: left, y: top },
    };

    if (item.type === "icon") {
      setLocalIcons((prev) =>
        prev.map((icon) => (icon.id === item.id ? updateItem : icon))
      );
    } else {
      setLocalPlates((prev) =>
        prev.map((plate) => (plate.id === item.id ? updateItem : plate))
      );
    }
    setDroppedItems((prev) => [...prev, updateItem]);
  };

  const handleClear = () => {
    setLocalPlates([...plates]);
    setLocalIcons([...icons]);
    setDroppedItems([]);
  };

  console.log(localPlates.map((plate) => plate.url));
  console.log(localIcons.map((icon) => icon.url));
  return (
    <div>
      <h1>Design Your Shirt</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <input
        type="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "left",

          marginBottom: "50px",
        }}
      >
        {localPlates.map((plate) => (
          <DragItem
            key={plate.id}
            id={plate.id}
            type={plate.type}
            position={plate.position}
            url={plate.url}
            size={150}
            text={inputText}
            date={inputDate}
            style={{
              position: "absolute",
              left: `${plate.position.x}px`,
              top: `${plate.position.y}px`,
            }}
          />
        ))}
        {localIcons.map((icon) => (
          <DragItem
            key={icon.id}
            id={icon.id}
            type={icon.type}
            position={icon.position}
            url={icon.url}
            size={50}
            style={{
              position: "absolute",
              left: icon.position.x,
              top: icon.position.y,
            }}
          />
        ))}
      </div>
      <div
        style={{
          marginBottom: "100px",
        }}
      ></div>
      <div>
        <DropTarget onDrop={handleDrop}>
          <div style={{ position: "relative", height: "500px" }}>
            <img
              src={shirt?.url}
              alt={shirt?.alt}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {droppedItems.map((item) => (
            <DragItem
              key={item.id}
              id={item.id}
              type={item.type}
              position={item.position}
              url={item.url}
              style={{
                position: "absolute",
                left: `${item.position.x}px`,
                top: `${item.position.y}px`,
              }}
            />
          ))}
        </DropTarget>
      </div>

      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default Design;
