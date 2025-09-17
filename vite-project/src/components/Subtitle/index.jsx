import { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box, Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Button, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Subtitle = forwardRef(({ initialRows = [] }, ref) => {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ col1: "", col2: "", desc: "", info: null });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRow = () => {
    if (editingIndex !== null) {
      setRows((prev) => prev.map((row, idx) => (idx === editingIndex ? formData : row)));
    } else {
      setRows((prev) => [...prev, formData]);
    }
    setOpen(false);
    setFormData({ col1: "", col2: "", desc: "", info: null });
    setEditingIndex(null);
  };

  const handleEditRow = (index) => {
    setFormData(rows[index]);
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDeleteRow = (index) => {
    setRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  // 🔹 ref üzerinden dışarıya expose edilen fonksiyon
  useImperativeHandle(ref, () => ({
    handleOpenAdd: () => {
      setFormData({ col1: "", col2: "", desc: "", info: null });
      setEditingIndex(null);
      setOpen(true);
    }
  }));

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto", width: "100%" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="25%"><Typography variant="body2" fontWeight="bold">KJ 1. satır</Typography></TableCell>
            <TableCell width="25%"><Typography variant="body2" fontWeight="bold">KJ 2. satır</Typography></TableCell>
            <TableCell width="30%"><Typography variant="body2" fontWeight="bold">Açıklama</Typography></TableCell>
            <TableCell width="10%"><Typography variant="body2" fontWeight="bold">Süre/Bilgi</Typography></TableCell>
            <TableCell width="5%"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.col1}</TableCell>
              <TableCell>{row.col2}</TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.info ? row.info.format("HH:mm") : ""}</TableCell>
              <TableCell>
                <IconButton size="small" >
                  <EditIcon color="primary" fontSize="small" sx={{mr:1}} onClick={() => handleEditRow(index)}/>
                  <DeleteIcon color="warning" fontSize="small" onClick={() => handleDeleteRow(index)}/>
                </IconButton>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          {editingIndex !== null ? "Satırı Düzenle" : "Yeni Satır Ekle"}
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="KJ 1. satır" name="col1" value={formData.col1} onChange={handleChange} fullWidth />
            <TextField label="KJ 2. satır" name="col2" value={formData.col2} onChange={handleChange} fullWidth />
            <TextField label="Açıklama" name="desc" value={formData.desc} onChange={handleChange} fullWidth multiline rows={3} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Süre"
                value={formData.info}
                onChange={(newValue) => setFormData((prev) => ({ ...prev, info: newValue }))}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">İptal</Button>
          <Button onClick={handleAddRow} variant="contained">Kaydet</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default Subtitle;
