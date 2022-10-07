import axios from "axios";

//permite armazenar dentro do axios o endereço da minha api
export const api = axios.create({
    baseURL: "https://blogpessoal-cl8s.onrender.com"
})

export const cadastroUsuario = async(url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados) //o metodo await aguarda o retorno da api para que só então depois disso assione a função setDado
    setDados(resposta.data)//contem todos os dados da resposta da api(nome,usuario, senha e token)
}

//metodo asincrono contem 3 paramentro. O primeiro parametro(url:any)concatena a base url + a url da nossa api que se chama /usuario/logar
//O segundo parametro(dados)contem os dados que nós vamos enbiar para nossa api. são os dados de usuario e de senha.São mandados num objeto json contendo 2 valores
//O terceiro parametro(setDado)recebe a resposta da api, ou seja, um objeto json contendo um token que será utilizado para autentificar o usuario na nossa api
export const login = async(url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados) //o metodo await aguarda o retorno da api para que só então depois disso assione a função setDado
    setDados(resposta.data.token)//contem todos os dados da resposta da api(nome,usuario, senha e token)
}

//Metodo de busca por token - Requisição de busca na api/ lista postagens e tambem lista os temas. Este metodo serve tanto pra lista Tema quanto para lista Postagem
//header = o token é validado para que a requisição seja altentificada. Os dados retornados serão listados no frontend - por meio do hook useState
export const busca = async(url: any,setDados: any, header: any) => {
    const resposta = await api.get(url, header) //o metodo await aguarda o retorno da api para que só então depois disso assione a função setDado
    setDados(resposta.data)//contem todos os dados da resposta da api(nome,usuario, senha e token)
}

//Permite que capture com o Id tanto uma postagem quanto um tema específico
export const buscaId = async(url: any,setDado: any, header: any) => { 
    const resposta = await api.get(url,header)
    setDado(resposta.data)
}

//Metodo utilizado para cadastrar tanto postagem quanto tema
export const post = async(url: any, dados: any, setDado: any, header: any) => { 
    const resposta = await api.post(url,dados,header)
    setDado(resposta.data)
}

//Metodo de atualização de postagem e tema
export const put = async(url: any, dados: any, setDado: any, header: any) => { 
    const resposta = await api.put(url,dados,header)
    setDado(resposta.data)
}

//Permite excluir tanto postagens quanto temas
export const deleteId = async(url: any,header: any) => { 
    await api.delete(url,header)
}


