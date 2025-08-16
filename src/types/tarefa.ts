export interface Tarefa {
    id: string;
    titulo: string;
    descricao: string;
    concluida: boolean;
    dataCriacao: Date;
    dataAtualizacao?: Date;
}

export type TarefaInput = Omit<Tarefa, 'id' | 'dataCriacao' | 'dataAtualizacao'>;

export type AcaoTarefa = 
    | { tipo: 'ADICIONAR'; tarefa: TarefaInput }
    | { tipo: 'ATUALIZAR'; id: string; tarefa: Partial<TarefaInput> }
    | { tipo: 'REMOVER'; id: string }
    | { tipo: 'COMPLETAR'; id: string }
    | { tipo: 'CARREGAR'; tarefas: Tarefa[] };