
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from "../../assets/turkmedya_logo.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import styles from './Navbar.module.scss';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [auth, setAuth] = useState(true);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const currentColor = '#3c3c3c';

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = (brand, trBrand) => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                onClick={handleMenuClose}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
                <AccountCircle fontSize="small" />
                <Typography variant="body1">Profil</Typography>
            </MenuItem>

            <MenuItem
                onClick={handleMenuClose}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
                <ExitToAppIcon fontSize="small" />
                <Typography variant="body1">Çıkış</Typography>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit"  >
                    <AccountCircle />
                </IconButton>
                <p>Melike Çiğdem</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <ExitToAppIcon />
                </IconButton>
                <p>Çıkış</p>
            </MenuItem>

        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: currentColor }}>
                <Toolbar>
                    <img
                        style={{ width: '180px' }}
                        srcSet={`${Logo}`}
                        src={`${Logo}`}
                        alt="Turkmedya"
                        loading="lazy"
                    />

                    <Box className={styles.navRouter} sx={{ display: { xs: 'none', md: 'flex', ml: "30px" } }}>
                        <Button
                            startIcon={<ManageHistoryIcon />}
                            component={Link}
                            to="/egs"
                            className={styles.linkBtn}
                        >
                            EGS
                        </Button>

                        <Button
                            startIcon={<ManageHistoryIcon />}
                            component={Link}
                            to="/cinegy"
                            className={styles.linkBtn}
                        >
                            CINEGY
                        </Button>

                        <Button
                            startIcon={<ManageHistoryIcon />}
                            component={Link}
                            to="/archive"
                            className={styles.linkBtn}
                        >
                            ARCHIVE
                        </Button>
                    </Box>


                    <Box sx={{ flexGrow: 1 }} />
                    {/* masaüstü nav */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                    <Typography component="p" sx={{ ml: 1 }}>
                                        Melike ÇİĞDEM
                                    </Typography>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >

                                </Menu>
                            </div>
                        )}
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
