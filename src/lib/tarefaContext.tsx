"use client";

import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { tarefaReducer } from "./tarefaReducer";
import type { Tarefa, AcaoTarefa } from "../types/tarefa";

type TarefaContextType = {
  tarefas: Tarefa[];
  dispatch: React.Dispatch<AcaoTarefa>;
};

const TarefaContext = createContext<TarefaContextType | undefined>(undefined);

export function TarefaProvider({ children }: { children: ReactNode }) {
  const [tarefas, dispatch] = useReducer(tarefaReducer, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tarefas");
      if (raw) {
        const parsed: any[] = JSON.parse(raw);
        const tarefasComDatas: Tarefa[] = parsed.map(t => ({
          id: t.id,
          titulo: t.titulo,
          descricao: t.descricao,
          concluida: Boolean(t.concluida),
          dataCriacao: t.dataCriacao ? new Date(t.dataCriacao) : new Date(),
          dataAtualizacao: t.dataAtualizacao ? new Date(t.dataAtualizacao) : undefined
        }));
        dispatch({ tipo: "CARREGAR", tarefas: tarefasComDatas });
      }
    } catch (err) {
      console.error("Falha ao carregar tarefas do localStorage:", err);
      // Em caso de erro, limpar localStorage corrompido
      localStorage.removeItem("tarefas");
    }
  }, []);

  return (
    <TarefaContext.Provider value={{ tarefas, dispatch }}>
      {children}
    </TarefaContext.Provider>
  );
}

export function useTarefas() {
  const ctx = useContext(TarefaContext);
  if (!ctx) {
    throw new Error("useTarefas deve ser usado dentro de <TarefaProvider>.");
  }
  return ctx;
}