import { createContext, useContext, useState, useMemo } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { Typography } from "@mui/material";

const DndKitContext = createContext();
export const useDndKit = () => useContext(DndKitContext);

export default function DndKitProvider({ children }) {
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null); // overlay için
  const [items, setItems] = useState([]);
  const [dropped, setDropped] = useState({});

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleDragStart = (event) => {
    setActiveId(event.active?.id ?? null);
    setActiveItem(event.active?.data?.current?.item ?? null);
  };

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;

    setActiveId(null);
    setActiveItem(null);

    const dx = delta?.x ?? 0;
    const dy = delta?.y ?? 0;
    const distance = Math.hypot(dx, dy);

    if (distance < 5) return;
    if (!over) return;

    const zoneId = over.id;
    const droppedObj = active?.data?.current?.item;
    if (!droppedObj) return;

    setDropped((prev) => {
      const alreadyDropped = prev[zoneId] || [];
      const exists = alreadyDropped.some(i => i.pk_NewsId === droppedObj.pk_NewsId);

      if (exists) return prev;

      return {
        ...prev,
        [zoneId]: [...alreadyDropped, droppedObj],
      };
    });
  };


  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
  };

  const clearZone = (zoneId) =>
    setDropped((prev) => {
      const copy = { ...prev };
      delete copy[zoneId];
      return copy;
    });

  const value = useMemo(
    () => ({
      activeId,
      items,
      setItems,
      dropped,
      setDropped,
      addItem: (item) => setItems((s) => [...s, item]),
      removeItem: (id) => setItems((s) => s.filter((i) => i.id !== id)),
      clearZone,
    }),
    [activeId, items, dropped]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <DndKitContext.Provider value={value}>
        {children}
        <DragOverlay>
          {activeItem ? (
            <div style = {{
              background:"white",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              padding: "8px",
              borderRadius: 4,
            }}> 
              <Typography fontSize={14} fontWeight="bold">{activeItem.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(activeItem.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {activeItem.city}
              </Typography>
            </div>
          ) : null}
        </DragOverlay>
      </DndKitContext.Provider>
    </DndContext>
  );
}
