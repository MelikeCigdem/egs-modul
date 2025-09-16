import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
       Box,
       Typography,
       Paper,
       TableContainer,
       IconButton,
       Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

       return (
              <Box sx={{ position: "relative" }}>
                     {/* Kapat Butonu */}
                     <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ color: "text.primary", p: 1, borderBottom: "1px solid #ddd" }}
                     >
                            {/* Sol kısım */}
                            <Grid item>
                                   <Typography variant="subtitle1" fontWeight="bold">
                                          Merkez Akışı
                                   </Typography>
                            </Grid>

                            {/* Sağ kısım */}
                            <Grid item>
                                   <IconButton
                                          onClick={() => setStateCenterStream(false)}
                                          size="small"
                                          sx={{
                                                 color: "error.main"
                                          }}
                                   >
                                          <CloseIcon fontSize="small" />
                                   </IconButton>
                            </Grid>
                     </Grid>


                     <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
                            <DropZone id="detay"
                                   newsItems={newsItems}
                                   title={"Detay fotoğrafını sürükle bırak"}
                                   fieldName="image2Source"
                            />

                     </TableContainer>
              </Box>
       );
}

