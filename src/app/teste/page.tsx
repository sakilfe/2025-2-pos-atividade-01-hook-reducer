"use client";

import { useTarefas } from '@/lib/tarefaContext';

export default function TestePage() {
    const { tarefas, dispatch } = useTarefas();

    const adicionarTarefaTeste = () => {
        dispatch({
            tipo: 'ADICIONAR',
            tarefa: {
                titulo: 'Tarefa de Teste',
                descricao: 'Esta é uma tarefa de teste',
                concluida: false
            }
        });
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Teste do Sistema</h1>
            
            <div className="mb-4">
                <button 
                    onClick={adicionarTarefaTeste}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Adicionar Tarefa de Teste
                </button>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold">Estado atual:</h2>
                <p>Total de tarefas: {tarefas.length}</p>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Tarefas:</h2>
                {tarefas.length === 0 ? (
                    <p>Nenhuma tarefa encontrada</p>
                ) : (
                    <ul className="space-y-2">
                        {tarefas.map(tarefa => (
                            <li key={tarefa.id} className="border p-2 rounded">
                                <strong>{tarefa.titulo}</strong> - {tarefa.descricao}
                                <br />
                                <small>Status: {tarefa.concluida ? 'Concluída' : 'Pendente'}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
