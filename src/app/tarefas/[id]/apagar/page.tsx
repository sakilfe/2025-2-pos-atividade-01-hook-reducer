"use client";

import Layout from "@/components/arquivo";
import { useTarefas } from "@/lib/tarefaContext";
import { Tarefa } from "@/types/tarefa";
import { useParams, useRouter } from "next/navigation";

export default function ApagarTarefaPage() {
  const { tarefas, dispatch } = useTarefas();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const task = tarefas.find((t: Tarefa) => t.id === id);

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: id });
    router.push("/tarefas");
  };

  if (!task) return <Layout><p>Tarefa não encontrada.</p></Layout>;

  return (
    <Layout>
      <h2>Apagar Tarefa</h2>
      <p>Tem certeza que deseja apagar a tarefa "{task.titulo}"?</p>
      <button onClick={handleDelete}>Sim, apagar</button>
      <button onClick={() => router.push("/tarefas")}>Cancelar</button>
    </Layout>
  );
}