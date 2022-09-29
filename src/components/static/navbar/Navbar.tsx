import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Box } from "@mui/material";

function Navbar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Box style={{ cursor: "pointer" }}>
                        <Box mx={1}>
                            <Typography variant="h6">Blog Pessoal</Typography>
                        </Box>
                    </Box>
                    <Box
                        style={{ cursor: "pointer" }}
                        display="flex"
                        justifyContent="start"
                    >
                        <Box mx={1}>
                            <Typography variant="h6">Home</Typography>
                        </Box>
                    </Box>
                    <Box style={{ cursor: "pointer" }}>
                        <Box mx={1}>
                            <Typography variant="h6">Postagens</Typography>
                        </Box>
                    </Box>
                    <Box style={{ cursor: "pointer" }}>
                        <Box mx={1}>
                            <Typography variant="h6">Temas</Typography>
                        </Box>
                    </Box>
                    <Box style={{ cursor: "pointer" }}>
                        <Box mx={1}>
                            <Typography variant="h6">Cadastrar Temas</Typography>
                        </Box>
                    </Box>
                    <Box mx={12}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Button color="inherit">Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
