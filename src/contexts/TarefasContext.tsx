'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { Tarefa, AcaoTarefa } from '@/types/tarefa';
import { tarefaReducer } from '@/lib/tarefaReducer';

type TarefasContextType = {
    tarefas: Tarefa[];
    dispatch: React.Dispatch<AcaoTarefa>;
};

const TarefasContext = createContext<TarefasContextType | undefined>(undefined);

export function TarefasProvider({ children }: { children: React.ReactNode }) {
    const [tarefas, dispatch] = useReducer(tarefaReducer, []);

    useEffect(() => {
        const tarefasSalvas = localStorage?.getItem('tarefas');
        if (tarefasSalvas) {
            const tarefasCarregadas = JSON.parse(tarefasSalvas);
            dispatch({
                tipo: 'CARREGAR',
                tarefas: tarefasCarregadas.map((t: any) => ({
                    ...t,
                    dataCriacao: new Date(t.dataCriacao),
                    dataAtualizacao: t.dataAtualizacao ? new Date(t.dataAtualizacao) : undefined
                }))
            });
        }
    }, []);

    return (
        <TarefasContext.Provider value={{ tarefas, dispatch }}>
            {children}
        </TarefasContext.Provider>
    );
}

export function useTarefas() {
    const context = useContext(TarefasContext);
    if (context === undefined) {
        throw new Error('useTarefas deve ser usado dentro de um TarefasProvider');
    }
    return context;
}
