import React , {useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../model/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { Box } from "@mui/material";
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';


function CadastroUsuario() {

    //A variavel navigate será utilizada dentro do useEffect para que no momento em que o cadastro for efetivado e o usuário já tiver cadastrado vamos direcionar essa tela de cadastro para tela de login para que consiga efetuar o login com o usuario que acabou de ser cadastrado.
    let history= useNavigate();

    //Temos 2 states, o primeiro(confirmarSenha) = possui uma função(setConfirmarSenha) que será utilizada para verificar se o valor que o usuário digitou no campo confirmar senha é igual ao valor que o usuario digitou no campo senha e se forem iguais ele envia essas informações para cadastro.
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    
    //O segundo State vai conter as inormações que serão enviadas para cadastro. Se não tem nenhuma informação(campos vazios) ele se mantem com valores padrões
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            foto:'',
            senha: ''
        })
        //Terceiro UseState=> setUserResult = armazena os valores do retorno da api. Quando envio os dados para o cadastro a api efetiva o cadastro e devolve um JSON contendo os dados cadastrado e esses dados são gravados dentro de userResult
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            foto: '',
            senha: ''
        })

        //será acionado após o envio das informações
        //Verifica se o userResult(state que contém os dados retornados da api/cadsastrados)verificando se o id é diferente de 0, se for diferente de 0 não está mais utilizando os valores padrão, significa que já tem um valor cadastrado e então é direcionado para tela de login
    useEffect(() => {
        if (userResult.id !== 0) {
            history("/login")
        }
    }, [userResult])

    //será acionada em conjunto ao userState, vai capturar o valor digitado no campo confirmarSenha e armazena
    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    //Função de envio de dados para Cadastro. 
    //e.preventDefault - não deixa atualizar a tela, previnindo o comportamento padrão do botão
    //if = verifica se o state confirmarSenha for igual nos dois campos então o service cadastraUsuario, enviando as informações narota (/usuario/cadastrar) e envia um objeto com os valores digitados pelo usuário. Em segui ele retorna um alert de usuário cadastrado e aciona o userEffect direcionando para tela de login. Se os dados do usuário forem inconsistentes, o else pede para o usuário verificar as informções de cadastro

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha === user.senha){
        cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
        alert('Usuario cadastrado com sucesso')
        }else{
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField  required value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField required value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal'fullWidth />
                        <TextField required value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField required value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                    Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;