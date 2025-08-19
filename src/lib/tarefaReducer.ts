import type { Tarefa, AcaoTarefa } from "../types/tarefa";

export const tarefaReducer = (state: Tarefa[], acao: AcaoTarefa): Tarefa[] => {
    let novoEstado: Tarefa[];

    switch (acao.tipo) {
        case 'CARREGAR': {
            return acao.tarefas;
        }
        
        case 'ADICIONAR': {
            const novaTarefa: Tarefa = {
                ...acao.tarefa,
                id: crypto.randomUUID(),
                dataCriacao: new Date(),
                dataAtualizacao: new Date()
            };
            novoEstado = [...state, novaTarefa];
            break;
        }

        case 'ATUALIZAR': {
            novoEstado = state.map((tarefa: Tarefa) =>
                tarefa.id === acao.id
                    ? { ...tarefa, ...acao.tarefa, dataAtualizacao: new Date() }
                    : tarefa
            );
            break;
        }

        case 'REMOVER': {
            novoEstado = state.filter((tarefa: Tarefa) => tarefa.id !== acao.id);
            break;
        }

        case 'COMPLETAR': {
            novoEstado = state.map((tarefa: Tarefa) =>
                tarefa.id === acao.id
                    ? { ...tarefa, concluida: !tarefa.concluida, dataAtualizacao: new Date() }
                    : tarefa
            );
            break;
        }

        default:
            return state;
    }

    // Salvar no localStorage
    try {
        // Serializar datas como ISO strings
        const tarefasParaSalvar = novoEstado.map(tarefa => ({
            ...tarefa,
            dataCriacao: tarefa.dataCriacao.toISOString(),
            dataAtualizacao: tarefa.dataAtualizacao?.toISOString()
        }));
        localStorage.setItem('tarefas', JSON.stringify(tarefasParaSalvar));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }

    return novoEstado;
};