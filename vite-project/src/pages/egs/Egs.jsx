import { useState } from "react";
import {
       Box,
       Grid,
       Tabs,
       Tab,
       Card,
       CardActions,
       TextField,
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
import Select from '@mui/material/Select';
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
import SectionOne from "../home/SectionOne/SectionOne";
import SectionTwo from "../home/SectionTwo/SectionTwo";

function Egs() {
       const [tabValue, setTabValue] = useState(0);
       const [rows, setRows] = useState([]);
       const [open, setOpen] = useState(false);
       const [stateCenterStream, setStateCenterStream] = useState(false)
       const { control, handleSubmit, watch, reset } = useForm({
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
       // Habere tıklandığında formu dolduracak fonksiyon
       const handleSelectNews = (news) => {
              reset({
                     title: news.title,
                     description: news.description,
                     subtitleText: news.subtitleText || "",
                     mainText: news.mainText || "",
                     date: news.publishDate ? new Date(news.publishDate) : null,
                     newsletter: news.newsletter || "",
              });
       };

       const newNews = () => {
              reset({
                     title: "",
                     description: "",
                     subtitleText: "",
                     mainText: "",
                     date: null,
                     newsletter: "",
              });
       }

       const centerStream = () => {
              setStateCenterStream(true);
       }


       return (
              <Grid container sx={{ height: "100vh", width: '100%' }}>
                     {/* Sol taraf */}
                     <Grid item size={3} sx={{ borderRight: "1px solid #ddd", height: "100%" }}>
                            <SectionOne tabValue={tabValue} setTabValue={setTabValue} newsItems={newsItems} handleSelectNews={handleSelectNews} />
                     </Grid>
                     {stateCenterStream &&
                            <Grid item size={2}>
                                   <SectionTwo newsItems={newsItems} setStateCenterStream={setStateCenterStream} />
                            </Grid>
                     }

                     {/* Sağ taraf */}
                     <Grid item size={stateCenterStream === true ? 7 : 9} sx={{ height: "100%" }}>
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
                                   <Stack direction="row" spacing={0.5} sx={{ width: "100%" }}>
                                          <Button
                                                 startIcon={<AddIcon />}
                                                 sx={{
                                                        flex: 1,
                                                        bgcolor: "#4caf50",
                                                        color: "#fff",
                                                        fontWeight: 400,
                                                        textTransform: "none",
                                                        borderRadius: 1,
                                                        padding: 0.5,
                                                        "&:hover": {
                                                               bgcolor: "#43a047",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                 }}
                                                 onClick={newNews}
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
                                                        padding: 0.5,
                                                        "&:hover": {
                                                               bgcolor: "#ffa000",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                 }}
                                                 onClick={centerStream}
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
                                                        padding: 0.5,
                                                        "&:hover": {
                                                               bgcolor: "#d32f2f",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
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
                                                        padding: 0.5,
                                                        "&:hover": {
                                                               bgcolor: "#f57c00",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
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
                                                        padding: 0.5,
                                                        "&:hover": {
                                                               bgcolor: "#1565c0",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
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
                                                                      <TextField {...field} label="Başlık" size="small" variant="outlined" fullWidth />
                                                               )}
                                                        />
                                                 </Grid>

                                                 {/* Açıklama */}
                                                 <Grid size={3}>
                                                        <Controller
                                                               name="description"
                                                               control={control}
                                                               render={({ field }) => (
                                                                      <TextField {...field} label="Açıklama" size="small" variant="outlined" fullWidth />
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
                                                                      <FormControl fullWidth size="small">
                                                                             <InputLabel id="newsletter-label">Bülten</InputLabel>
                                                                             <Select
                                                                                    {...field}
                                                                                    labelId="newsletter-label"
                                                                                    id="newsletter"
                                                                                    value={field.value || ""}
                                                                                    label="Bülten Seçin"
                                                                                    sx={{
                                                                                           "& .MuiSelect-select": {
                                                                                                  display: "flex",
                                                                                                  alignItems: "center",
                                                                                           },
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

export const newsItems = [
       {
              pk_NewsId: 0,
              title: "Kayserispor 3. beraberliğini aldı",
              description: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              subtitleText: "Kayserispor 3. beraberliğini aldı",
              mainText: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              city: "Kayseri",
              publishDate: "2025-09-15T11:34:34"
       },
       {
              pk_NewsId: 1,
              title: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              description: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              subtitleText: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              mainText: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              city: "Antalya",
              publishDate: "2025-09-15T11:33:23"
       },
       {
              pk_NewsId: 2,
              title: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              description: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              subtitleText: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              mainText: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              city: "Denizli",
              publishDate: "2025-09-15T11:33:07"
       }
];
