import { useState } from 'react';
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
import DropZone from '../../../components/DndKit/DndKit';


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

export default function SectionTwo({ newsItems, setStateCenterStream }) {
       const [droppedFiles, setDroppedFiles] = useState([]);

       const handleSave = async () => {
              console.log("Kaydedilecek veriler:", droppedFiles);
       };

       return (
              <Paper
                     elevation={3}
                     sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            mt:1,
                     }}
              >
                     {/* Header */}
                     <Box
                            sx={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "space-between",
                                   bgcolor: "#868686",
                                   color: "primary.contrastText",
                                   px: 2,
                                   py: 1,
                            }}
                     >
                            <Typography variant="subtitle1" fontWeight="bold">
                                   Merkez Akışı
                            </Typography>
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
                     <Divider />

                     <TableContainer
                            component={Box}
                            sx={{
                                   flexGrow: 1,
                                   bgcolor: "#fafafa",
                            }}
                     >
                            <DropZone
                                   id="detay"
                                   newsItems={newsItems}
                                   title="Detay fotoğrafını sürükle bırak"
                                   fieldName="image2Source"
                                   onChange={(items) => setDroppedFiles(items)}
                            />
                     </TableContainer>
              </Paper>
       );
}

