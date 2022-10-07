import Tema from './Tema';

//relacionamento entre Tema e Postagem, no momento em que a Poostagem for cadastrada já tem que ter um Tema
//Este relacionamento existe também no banco de dados, a tabela de Postagem está relacionada com a tabela de Temas
interface Postagem {
    id: number;
    titulo: string;
    texto: string;
    tema?: Tema| null;
}

export default Postagem;