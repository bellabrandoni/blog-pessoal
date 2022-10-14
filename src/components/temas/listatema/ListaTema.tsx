import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from "@mui/material";
import './ListaTema.css';
import Tema from '../../../model/Tema';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { toast } from 'react-toastify';

//Requisição dos temas, a const temas tem a função setTemas para atualizar com useState. O useState do tipo <Tema> inicializa com a model de tema num colchete vazio e o array também é inicializado vazio
//Token é necessario no envio do Tema - pra isso precisamos capturar o Token que está armazenado no localStorage. o UseLocalStorage é inicializado com o valor 'token'
// let navigate e useNavigate = faz o redirecionamento de páginas. Se o token não estiver altentificado/ salvo deve acontecer um redirecionamento de para a tela de login 
//useEffect - com navegate o useEffect vai verificar se o token tá vazio, se estiver o token estiver vazio,vai redirecionar para Login. Na segunda situação o useEffect vai ser usado para fazer a requisição na api e ela retorna todos os temas listados
function ListaTema() {
    const [temas, setTemas] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token');
    let navigate = useNavigate();

    //Verificação = se o token estiver vazio('') então alerta para logar

    useEffect(() => {
        if (token === '') {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
            navigate("/login")
        }
    }, [token])

    //aguarda- await o metodo busca- passa os três parametos do metodo busca
    //'Autorization'-propriedade que recebe o token que vai autenticar a requisição dentor da api
    async function getTema() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    //useEffect - aciona a função getTema. [tema.lenght]= sempre que o tamamho do temas sofrer alguma modificação a função getTemas será acionada
    useEffect(() => {
        getTema()
    }, [temas.length])

    //temas.map = mapeia cada tema 
    //tema.descrição - vai capturar o tema na variavel  temas.map(tema => e vai capturar exatamente a descrição daquele tema específico
    // <Link to={`/formularioTema/${tema.id}`} } = direciona pra rota formularioTema e vai capturar o tema por id. Asssim como to={`/deletarTema/${tema.id}`} vai deletar temas os capturando pelo id
    return (
        <>
            {
                temas.map(tema => (
                    <Box m={2} >
                        <Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Tema
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {tema.descricao}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display="flex" justifyContent="center" mb={1.5} >

                                    <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" size='small' color="secondary">
                                                deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))
            }
        </>

    );
}


export default ListaTema;