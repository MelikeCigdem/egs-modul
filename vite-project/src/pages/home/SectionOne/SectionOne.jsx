import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
       Box,
       Tabs,
       Tab,
       Tooltip,
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
       TableRow,
       TableCell,
       Paper,
       TableContainer,
} from "@mui/material";
import DraggableItem from '../../../components/DndKit/DraggableItem';


function CustomTabPanel({ children, value, index }) {
       return (
              <div
                     role="tabpanel"
                     hidden={value !== index}
                     id={`simple-tabpanel-${index}`}
                     aria-labelledby={`simple-tab-${index}`}
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
       { icon: <PersonIcon fontSize="small" />, title: 'Haberlerim', },
       { icon: <PodcastsIcon fontSize="small" />, title: 'Havuz' },
       { icon: <AccessAlarmSharpIcon fontSize="small" />, title: 'Bülten' },
       { icon: <ExitToAppIcon fontSize="small" />, title: 'Ajans' },
];



export default function SectionOne({ tabValue, setTabValue, newsItems, handleSelectNews }) {

       const handleChange = (event, newValue) => {
              setTabValue(newValue)
       }

       const renderTabs = () => (
              <Tabs
                     value={tabValue}
                     onChange={handleChange}
                     aria-label="tabs"
                     sx={{
                            border: "1px solid #dae1e9",
                            background: "#fff",
                            borderRadius: "4px",
                            minHeight: 40,
                            height: 40,
                     }}
              >
                     {tabIcons.map((tab, index) => (
                            <Tab
                                   key={index}
                                   sx={{
                                          px: 2,
                                          minHeight: 40,
                                          height: 40,
                                          borderRight: index !== tabIcons.length - 1 ? "1px solid #dae1e9" : "none",
                                          textTransform: "none",
                                   }}
                                   icon={
                                          <Tooltip title={tab.title} arrow>
                                                 <Box display="flex" alignItems="center" gap={1}>
                                                        {tab.icon}
                                                        <Typography fontSize={14}>{tab.title}</Typography>
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

       return (
              <Box>
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, gap: 2 }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>{renderTabs()}</Box>
                     </Box>
                     <CustomTabPanel value={tabValue} index={0}>
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
                     <CustomTabPanel value={tabValue} index={1}>
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
                     <CustomTabPanel value={tabValue} index={2}>
                            {/* <MyNews setTabValue={setTabValue} /> */}
                            <div>Bülten</div>
                     </CustomTabPanel>
                     <CustomTabPanel value={tabValue} index={3}>
                            {/* <SortingNews /> */}
                            <div>Ajans</div>
                     </CustomTabPanel>

              </Box>
       );
}

