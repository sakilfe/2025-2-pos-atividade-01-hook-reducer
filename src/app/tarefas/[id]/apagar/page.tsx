'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Tarefa } from '../../../../types/tarefa';
import { useTarefas } from '../../../../lib/tarefaContext';
import PageLayout from '../../../../components/PageLayout';
import Link from 'next/link';

export default function ApagarTarefaPage() {
    const router = useRouter();
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id || '';
    const [tarefa, setTarefa] = useState<Tarefa | null>(null);
    const { tarefas, dispatch } = useTarefas();

    useEffect(() => {
        const tarefaEncontrada = tarefas.find(t => t.id === id);
        if (tarefaEncontrada) {
            setTarefa(tarefaEncontrada);
        } else {
            router.push('/tarefas');
        }
    }, [id, tarefas, router]);

    const handleConfirmarExclusao = async () => {
        try {
            dispatch({ tipo: 'REMOVER', id });
            await router.push('/tarefas');
        } catch (error) {
            console.error('Erro ao excluir:', error);
            alert('Erro ao excluir a tarefa. Por favor, tente novamente.');
        }
    };

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
        <PageLayout title="Confirmar Exclusão" showBackButton>
            <div className="max-w-md mx-auto">
                <div className="bg-white border border-red-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-red-600">
                        Atenção: esta ação não pode ser desfeita.
                    </h2>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h3 className="font-medium text-gray-800 mb-2">
                            {tarefa.titulo}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                            {tarefa.descricao}
                        </p>
                        <p className="text-xs text-gray-500">
                            Status: {tarefa.concluida ? 'Concluída' : 'Pendente'}
                        </p>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-6">
                        Tem certeza que deseja excluir esta tarefa? Esta ação é permanente e não pode ser desfeita.
                    </p>
                    
                    <div className="flex gap-3">
                        <button
                            onClick={handleConfirmarExclusao}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-medium"
                        >
                            Sim, excluir
                        </button>
                        <Link
                            href="/tarefas"
                            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-center font-medium"
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
