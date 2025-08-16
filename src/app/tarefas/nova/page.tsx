"use client";

import Layout from "@/components/arquivo";
import TaskForm from "@/components/TarefaFormulario";
import { Tarefa } from "@/types/tarefa";
import { useTarefas } from "@/lib/tarefaContext";
import { useRouter } from "next/navigation";

export default function NovaTarefaPage() {
  const { dispatch } = useTarefas();
  const router = useRouter();

  const handleAdd = (task: Tarefa) => {
    dispatch({ type: "ADD_TASK", payload: task });
    router.push("/tarefas");
  };

  return (
    <Layout>
      <h2>Nova Tarefa</h2>
      <TaskForm onSubmit={handleAdd} />
    </Layout>
  );
}