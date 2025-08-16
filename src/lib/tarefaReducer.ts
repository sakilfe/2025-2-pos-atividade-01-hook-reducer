import { Tarefa } from "@/types/tarefa";

type TarefaAction =
  | { type: "ADD_Tarefa"; payload: Tarefa }
  | { type: "UPDATE_Tarefa"; payload: Tarefa }
  | { type: "DELETE_Tarefa"; payload: string }
  | { type: "TOGGLE_Tarefa"; payload: string }
  | { type: "LOAD_TarefaS"; payload: Tarefa[] };

export function TarefaReducer(state: Tarefa[], action: TarefaAction): Tarefa[] {
  switch (action.type) {
    case "ADD_Tarefa":
      return [...state, action.payload];
    case "UPDATE_Tarefa":
      return state.map(t => t.id === action.payload.id ? action.payload : t);
    case "DELETE_Tarefa":
      return state.filter(t => t.id !== action.payload);
    case "TOGGLE_Tarefa":
      return state.map(t =>
        t.id === action.payload ? { ...t, done: !t.concluida } : t
      );
    case "LOAD_TarefaS":
      return action.payload;
    default:
      return state;
  }
}