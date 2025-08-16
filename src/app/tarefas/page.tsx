"use client";

import Layout from "@/components/arquivo";
import ListaTarefas from "@/components/ListaTarefas";
import { useTarefas } from "@/lib/tarefaContext";

export default function TarefasPage() {
  const { tarefas } = useTarefas();

  return (
    <Layout>
      <h2>Lista de Tarefas</h2>
      <ListaTarefas tasks={tarefas} />
    </Layout>
  );
}