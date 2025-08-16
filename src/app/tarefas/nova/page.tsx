"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import FormularioTarefa from "@/components/TarefaFormulario";
import type { TarefaInput } from "@/types/tarefa";
import { useTarefas } from "@/contexts/TarefasContext";

export default function NovaTarefaPage() {
  const router = useRouter();

  const { dispatch } = useTarefas();

  function adicionarTarefa(tarefa: TarefaInput) {
    dispatch({ tipo: 'ADICIONAR', tarefa });
    router.push('/tarefas');
  }

  return (
    <div>
        <Link href="/tarefas" style={{
          display: 'inline-block',
          margin: '1em 0 0 1em',
          background: '#0a2342',
          color: '#e9ecf7',
          border: 'none',
          borderRadius: '.5em',
          padding: '.5em 1.2em',
          fontWeight: 500,
          textDecoration: 'none',
          boxShadow: '0 2px 8px #0002',
          transition: 'background 0.2s',
        }}>← Voltar</Link>
      <h1 style={{ textAlign: 'center', margin: '0 1em 0', color: '#e9ecf7', fontSize: '24px' }}>Adicionar nova tarefa</h1>
      <FormularioTarefa onAdicionar={adicionarTarefa} />
    </div>
  );
}