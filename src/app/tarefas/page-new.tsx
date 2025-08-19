"use client";

import { useTarefas } from '@/lib/tarefaContext';
import ListaTarefas from '@/components/ListaTarefas';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';

export default function TarefasPage() {
    const { tarefas, dispatch } = useTarefas();

    return (
        <PageLayout title="Lista de Tarefas">
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-600">
                    Total: {tarefas.length} tarefas | 
                    Concluídas: {tarefas.filter(t => t.concluida).length} | 
                    Pendentes: {tarefas.filter(t => !t.concluida).length}
                </div>
                <Link
                    href="/tarefas/nova"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    + Nova Tarefa
                </Link>
            </div>
            <ListaTarefas tarefas={tarefas} dispatch={dispatch} />
        </PageLayout>
    );
}
