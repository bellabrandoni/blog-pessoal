import axios from "axios";

//permite armazenar dentro do axios o endereço da minha api
export const api = axios.create({
    baseURL: "https://blogpessoalbackendgen.herokuapp.com/"
})

//metodo asincrono contem 3 paramentro. O primeiro parametro(url:any)concatena a base url + a url da nossa api que se chama /usuario/logar
//O segundo parametro(dados)contem os dados que nós vamos enbiar para nossa api. são os dados de usuario e de senha.São mandados num objeto json contendo 2 valores
//O terceiro parametro(setDado)recebe a resposta da api, ou seja, um objeto json contendo um token que será utilizado para autentificar o usuario na nossa api
export const login = async(url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados) //o metodo await aguarda o retorno da api para que só então depois disso assione a função setDado
    setDados(resposta.data.token)//contem todos os dados da resposta da api(nome,usuario, senha e token)
}

export const cadastroUsuario = async(url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados) //o metodo await aguarda o retorno da api para que só então depois disso assione a função setDado
    setDados(resposta.data)//contem todos os dados da resposta da api(nome,usuario, senha e token)
}
