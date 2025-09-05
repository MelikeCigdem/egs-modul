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
       const addKjRow = () => {
              console.log("Satır eklendi");
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
                                          px: 2,
                                          display: "flex",
                                          alignItems: "center",
                                          bgcolor: "#fff",
                                          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                                   }}
                            >
                                   <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                                          <Button
                                                 startIcon={<AddIcon />}
                                                 sx={{
                                                        pb: 'unset',
                                                        flex: 1,
                                                        bgcolor: "#4caf50",
                                                        color: "#fff",
                                                        fontWeight: 600,
                                                        textTransform: "none",
                                                        "&:hover": {
                                                               bgcolor: "#43a047",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
                                                        fontWeight: 600,
                                                        textTransform: "none",
                                                        "&:hover": {
                                                               bgcolor: "#ffa000",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
                                                        fontWeight: 600,
                                                        textTransform: "none",
                                                        "&:hover": {
                                                               bgcolor: "#d32f2f",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
                                                        fontWeight: 600,
                                                        textTransform: "none",
                                                        "&:hover": {
                                                               bgcolor: "#f57c00",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
                                                        fontWeight: 600,
                                                        textTransform: "none",
                                                        "&:hover": {
                                                               bgcolor: "#1565c0",
                                                               boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                                                        },
                                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
                                                 <Grid item size={3}>
                                                        <Controller
                                                               name="title"
                                                               control={control}
                                                               render={({ field }) => (
                                                                      <TextField {...field} label="Başlık" variant="outlined" fullWidth />
                                                               )}
                                                        />
                                                 </Grid>

                                                 {/* Açıklama */}
                                                 <Grid item size={3}>
                                                        <Controller
                                                               name="description"
                                                               control={control}
                                                               render={({ field }) => (
                                                                      <TextField {...field} label="Açıklama" variant="outlined" fullWidth />
                                                               )}
                                                        />
                                                 </Grid>

                                                 {/* Tarih */}
                                                 <Grid item size={3}>
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
                                                 <Grid item size={3}>
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
                                                                      rows={3}
                                                               />
                                                        )}
                                                 />
                                          </Box>

                                          {/* Ana Metin */}
                                          <CardContent sx={{ flexGrow: 1, p: 1, overflow: "auto" }}>
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
                                                                      rows={3}
                                                               />
                                                        )}
                                                 />
                                          </CardContent>
                                   </form>

                                   <CardActions sx={{ borderTop: "1px solid #ddd", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}>
                                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", p: 1, bgcolor: "grey.100", borderBottom: "1px solid #ddd" }}>
                                                 <Typography variant="subtitle2">Altyazı Tablosu</Typography>
                                                 <Button variant="contained" size="small" onClick={addKjRow}>
                                                        + Satır Ekle
                                                 </Button>
                                          </Box>

                                          <Box sx={{ flexGrow: 1, overflow: "auto", width: "100%" }}>
                                                 <Table size="small">
                                                        <TableHead>
                                                               <TableRow>
                                                                      <TableCell width="25%">1. Satır</TableCell>
                                                                      <TableCell width="25%">2. Satır</TableCell>
                                                                      <TableCell width="30%">Açıklama</TableCell>
                                                                      <TableCell width="20%">Süre/Bilgi</TableCell>
                                                               </TableRow>
                                                        </TableHead>
                                                        <TableBody>{/* Dinamik satırlar buraya map ile gelecek */}</TableBody>
                                                 </Table>
                                          </Box>
                                   </CardActions>
                            </Card>
                     </Grid>
              </Grid>

       );
}

export default Egs;
