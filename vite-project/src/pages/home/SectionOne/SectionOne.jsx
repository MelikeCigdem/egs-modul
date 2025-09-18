import { useState } from 'react';
import PropTypes from 'prop-types';
import {
       Box,
       Tabs,
       Tab,
       Tooltip,
       Card,
       CardContent,
} from '@mui/material';
import {
       ExitToApp as ExitToAppIcon,
       Podcasts as PodcastsIcon,
       Person as PersonIcon,
       AccessAlarmSharp as AccessAlarmSharpIcon,
} from '@mui/icons-material';
import {
       Typography,
       Table,
       TableBody,
       TableCell,
       Paper,
       TableContainer,
} from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DraggableItem from '../../../components/DndKit/DraggableItem';
import styles from '../../egs/Egs.module.scss';

function CustomTabPanel({ children, value, index, className }) {
       return (
              <div
                     role="tabpanel"
                     hidden={value !== index}
                     id={`simple-tabpanel-${index}`}
                     aria-labelledby={`simple-tab-${index}`}
                     className={className}
              >
                     {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
              </div>
       );
}

CustomTabPanel.propTypes = {
       children: PropTypes.node,
       index: PropTypes.number.isRequired,
       value: PropTypes.number.isRequired,
};

const tabIcons = [
  { icon: <PersonIcon sx={{ color: "#fff" }} fontSize="small" />, title: 'Haberlerim' },
  { icon: <PodcastsIcon sx={{ color: "#fff" }} fontSize="small" />, title: 'Havuz' },
  { icon: <AccessAlarmSharpIcon sx={{ color: "#fff" }} fontSize="small" />, title: 'Bülten' },
  { icon: <ExitToAppIcon sx={{ color: "#fff" }} fontSize="small" />, title: 'Ajans' },
];


export default function SectionOne({ tabValue, setTabValue, newsItems, handleSelectNews, setStateCenterStream, setbulletinID }) {
       const [selectedIndex, setSelectedIndex] = useState(0);
       const [startDate, setStartDate] = useState(null);
       const [endDate, setEndDate] = useState(null);

       const handleChange = (event, newValue) => {
              setTabValue(newValue)
       }

       const renderTabs = () => (
              <Tabs
                     value={tabValue}
                     onChange={handleChange}
                     aria-label="tabs"
                     className={styles.customTabs}
                      sx={{
    '& .MuiTabs-indicator': {
      backgroundColor: '#fff', // seçili tab alt çizgisi beyaz
      height: 3,               // kalınlık
      borderRadius: 3,         // köşeler
    },
  }}
              >
                     {tabIcons.map((tab, index) => (
                            <Tab
                                   key={index}
                                   icon={
                                          <Tooltip title={tab.title} arrow>
                                                 <Box display="flex" alignItems="center" gap={1}>
                                                        {tab.icon}
                                                        <Typography fontSize={14} sx={{ color: "#fff" }}>{tab.title}</Typography>
                                                 </Box>
                                          </Tooltip>
                                   }
                                   iconPosition="start"
                                   {...{
                                          id: `simple-tab-${index}`,
                                          "aria-controls": `simple-tabpanel-${index}`,
                                   }}
                            />
                     ))}
              </Tabs>
       );

       const handleListItemClick = (event, index, item) => {
              console.log("index", index);
              // aktif olan bülten satırını belirtmek için
              setSelectedIndex(index);
              // Merkez akış kolonunu açmak için 
              setStateCenterStream(true)
              // Bülten id sini alıyorum burada sonra bunu merkez akışına ileteceğim.
              setbulletinID(index);
       };

       return (
              <Box>
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, pr: 2, pl: 2, pb: "unset", gap: 2 }}>
                            <Box sx={{ borderColor: 'divider', width: "100%" }}>{renderTabs()}</Box>
                     </Box>
                     {/* Haberlerim */}
                     <CustomTabPanel className={styles.customPanel} value={tabValue} index={0}>
                            <TableContainer component={Paper} className="deneme" sx={{
                                   overflowY: "auto",
                                   height: "calc(100vh - 150px)",
                            }}>
                                   <Table size="small">
                                          <TableBody>
                                                 {newsItems.map((item) => (
                                                        <DraggableItem key={item.pk_NewsId} item={item} onClick={() => handleSelectNews(item)}>
                                                               <TableCell>
                                                                      <Typography fontSize={14} fontWeight="bold">{item.title}</Typography>
                                                                      <Typography variant="caption" color="text.secondary">
                                                                             {new Date(item.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.city}
                                                                      </Typography>
                                                               </TableCell>

                                                               {/* Drag handle sadece buraya */}
                                                               <TableCell align="right" width={50}>
                                                                      <Typography component="span" className={styles.dragHandle}>
                                                                             ☰
                                                                      </Typography>
                                                               </TableCell>

                                                        </DraggableItem>
                                                 ))}
                                          </TableBody>

                                   </Table>
                            </TableContainer>
                     </CustomTabPanel>
                     {/* Havuz */}
                     <CustomTabPanel className={styles.customPanel} value={tabValue} index={1}>
                            <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
                                   <Table size="small">
                                          <TableBody>
                                                 {newsItems.map((item) => (
                                                        <DraggableItem key={item.pk_NewsId} item={item} onClick={() => handleSelectNews(item)}>
                                                               <TableCell>
                                                                      <Typography fontSize={14} fontWeight="bold">{item.title}</Typography>
                                                                      <Typography variant="caption" color="text.secondary">
                                                                             {new Date(item.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.city}
                                                                      </Typography>
                                                               </TableCell>

                                                               {/* Drag handle sadece buraya */}
                                                               <TableCell align="right" width={50}>
                                                                      <span className="drag-handle" style={{ cursor: "grab" }}>☰</span>
                                                               </TableCell>
                                                        </DraggableItem>
                                                 ))}
                                          </TableBody>
                                   </Table>
                            </TableContainer>
                     </CustomTabPanel>
                     {/* Bülten */}
                     <CustomTabPanel className={styles.customPanel} value={tabValue} index={2}>
                            <Card sx={{ width: '100%', borderRadius: 0, boxShadow: 2, p: 0 }}>
                                   <CardContent sx={{ p: 0 }}>
                                          <List sx={{ p: 0 }}>
                                                 {[{ time: "07:00" }, { time: "08:00" }, { time: "09:00" }].map((item, index) => (
                                                        <ListItemButton
                                                               key={index}
                                                               selected={selectedIndex === index}
                                                               onClick={(event) => handleListItemClick(event, index, item)}
                                                               sx={{
                                                                      borderRadius: "unset",
                                                                      borderBottom: index !== 2 ? "1px solid #eee" : "none",
                                                                      "&.Mui-selected": {
                                                                             bgcolor: "#424242a3",
                                                                             color: "primary.contrastText",
                                                                             "& .MuiSvgIcon-root": {
                                                                                    color: "primary.contrastText"
                                                                             }
                                                                      },
                                                                      "&.Mui-selected:hover": {
                                                                             bgcolor: "#424242a3"
                                                                      },
                                                                      "&:hover": {
                                                                             bgcolor: "inherit"
                                                                      }
                                                               }}
                                                        >
                                                               <AccessAlarmSharpIcon sx={{ mr: 1 }} fontSize="small" color="warning" />
                                                               <ListItemText
                                                                      primary={item.time}
                                                                      primaryTypographyProps={{ fontWeight: "bold", fontSize: "14px" }}
                                                               />
                                                        </ListItemButton>
                                                 ))}
                                          </List>
                                   </CardContent>
                            </Card>
                     </CustomTabPanel>

                     {/* Ajans */}
                     <CustomTabPanel className={styles.customPanel} value={tabValue} index={3}>
                            <div>Ajans</div>
                     </CustomTabPanel>
              </Box>
       );
}

