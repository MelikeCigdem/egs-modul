import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
       Box,
       Typography,
       Paper,
       TableContainer,
       IconButton,
       Tooltip,
       Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from '@mui/icons-material/Save';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DropZone from '../../../components/DndKit/DndKit';
import { useDndKit } from '../../../context/DndProvider';


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

export default function SectionTwo({ newsItems, setStateCenterStream, bulletinID }) {
       const { setDropped } = useDndKit();
       const [droppedFiles, setDroppedFiles] = useState([]);
       const [bulteinData, setBulteinData] = useState([]);

       const handleSave = async () => {
              console.log("Kaydedilecek veriler:", droppedFiles);
       };

       useEffect(() => {
              setBulteinData(newsItems.find(item => item.pk_NewsId === bulletinID))
       }, [bulletinID])

       useEffect(() => {
              if (bulteinData) {
                     setDropped({
                            detay: [bulteinData],
                     });
              } else {
                     setDropped({ detay: [] });
              }
       }, [bulteinData, setDropped]);

       return (
              <Box
                     elevation={3}
                     sx={{
                            borderRadius: 4,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            mt: 2,
                     }}
              >
                     {/* Header */}
                     <Box
                            sx={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "space-between",
                                   background: "linear-gradient(135deg, #2a2a72, #009ffd)",
                                   color: "#fff",
                                   px: 2,
                                   py: 2,
                                   borderRadius: "16px 16px 0 0",
                                   boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                   mb: 2,
                            }}
                     >
                            <Box display="flex" alignItems="center" gap={1}>
                                   <FolderOpenIcon fontSize="small" />
                                   <Typography variant="subtitle1" fontWeight="bold">
                                          Merkez Akışı
                                   </Typography>
                            </Box>
                            <Box>
                                   <Tooltip title="Kaydet">
                                          <span>
                                                 <IconButton
                                                        onClick={handleSave}
                                                        disabled={!droppedFiles || droppedFiles.length === 0}
                                                        sx={{
                                                               color: "primary.contrastText",
                                                               "&.Mui-disabled": { color: "rgba(255,255,255,0.4)" },
                                                        }}
                                                        size="small"
                                                 >
                                                        <SaveIcon fontSize="small" />
                                                 </IconButton>
                                          </span>
                                   </Tooltip>
                                   <Tooltip title="Kapat">
                                          <IconButton
                                                 onClick={() => setStateCenterStream(false)}
                                                 sx={{ color: "primary.contrastText" }}
                                                 size="small"
                                          >
                                                 <CloseIcon fontSize="small" />
                                          </IconButton>
                                   </Tooltip>
                            </Box>
                     </Box>

                     {/* İçerik */}
                     <TableContainer
                            component={Box}
                            sx={{
                                   flexGrow: 1,
                                   bgcolor: "#fff",
                                   borderRadius: "0 0 16px 16px",
                                   pt: 2,
                            }}
                     >
                            <DropZone
                                   id="detay"
                                   title="Detay fotoğrafını sürükle bırak"
                                   onChange={(items) => setDroppedFiles(items)}
                            />
                     </TableContainer>
              </Box>

       );
}
