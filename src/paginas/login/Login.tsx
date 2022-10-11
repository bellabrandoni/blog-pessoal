import React, { useState, ChangeEvent, useEffect } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Box } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../services/Service';
import './Login.css';
import UserLogin from '../../model/UserLogin';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/action';

function Login() {

    //UseNavigate = responsavel por redirecionar pra tela de home se a autentificação estive OK
    //UseDispach recebe o token para poder autenticar 

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const [token, setToken] = useState('');



    //UseState = permite manipular valores de estado de um componente
    //userLogin-estado do componente 
    //setUserLogin função que podera alterar o estado do componenete userLogin
    //UseState<UseLogin> - o componente useStete é do tipo da model, por isso chamamos a model com <>
    const [userLogin, setUserLogin] = useState<UserLogin>({
        //parametros do useState
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    });


    //updatedModel - metodo responsável por fazer a atualização da nossa model, trabalha em conjunto com o useState, utilizando userLogin e setUserLogin
    // event: ChangeEvent = parametro de alteração<> da interface Html que faz a manipulação de elementos input como textfield etc.
    //...userLogin = os 3 pontos espalha todos os atributos dentro de userLogin pra dentro da função setUserLogin = atualiza a model com o valor que o usuario digitar no campo de imput
    //e.target.name = captura a propriedade name em TextField
    //e.target.value = value é o valor que o usuario digita dentro do campo name


    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        })

    }

    //useEffect é responsável pelo ciclo de vida de um componente
    //if = verifica se o token no localStorage está ou não vazio, se está ou não preenchido com o token que veio da api. navigate('/home) = aciona a variavel navigate + metodo de redirect redireciona pra pagina home ''
    useEffect(()=>{
        if(token !== '') {
            dispatch(addToken(token))
            navigate('/home')
        }
    }, [token])

    //função assincrona está prepara para que no momento em que o usuario clicar em logar e fazer o envio das informações

    //onSubmit= responsavel por enviar os dados para nossa requisição (dados de login do usuario) mas agora olhando o formulario como um todo por isso <HTMLFormElement>

    // preventDefault -previne o comportamento padrão do botão, impedindo que ele atualize a tela e perca os dados

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('userLogin:' + Object.values(userLogin));

        //TRY = tentativa de resposta da requisição api / await = aguarda enquanto a api dá um resposta. post = direciona para uma rota que é a tentativa de login(masma rota que existe na api). userLogin = dados de tentativa de conexão. Se tudo tiver Ok a api vai armazenar o retorno( setToken)  na constante resposta
        //e caso aconteça algum problema esse erro vai ser relatado dentro do catach
        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            alert('Usuário logado com sucesso!');
        } catch (error) {
            alert('Dados do usuário inconsistentes. Erro ao logar!');
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
                        <TextField value={userLogin.usuario}
                            //value = vincula este campo TextField com a model
                            onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                            //O atributo onChange aciona a função updatedModel. Sempre que acontecer uma modificaçãpo(event:ChangeEvent<HTMLInputElement>) dentro do elemento TextField ele vai poder acionar a função =>updateModel(event) e como paramentro dessa função o event vai conter todas as modificações que ocorrerem dentro do TextField
                            id='usuario'
                            name='usuario'
                            label='usuário' variant='outlined' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                            id='senha'
                            name='senha'
                            label='senha'
                            variant='outlined' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>

                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>

            </Grid>
        </Grid>
    );
}

export default Login;