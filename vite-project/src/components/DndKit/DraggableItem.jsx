// DraggableItem.js
import { useDraggable } from "@dnd-kit/core";
import { TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";


export default function DraggableItem({ item, children, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useDraggable({
    id: String(item.pk_NewsId),
    data: { item },
    activationConstraint: {
      delay: 180,
      tolerance: 8,
    },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  const [dragging, setDragging] = useState(false);

  const handleClick = () => {
    if (!dragging && onClick) onClick(item);
  };

  return (
    <TableRow ref={setNodeRef} sx={style} onClick={() => onClick?.(item)}>
      <TableCell>
        <Typography fontSize={14} fontWeight="bold">{item.title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(item.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.city}
        </Typography>
      </TableCell>

      {/* Drag handle sadece buraya */}
      <TableCell align="right" width={50}>
        <span
          className="drag-handle"
          style={{ cursor: "grab" }}
          {...listeners}  // sadece handle’a ekle
        >
          ☰
        </span>
      </TableCell>
    </TableRow>

  );
}
