import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box } from "@mui/material";
import { Modal } from "@mui/material";
import { Button } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import './ModalPostagem.css';
import CadastroPost from '../cadastroPost/CadastroPost';

//centralização do modal, traz pro centro da tela
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

//metodo que tem como parametro um tema(importado do material-ui) que define as configurações de posição, largura ...postagem
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

//Guarda alterações que devem centralizar o modal
function ModalPostagem() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);//importação do usestate

    const [open, setOpen] = React.useState(false);

 //altera a função handleOpen pra true, se verdadeiro o modal abre
    const handleOpen = () => {
        setOpen(true);
    };
    //Quando clicamos num ícone para que ele seja fechado essa função é acionada e altera a função stateOpen para false, efetivando o fechamento do modal
    const handleClose = () => {
        setOpen(false);
    };

    //Importação de toda tela de CadastroPost dentro de <CadastroPost />
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Box display="flex" justifyContent="flex-end" className="cursor">
                <CloseIcon onClick={handleClose} />

            </Box>
            
            <CadastroPost />

        </div>
    );

    return (
        <div>
            <Button
                variant="outlined"
                className="btnModal"
                onClick={handleOpen}>Nova Postagem</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                
                {body}
            </Modal>
        </div>
    );
}
export default ModalPostagem