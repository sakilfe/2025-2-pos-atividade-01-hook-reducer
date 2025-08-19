"use client";

import { useRouter } from "next/navigation";
import TarefaFormulario from "../../../components/TarefaFormulario";
import PageLayout from "../../../components/PageLayout";
import type { TarefaInput } from "../../../types/tarefa";
import { useTarefas } from "../../../lib/tarefaContext";

export default function NovaTarefaPage() {
  const router = useRouter();
  const { dispatch } = useTarefas();

  function handleSubmit(tarefa: TarefaInput) {
    dispatch({ tipo: 'ADICIONAR', tarefa });
    router.push('/tarefas');
  }

  return (
    <PageLayout title="Nova Tarefa" showBackButton backUrl="/tarefas">
      <TarefaFormulario 
        onSubmit={handleSubmit}
        textoBotao="Criar Tarefa"
      />
    </PageLayout>
  );
}