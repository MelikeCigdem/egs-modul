import { useRef, useState } from "react";
import {
       Box,
       Grid,
       Card,
       CardActions,
       TextField,
       MenuItem,
       Button,
       Typography,
       Stack,
       FormControl,
       InputLabel,
       Divider,
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
import SectionOne from "../home/SectionOne/SectionOne";
import SectionTwo from "../home/SectionTwo/SectionTwo";
import Subtitle from "../../components/Subtitle";

function Egs() {
       const [tabValue, setTabValue] = useState(0);
       const [stateCenterStream, setStateCenterStream] = useState(false)
       // seçilen bülten id si 
       const [bulletinID, setbulletinID] = useState(null);
       // const [selectedDate, setSelectedDate] = useState(null);

       // altyazı tablosu referansı
       const subtitleRef = useRef();

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
       // Filtrelenmiş data
       // const filteredNews = newsItems.filter((item) => {
       //        if (!selectedDate) return true; // tarih seçilmemişse
       //        const itemDate = dayjs(item.publishDate);
       //        return itemDate.isSame(selectedDate, "day");
       // });


       return (
              <Grid container sx={{ width: '100%', }}>
                     {/* Sol taraf */}
                     <Grid item size={3} sx={{ borderRight: "1px solid #ddd" }}>
                            <SectionOne tabValue={tabValue} setTabValue={setTabValue} newsItems={newsItems} handleSelectNews={handleSelectNews} setStateCenterStream={setStateCenterStream} setbulletinID={setbulletinID} />
                     </Grid>
                     {stateCenterStream &&
                            <Grid item size={2} sx={{ borderRadius: "unset" }}>
                                   <SectionTwo newsItems={newsItems} setStateCenterStream={setStateCenterStream} bulletinID={bulletinID} />
                            </Grid>
                     }

                     {/* Sağ taraf */}
                     <Grid className="deneme" item size={stateCenterStream === true ? 7 : 9}>
                            <Box
                                   sx={{
                                          p: 2,
                                          display: "flex",
                                          alignItems: "center",
                                          bgcolor: "#f5f7fe",
                                          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                                   }}
                            >
                                   <Stack direction="row" spacing={2} sx={{ width: "100%", }}>
                                          <Button
                                                 className={styles.centerStreamBtn}
                                                 startIcon={
                                                        <Box className={styles.iconWrapper}>
                                                               <FolderOpenIcon />
                                                        </Box>
                                                 }
                                                 onClick={centerStream}
                                          >
                                                 Merkez Akış
                                          </Button>
                                          <Button
                                                 className={styles.centerStreamBtn}
                                                 startIcon={
                                                        <Box className={styles.iconWrapper}>
                                                               <AddIcon />
                                                        </Box>
                                                 }
                                                 onClick={newNews}
                                          >
                                                 Yeni Haber
                                          </Button>
                                          <Button
                                                 className={styles.centerStreamBtn}
                                                 startIcon={
                                                        <Box className={styles.iconWrapper}>
                                                               <FileCopyIcon />
                                                        </Box>
                                                 }
                                          >
                                                 Versiyon Oluştur
                                          </Button>
                                          <Button
                                                 className={styles.centerStreamBtn}
                                                 startIcon={
                                                        <Box className={styles.iconWrapper}>
                                                               <SaveIcon />
                                                        </Box>
                                                 }
                                                 type="submit"
                                                 form="egsForm"
                                          >
                                                 Kaydet
                                          </Button>
                                   </Stack>
                            </Box>
                            <Card sx={{ height: "100%", borderRadius: 0, display: "contents", flexDirection: "column" }}>
                                   <Box sx={{
                                          bgcolor: "#f5f7fe",
                                          pr: 2, pl: 2,
                                   }}>
                                          <Box sx={{
                                                 p: 2,
                                                 bgcolor: "#fff",
                                                 borderRadius: 4,
                                          }}>
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
                                                                                    rows={9}
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
                                                                                    rows={16}
                                                                             />
                                                                      )}
                                                               />
                                                        </Box>
                                                 </form>

                                          </Box>

                                   </Box>

                                   <Box sx={{
                                          bgcolor: "#f5f7fe",
                                          pr: 2, pl: 2,

                                   }}>
                                          <Box sx={{
                                                 p: 2,
                                                 bgcolor: "#fff",
                                                 borderRadius: 4,
                                                 borderTop: "6px solid #f5f7fe"
                                          }}>
                                                 <CardActions sx={{
                                                        flexDirection: "column",
                                                        p: 0
                                                 }}>
                                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", p: 1, bgcolor: "grey.100", borderBottom: "1px solid #ddd" }}>
                                                               <Typography sx={{ pl: "6px" }} variant="body2" fontWeight="bold">Altyazı Tablosu</Typography>
                                                               <Button variant="contained" size="small" sx={{
                                                                      textTransform: "none",
                                                                      borderRadius: 2,
                                                                      px: 3,
                                                                      fontWeight: 600,
                                                                      bgcolor: "#009ffd",
                                                                      backgroundImage: "linear-gradient(135deg, #009ffd, #2a2a72)",
                                                                      "&:hover": { opacity: 0.9 },
                                                               }} onClick={() => subtitleRef.current?.handleOpenAdd()}>
                                                                      + Satır Ekle
                                                               </Button>
                                                        </Box>

                                                        {/* altyazı tablosu */}
                                                        <Subtitle ref={subtitleRef} />
                                                 </CardActions>
                                          </Box>

                                   </Box>

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
       },
       {
              pk_NewsId: 3,
              title: "Kayserispor 3. beraberliğini aldı",
              description: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              subtitleText: "Kayserispor 3. beraberliğini aldı",
              mainText: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              city: "Kayseri",
              publishDate: "2025-09-15T11:34:34"
       },
       {
              pk_NewsId: 4,
              title: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              description: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              subtitleText: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              mainText: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              city: "Antalya",
              publishDate: "2025-09-15T11:33:23"
       },
       {
              pk_NewsId: 5,
              title: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              description: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              subtitleText: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              mainText: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              city: "Denizli",
              publishDate: "2025-09-15T11:33:07"
       },
       {
              pk_NewsId: 6,
              title: "Kayserispor 3. beraberliğini aldı",
              description: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              subtitleText: "Kayserispor 3. beraberliğini aldı",
              mainText: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              city: "Kayseri",
              publishDate: "2025-09-15T11:34:34"
       },
       {
              pk_NewsId: 7,
              title: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              description: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              subtitleText: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              mainText: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              city: "Antalya",
              publishDate: "2025-09-15T11:33:23"
       },
       {
              pk_NewsId: 8,
              title: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              description: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              subtitleText: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              mainText: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              city: "Denizli",
              publishDate: "2025-09-15T11:33:07"
       },
       {
              pk_NewsId: 9,
              title: "Kayserispor 3. beraberliğini aldı",
              description: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              subtitleText: "Kayserispor 3. beraberliğini aldı",
              mainText: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              city: "Kayseri",
              publishDate: "2025-09-15T11:34:34"
       },
       {
              pk_NewsId: 10,
              title: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              description: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              subtitleText: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              mainText: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              city: "Antalya",
              publishDate: "2025-09-15T11:33:23"
       },
       {
              pk_NewsId: 11,
              title: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              description: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              subtitleText: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              mainText: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              city: "Denizli",
              publishDate: "2025-09-15T11:33:07"
       },
       {
              pk_NewsId: 12,
              title: "Kayserispor 3. beraberliğini aldı",
              description: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              subtitleText: "Kayserispor 3. beraberliğini aldı",
              mainText: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              city: "Kayseri",
              publishDate: "2025-09-15T11:34:34"
       },
       {
              pk_NewsId: 13,
              title: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              description: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              subtitleText: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              mainText: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              city: "Antalya",
              publishDate: "2025-09-15T11:33:23"
       },
       {
              pk_NewsId: 14,
              title: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              description: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              subtitleText: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              mainText: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              city: "Denizli",
              publishDate: "2025-09-15T11:33:07"
       },
       {
              pk_NewsId: 15,
              title: "Kayserispor 3. beraberliğini aldı",
              description: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              subtitleText: "Kayserispor 3. beraberliğini aldı",
              mainText: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              city: "Kayseri",
              publishDate: "2025-09-15T11:34:34"
       },
       {
              pk_NewsId: 16,
              title: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              description: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              subtitleText: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              mainText: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              city: "Antalya",
              publishDate: "2025-09-15T11:33:23"
       },
       {
              pk_NewsId: 17,
              title: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              description: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              subtitleText: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              mainText: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              city: "Denizli",
              publishDate: "2025-09-15T11:33:07"
       },
       {
              pk_NewsId: 18,
              title: "Kayserispor 3. beraberliğini aldı",
              description: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              subtitleText: "Kayserispor 3. beraberliğini aldı",
              mainText: "Kayserispor, Süper Lig'in 5. haftasında evinde Göztepe ile 1-1 berabere kalarak üçüncü beraberliğini aldı.",
              city: "Kayseri",
              publishDate: "2025-09-15T11:34:34"
       },
       {
              pk_NewsId: 19,
              title: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              description: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              subtitleText: "Alanya'da ASAT'ın yatırımları 6 yılda 2,7 milyar TL'yi aştı",
              mainText: "Antalya Büyükşehir Belediyesi ASAT Genel Müdürlüğü'nün, 2019-2025 yılları arasında Alanya'da içme suyu, kanalizasyon ve arıtma tesislerinden hizmet altyapısına kadar geniş bir yelpazeyi kapsayan projelerin toplam bedeli 2 milyar 784 milyon TL'yi geçti.",
              city: "Antalya",
              publishDate: "2025-09-15T11:33:23"
       },
       {
              pk_NewsId: 20,
              title: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              description: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              subtitleText: "Göçükten sağ olarak kurtarılıp alkışlarla karşılanan madenci, hayatını kaybetti",
              mainText: "Denizli'nin Acıpayam ilçesinde, cuma günü bir krom madeninde meydana gelen göçükten 25 saat sonra sağ olarak çıkartılan işçi, tedavi gördüğü hastanede hayatını kaybetti.",
              city: "Denizli",
              publishDate: "2025-09-15T11:33:07"
       }
];