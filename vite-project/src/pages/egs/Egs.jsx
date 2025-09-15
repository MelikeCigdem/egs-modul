import { useState } from "react";
import {
       Box,
       Grid,
       Tabs,
       Tab,
       Card,
       CardHeader,
       CardContent,
       CardActions,
       TextField,
       Select,
       MenuItem,
       Button,
       Typography,
       Table,
       Dialog,
       DialogActions,
       DialogContent,
       DialogTitle,
       TableHead,
       TableBody,
       TableRow,
       TableCell,
       Paper,
       TableContainer,
       Stack,
       FormControl,
       InputLabel,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FlowIcon from "@mui/icons-material/CallSplit";
import SaveIcon from "@mui/icons-material/Save";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './Egs.module.scss';
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

function Egs() {
       const { control, handleSubmit, watch } = useForm({
              defaultValues: {
                     title: "",
                     description: "",
                     date: null,
                     newsletter: "",
                     subtitleText: "",
                     mainText: "",
              },
       });

       const onSubmit = (data) => {
              console.log(data);
       };
       const [tab, setTab] = useState(0);
       const handleChangeTab = (event, newValue) => {
              setTab(newValue);
       };

       const [rows, setRows] = useState([]);
       const [open, setOpen] = useState(false);
       const [formData, setFormData] = useState({
              col1: "",
              col2: "",
              desc: "",
              info: null,
       });

       const handleOpen = () => setOpen(true);
       const handleClose = () => {
              setOpen(false);
              setFormData({ col1: "", col2: "", desc: "", info: null });
       };

       const handleChange = (e) => {
              setFormData({
                     ...formData,
                     [e.target.name]: e.target.value,
              });
       };

       const handleAddRow = () => {
              setRows([...rows, formData]);
              handleClose();
       };


       return (
              <Grid container sx={{ height: "100vh", width: '100%' }}> {/* Tam ekran */}
                     {/* Sol taraf */}
                     <Grid item size={3} sx={{ borderRight: "1px solid #ddd", height: "100%" }}>
                            <Card sx={{ height: "100%", borderRadius: 0, display: "flex", flexDirection: "column" }}>
                                   <Tabs
                                          value={tab}
                                          onChange={handleChangeTab}
                                          variant="fullWidth"
                                          sx={{ borderBottom: 1, borderColor: "divider", minHeight: 40 }}
                                   >
                                          <Tab label="Haberlerim" sx={{ minHeight: 40, fontSize: "0.8rem" }} />
                                          <Tab label="Havuz" sx={{ minHeight: 40, fontSize: "0.8rem" }} />
                                          <Tab label="Bülten" sx={{ minHeight: 40, fontSize: "0.8rem" }} />
                                          <Tab label="Ajans" sx={{ minHeight: 40, fontSize: "0.8rem" }} />
                                   </Tabs>

                                   <Box sx={{ flexGrow: 1, overflow: "auto" }}>
                                          {tab === 0 && (
                                                 <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
                                                        <Table size="small">
                                                               <TableBody>
                                                                      <TableRow>
                                                                             <TableCell sx={{ width: 20 }}>☰</TableCell>
                                                                             <TableCell>
                                                                                    <Typography fontWeight="bold">
                                                                                           41 yıllık Bayburt İmam Hatip Lisesi binası yıkıldı
                                                                                    </Typography>
                                                                                    <Typography variant="caption" color="text.secondary">
                                                                                           00:00
                                                                                    </Typography>
                                                                             </TableCell>
                                                                      </TableRow>
                                                               </TableBody>
                                                        </Table>
                                                 </TableContainer>
                                          )}
                                          {tab === 1 && <Typography p={2} color="text.secondary">Havuz içerikleri buraya gelecek</Typography>}
                                          {tab === 2 && <Typography p={2} color="text.secondary">Bülten içerikleri buraya gelecek</Typography>}
                                          {tab === 3 && <Typography p={2} color="text.secondary">Ajans içerikleri buraya gelecek</Typography>}
                                   </Box>
                            </Card>
                     </Grid>

                     {/* Sağ taraf */}
                     <Grid item size={9} sx={{ height: "100%" }}>
                            <Box
                                   sx={{
                                          height: 60,
                                          px: 1,
                                          display: "flex",
                                          alignItems: "center",
                                          bgcolor: "#fff",
                                          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                                   }}
                            >
                                   <Stack direction="row" spacing={0.5}  sx={{ width: "100%" }}>
                                          <Button
                                                 startIcon={<AddIcon />}
                                                 sx={{
                                                        flex: 1,
                                                        bgcolor: "#4caf50",
                                                        color: "#fff",
                                                        fontWeight: 400,
                                                        textTransform: "none",
                                                        borderRadius: 1,
                                                        padding:0.5,
                                                        "&:hover": {
                                                               bgcolor: "#43a047",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        // boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                                 }}
                                          >
                                                 Yeni Haber
                                          </Button>

                                          <Button
                                                 startIcon={<FolderOpenIcon />}
                                                 sx={{
                                                        flex: 1,
                                                        bgcolor: "#ffb300",
                                                        color: "#fff",
                                                        fontWeight: 400,
                                                        textTransform: "none",
                                                        borderRadius: 1,
                                                        padding:0.5,
                                                        "&:hover": {
                                                               bgcolor: "#ffa000",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        // boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                                 }}
                                          >
                                                 Merkez Akış
                                          </Button>

                                          <Button
                                                 startIcon={<FlowIcon />}
                                                 sx={{
                                                        flex: 1,
                                                        bgcolor: "#e53935",
                                                        color: "#fff",
                                                        fontWeight: 400,
                                                        textTransform: "none",
                                                        borderRadius: 1,
                                                        padding:0.5,
                                                        "&:hover": {
                                                               bgcolor: "#d32f2f",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        // boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                                 }}
                                          >
                                                 Bülten
                                          </Button>

                                          <Button
                                                 startIcon={<FileCopyIcon />}
                                                 sx={{
                                                        flex: 1,
                                                        bgcolor: "#fb8c00",
                                                        color: "#fff",
                                                        fontWeight: 400,
                                                        textTransform: "none",
                                                        borderRadius: 1,
                                                        padding:0.5,
                                                        "&:hover": {
                                                               bgcolor: "#f57c00",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        // boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                                 }}
                                          >
                                                 Versiyon Oluştur
                                          </Button>

                                          <Button
                                                 type="submit"
                                                 form="egsForm"
                                                 startIcon={<SaveIcon />}
                                                 sx={{
                                                        flex: 1,
                                                        bgcolor: "#1976d2",
                                                        color: "#fff",
                                                        fontWeight: 400,
                                                        textTransform: "none",
                                                        borderRadius: 1,
                                                        padding:0.5,
                                                        "&:hover": {
                                                               bgcolor: "#1565c0",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        // boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                                 }}
                                          >
                                                 Kaydet
                                          </Button>
                                   </Stack>
                            </Box>
                            <Card sx={{ height: "100%", borderRadius: 0, display: "flex", flexDirection: "column" }}>
                                   <form id="egsForm" onSubmit={handleSubmit(onSubmit)}>
                                          {/* Üst Form Alanı */}
                                          <Grid container spacing={1} sx={{ p: 1 }}>

                                                 {/* Başlık */}
                                                 <Grid size={3}>
                                                        <Controller
                                                               name="title"
                                                               control={control}
                                                               render={({ field }) => (
                                                                      <TextField {...field} label="Başlık" variant="outlined" fullWidth />
                                                               )}
                                                        />
                                                 </Grid>

                                                 {/* Açıklama */}
                                                 <Grid size={3}>
                                                        <Controller
                                                               name="description"
                                                               control={control}
                                                               render={({ field }) => (
                                                                      <TextField {...field} label="Açıklama" variant="outlined" fullWidth />
                                                               )}
                                                        />
                                                 </Grid>

                                                 {/* Tarih */}
                                                 <Grid size={3}>
                                                        <Controller
                                                               name="date"
                                                               control={control}
                                                               render={({ field }) => (
                                                                      <DatePicker
                                                                             wrapperClassName={styles.datePicker}
                                                                             selected={field.value}
                                                                             onChange={(date) => field.onChange(date)}
                                                                             isClearable
                                                                             placeholderText="Tarih Seçiniz"
                                                                             dateFormat="dd/MM/yyyy"
                                                                             className={styles.datePickerInput}
                                                                             style={{ width: "100%" }}
                                                                      />
                                                               )}
                                                        />
                                                 </Grid>

                                                 {/* Bülten */}
                                                 <Grid size={3}>
                                                        <Controller
                                                               name="newsletter"
                                                               control={control}
                                                               placeholder="Bülten Seçin"
                                                               render={({ field }) => (
                                                                      <FormControl size="small" fullWidth>
                                                                             <InputLabel>Bülten</InputLabel>
                                                                             <Select
                                                                                    {...field}
                                                                                    labelId="newsletter-label"
                                                                                    id="newsletter"
                                                                                    value={field.value || ""}
                                                                                    label="Bülten"
                                                                                    sx={{
                                                                                           "& .MuiSelect-select": {
                                                                                                  display: "flex",
                                                                                                  alignItems: "center",
                                                                                                  height: "100%",
                                                                                                  paddingY: "12px",
                                                                                           },
                                                                                           height: "54px",
                                                                                    }}
                                                                             >
                                                                                    <MenuItem value="">
                                                                                           <em>Bülten Seçin</em>
                                                                                    </MenuItem>
                                                                                    <MenuItem value="1">01-Mod</MenuItem>
                                                                                    <MenuItem value="3">---</MenuItem>
                                                                             </Select>
                                                                      </FormControl>
                                                               )}
                                                        />
                                                 </Grid>
                                          </Grid>


                                          {/* Başlık Metni */}
                                          <Box sx={{ p: 1 }}>
                                                 <Controller
                                                        name="subtitleText"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <TextField
                                                                      {...field}
                                                                      label="Başlık Metni"
                                                                      variant="outlined"
                                                                      fullWidth
                                                                      multiline
                                                                      rows={6}
                                                               />
                                                        )}
                                                 />
                                          </Box>

                                          {/* Ana Metin */}
                                          <Box sx={{ flexGrow: 1, p: 1, overflow: "auto" }}>
                                                 <Controller
                                                        name="mainText"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <TextField
                                                                      {...field}
                                                                      label="Ana metninizi yazınız"
                                                                      variant="outlined"
                                                                      fullWidth
                                                                      multiline
                                                                      rows={14}
                                                               />
                                                        )}
                                                 />
                                          </Box>
                                   </form>

                                   <CardActions sx={{ borderTop: "1px solid #ddd", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}>
                                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", p: 1, bgcolor: "grey.100", borderBottom: "1px solid #ddd" }}>
                                                 <Typography sx={{ pl: "6px" }} variant="body2" fontWeight="bold">Altyazı Tablosu</Typography>
                                                 <Button variant="contained" size="small" onClick={handleOpen}>
                                                        + Satır Ekle
                                                 </Button>
                                          </Box>

                                          <Box sx={{ flexGrow: 1, overflow: "auto", width: "100%" }}>
                                                 <Table size="small">
                                                        <TableHead>
                                                               <TableRow>
                                                                      <TableCell width="25%">
                                                                             <Typography variant="body2" fontWeight="bold">
                                                                                    KJ 1. satır
                                                                             </Typography>
                                                                      </TableCell>
                                                                      <TableCell width="25%">
                                                                             <Typography variant="body2" fontWeight="bold">
                                                                                    KJ 2. satır
                                                                             </Typography>
                                                                      </TableCell>
                                                                      <TableCell width="30%"><Typography variant="body2" fontWeight="bold">
                                                                             Açıklama
                                                                      </Typography></TableCell>
                                                                      <TableCell width="20%"><Typography variant="body2" fontWeight="bold">
                                                                             Süre/Bilgi
                                                                      </Typography></TableCell>
                                                               </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                               {rows.map((row, index) => (
                                                                      <TableRow key={index}>
                                                                             <TableCell>{row.col1}</TableCell>
                                                                             <TableCell>{row.col2}</TableCell>
                                                                             <TableCell>{row.desc}</TableCell>
                                                                             <TableCell>{row.info ? row.info.format("HH:mm") : ""}</TableCell>
                                                                      </TableRow>
                                                               ))}
                                                        </TableBody>
                                                 </Table>
                                          </Box>
                                          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                                                 <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
                                                        Yeni Satır Ekle
                                                 </DialogTitle>

                                                 <DialogContent dividers sx={{ p: 3 }}>
                                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                                               <TextField
                                                                      label="KJ 1. satır"
                                                                      name="col1"
                                                                      value={formData.col1}
                                                                      onChange={handleChange}
                                                                      fullWidth
                                                               />

                                                               <TextField
                                                                      label="KJ 2. satır"
                                                                      name="col2"
                                                                      value={formData.col2}
                                                                      onChange={handleChange}
                                                                      fullWidth
                                                               />

                                                               <TextField
                                                                      label="Açıklama"
                                                                      name="desc"
                                                                      value={formData.desc}
                                                                      onChange={handleChange}
                                                                      fullWidth
                                                                      multiline
                                                                      rows={3}
                                                               />

                                                               <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <TimePicker
                                                                             label="Süre"
                                                                             value={formData.info}
                                                                             onChange={(newValue) =>
                                                                                    setFormData((prev) => ({ ...prev, info: newValue }))
                                                                             }
                                                                             slotProps={{
                                                                                    textField: { fullWidth: true },
                                                                             }}
                                                                      />
                                                               </LocalizationProvider>
                                                        </Box>
                                                 </DialogContent>

                                                 <DialogActions sx={{ px: 3, pb: 2 }}>
                                                        <Button onClick={handleClose} color="inherit">
                                                               İptal
                                                        </Button>
                                                        <Button onClick={handleAddRow} variant="contained">
                                                               Kaydet
                                                        </Button>
                                                 </DialogActions>
                                          </Dialog>

                                   </CardActions>
                            </Card>
                     </Grid>
              </Grid>

       );
}

export default Egs;
