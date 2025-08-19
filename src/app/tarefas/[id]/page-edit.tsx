"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TarefaFormulario from "@/components/TarefaFormulario";
import PageLayout from "@/components/PageLayout";
import type { Tarefa, TarefaInput } from "@/types/tarefa";
import { useTarefas } from "@/lib/tarefaContext";

export default function EditarTarefaPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || '';
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
  const { tarefas, dispatch } = useTarefas();

  useEffect(() => {
    const tarefaEncontrada = tarefas.find((t) => t.id === id);
    if (tarefaEncontrada) {
      setTarefa(tarefaEncontrada);
    } else {
      router.push('/tarefas');
    }
  }, [id, tarefas, router]);

  function handleSubmit(dadosEditados: TarefaInput) {
    dispatch({ 
      tipo: 'ATUALIZAR', 
      id: id,
      tarefa: dadosEditados
    });
    router.push('/tarefas');
  }

  if (!tarefa) {
    return (
      <PageLayout title="Carregando..." showBackButton>
        <div className="text-center py-8">
          <p>Carregando tarefa...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Editar Tarefa" showBackButton>
      <TarefaFormulario
        onSubmit={handleSubmit}
        textoBotao="Salvar Alterações"
        valorInicial={{
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          concluida: tarefa.concluida
        }}
      />
    </PageLayout>
  );
}
