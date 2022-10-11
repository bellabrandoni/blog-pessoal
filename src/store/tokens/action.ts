//Adição do token - ADD_TOKEN = tipo ação
//payload= armazena o token

export type Action = {type:"ADD_TOKEN", payload:string};//Variavel de ambiente em maiúscula

export const addToken = (token:string): Action => ({
    type: 'ADD_TOKEN',
    payload:token
})