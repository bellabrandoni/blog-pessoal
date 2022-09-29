import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box } from '@mui/material';

function Navbar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Box style={{cursor:"pointer" }}>
                        <Typography variant="h6">
                            Blog Pessoal
                        </Typography>
                    </Box>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;