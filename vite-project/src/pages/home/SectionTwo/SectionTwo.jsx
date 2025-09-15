import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
       Box,
       Typography,
       Table,
       TableBody,
       TableRow,
       TableCell,
       Paper,
       TableContainer,
       IconButton,
       Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


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
                            <Table size="small">
                                   <TableBody>
                                          {newsItems.map((item) => (
                                                 <TableRow key={item.pk_NewsId} sx={{ cursor: "pointer" }}>
                                                        <TableCell>
                                                               <Typography fontSize={14} fontWeight="bold">{item.title}</Typography>
                                                               <Typography variant="caption" color="text.secondary">
                                                                      {new Date(item.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.city}
                                                               </Typography>
                                                        </TableCell>
                                                 </TableRow>
                                          ))}
                                   </TableBody>
                            </Table>
                     </TableContainer>
              </Box>
       );
}

