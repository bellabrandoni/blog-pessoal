import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../model/Tema';
import { useSelector } from 'react-redux';
import { TokenState } from './../../../store/tokens/tokenReducer';
import Postagem from '../../../model/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';
import './CadastroPost.css';
import { toast } from 'react-toastify';

function CadastroPost() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([]) //armazena todos os temas cadastrados na api
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    //Verificação do token
    useEffect(() => {
        if (token === "") {
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

    //armazena um Tema específico pelo id - capturado pelo id

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })
    //efetua o cadastro das postagens
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null
    })

    //monitora o state tema, verifica se tem um Tema específico e então preenche o state de postagem se aparecer alguma mudança no select de temas  - Se a variavel perceber algum tipo de alteração na variavel Tema ela aciona o set Postagem, que por sua vez vai pegar esse tema selecionado e atribuir ao state postagens  
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    //UseEffect Aciona a função getTemas-> Primeiro fica monitorando o id da postagem, se ocorrer alguma alteração no id ele aciona a função getTemas(função assincrona de busca), as informações retornadas da api é armazenada no state Tema, e então esse useEffect ao aciona essa função para trazer todfos os temas também faz uma verificação
    //se o id for diferente de undefined significa que o id existe, então fazemos uma busca por id
    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    //busca por meio do id na api
    //informações reotrnadas são armazenadas no State de postagem
    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    //Preenche o state Postagem com os Temas se tiver input(html) de titulo ou Texto no forms. Basicamente forma um objeto com as informações que o usuario digita
    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    //Onsubmit = para envio das informações da postagem
    //se id é diferente de undefined então essa postagem já está cadastrada, então aciona o metodo put para que esta postagem existente seja atualizada, e retorna a mensagem de atualizada co sucesso
    //se não tem o id então uma nova postagem está sendo criada, se uma nova postagem está sendo criada então ela aciona o metodo post
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem atualizada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem cadastrada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        }
        back()

    }

    function back() {
        navigate('/posts')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;