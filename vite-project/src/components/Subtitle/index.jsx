import { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box, Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Button, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TitleIcon from "@mui/icons-material/Title";
import NotesIcon from "@mui/icons-material/Notes";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
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
                  <EditIcon color="primary" fontSize="small" sx={{ mr: 1 }} onClick={() => handleEditRow(index)} />
                  <DeleteIcon color="warning" fontSize="small" onClick={() => handleDeleteRow(index)} />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            fontWeight: 700,
            pb: 1,
            bgcolor: "#2b2b35", // biraz daha açık
            color: "#f5f5f5",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {editingIndex !== null ? (
            <>
              <EditIcon fontSize="small" /> Satırı Düzenle
            </>
          ) : (
            <>
              <AddCircleOutlineIcon fontSize="small" /> Yeni Satır Ekle
            </>
          )}
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            p: 3,
            bgcolor: "#30303d", // daha açık ve soft
            color: "#fff",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="KJ 1. Satır"
              name="col1"
              value={formData.col1}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                },
                "& .MuiInputBase-label": { color: "#fff" },
                "& .MuiInputBase-input": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#fff", fontWeight: "600" },
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
              }}
            />
            <TextField
              label="KJ 2. Satır"
              name="col2"
              value={formData.col2}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                },
                "& .MuiInputBase-input": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#fff", fontWeight: "600" },
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
              }}
            />
            <TextField
              label="Açıklama"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                },
                "& .MuiInputBase-input": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#fff", fontWeight: "600" },
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Süre"
                value={formData.info}
                onChange={(newValue) =>
                  setFormData((prev) => ({ ...prev, info: newValue }))
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    InputLabelProps: { shrink: true },
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                        "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                        "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.7)" },
                      },
                      "& input": { color: "#fff !important" }, 
                      "& .MuiInputLabel-root": { color: "#fff", fontWeight: "600" },
                      "& .MuiSvgIcon-root": { color: "#fff" }, // ikon
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                    },
                  },
                }}
              />
            </LocalizationProvider>


          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            gap: 1,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            bgcolor: "#2b2b35", // header ile uyumlu
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            color="inherit"
            startIcon={<CloseIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              pl: 4,
              pr: 4,
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            İptal
          </Button>
          <Button
            onClick={handleAddRow}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              bgcolor: "#009ffd",
              backgroundImage: "linear-gradient(135deg, #009ffd, #2a2a72)",
              "&:hover": { opacity: 0.9 },
            }}
          >
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default Subtitle;
