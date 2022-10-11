import { Action } from "./action";

//model interface, guarda uma unica propriedade
export interface TokenState {
    tokens: string
};

//prpopriedade de estado inicial, definimos um valor vazio ''
const initialState: TokenState = {
    tokens:''
}

//função anonima que recebe um paremetro state e uma ação. A variavel state recebe o tipo da model criada a cima
//A constante initial state que receb o valor vazio
//O segundo parametro é a action criada no arquivo action

//O Switch faz uma verificação do action.type (olha o tipo da action) e verifica que se caso a action seja do tipo add token ENTÃO - pedimos para que retorne a propriedade action.payload. Caso o tipo não seja add_token o valor padrão defualt retorna simplesmente o estado original, que é vazio
export const tokensReducer = (state: TokenState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_TOKEN": {
            return {tokens: action.payload}
        }
        default: return state
    }
}