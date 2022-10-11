import React from "react";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Typography, Grid } from '@material-ui/core'
import { Box } from "@mui/material";
import './Footer.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';


function Footer() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    var footerComponent;
    //Se o token for diferente de vazio, significa que há um token e então ele terá que redenrizar o footer, porém, se for vazio o footer não será renderizado

    if (token !== "") {
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid alignItems="center" item xs={12}>
                <Box className='box1'>
                    <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h5" align="center" gutterBottom className='textos'>Siga-nos nas redes sociais </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <a href="https://www.linkedin.com/in/isabella-brandao" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon className='redes' />
                        </a>
                        <a href="https://github.com/bellabrandoni" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon className='redes' />
                        </a>
                    </Box>

                </Box>
                <Box className='box2'>
                    <Box paddingTop={1}>
                        <Typography variant="subtitle2" align="center" gutterBottom className='textos' >Feito por Isabella Brandao © 2020 Copyright:</Typography>
                    </Box>
                    <Box>
                        <a target="_blank" href="https://brasil.generation.org" rel="noopener noreferrer">
                            <Typography variant="subtitle2" gutterBottom className='textos'>brasil.generation.org</Typography>
                        </a>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    }
    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;
