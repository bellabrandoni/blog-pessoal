import { legacy_createStore as createStore} from "redux";
import {tokensReducer} from './tokens/tokenReducer';

// A constante store cham o metodo create store e passa por parametro o tokenReducer. Assim podemos gerenciar nossa aplicação, já que o reducer faz as interceptações, recebe as ações e armazena dentro do store
const store = createStore(tokensReducer);

export default store;