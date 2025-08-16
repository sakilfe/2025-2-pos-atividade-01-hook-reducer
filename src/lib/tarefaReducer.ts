import { Tarefa, AcaoTarefa } from '@/types/tarefa';

export const tarefaReducer = (state: Tarefa[], acao: AcaoTarefa): Tarefa[] => {
    let novoEstado: Tarefa[];

    switch (acao.tipo) {
        case 'CARREGAR': {
            return acao.tarefas;
        }
        
        case 'ADICIONAR': {
            if (state.some((t: Tarefa) => t.titulo === acao.tarefa.titulo)) {
                return state;
            }
            const novaTarefa: Tarefa = {
                ...acao.tarefa,
                id: crypto.randomUUID(),
                dataCriacao: new Date(),
                dataAtualizacao: new Date(),
                concluida: false
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

    // Ordenar: pendentes primeiro, depois concluídas, e mais recentes primeiro
    novoEstado.sort((a, b) => {
        if (a.concluida === b.concluida) {
            return new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime();
        }
        return a.concluida ? 1 : -1;
    });

    // Salvar no localStorage
    try {
        localStorage.setItem('tarefas', JSON.stringify(novoEstado));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }

    return novoEstado;
};
