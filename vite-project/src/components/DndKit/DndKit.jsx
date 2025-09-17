import { useDroppable } from '@dnd-kit/core';
import { Box, Typography, Table, TableBody, TableCell, TableRow, IconButton } from '@mui/material';
import { useDndKit } from "../../context/DndProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

export default function DropZone({ id, onChange }) {
  
  const { isOver, setNodeRef } = useDroppable({ id });
  const { dropped, setDropped } = useDndKit();

  const zoneItems = dropped[id] ?? [];
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(zoneItems);
    }
  }, [JSON.stringify(zoneItems)]);

  const removeItem = (itemId) => {
    setDropped((prev) => ({
      ...prev,
      [id]: (prev[id] || []).filter((i) => i.pk_NewsId !== itemId),
    }));
  };

  return (
    <Box ref={setNodeRef} sx={{ backgroundColor: isOver ? "#f0f0f0" : "#fafafa" }}>
      <Table>
        <TableBody>
          {zoneItems.map(item => (
            <TableRow
              key={item.pk_NewsId}
              onMouseEnter={() => setHoveredId(item.pk_NewsId)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <TableCell sx={{p:1}}>
                <Typography fontSize={14} fontWeight="bold">{item.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.city}
                </Typography>
              </TableCell>

              <TableCell align="right" width={10}>
                {hoveredId === item.pk_NewsId && (
                  <IconButton onClick={() => removeItem(item.pk_NewsId)} size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
