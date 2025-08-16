"use client";

import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { TarefaReducer } from "./tarefaReducer";
import type { Tarefa } from "@/types/tarefa";

type TarefaContextType = {
  tarefas: Tarefa[];
  dispatch: React.Dispatch<any>;
};

const TarefaContext = createContext<TarefaContextType | undefined>(undefined);

export function TarefaProvider({ children }: { children: ReactNode }) {
  const [tarefas, dispatch] = useReducer(TarefaReducer, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tarefas");
      if (raw) {
        const parsed: Tarefa[] = JSON.parse(raw);
        dispatch({ type: "LOAD_TarefaS", payload: parsed });
      }
    } catch (err) {
      console.error("Falha ao carregar tarefas do localStorage:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    } catch (err) {
      console.error("Falha ao salvar tarefas no localStorage:", err);
    }
  }, [tarefas]);

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