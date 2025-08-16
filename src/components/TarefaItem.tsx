'use client';

import { Tarefa } from '@/types/tarefa';
import Link from 'next/link';

interface TarefaItemProps {
    tarefa: Tarefa;
    onToggle: (id: string) => void;
}

export default function TarefaItem({ tarefa, onToggle }: TarefaItemProps) {
    return (
        <li className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onToggle(tarefa.id)}
                        className={`px-2 py-1 rounded border ${
                            tarefa.concluida ? 'border-green-500 bg-green-100' : 'border-gray-300'
                        }`}
                    >
                        {tarefa.concluida ? '✓' : ''}
                    </button>
                    <h3 className={`text-lg font-medium ${tarefa.concluida ? 'text-gray-500' : ''}`}>
                        {tarefa.titulo}
                    </h3>
                    {tarefa.concluida && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Concluída
                        </span>
                    )}
                </div>
                <div className="space-x-2">
                    <Link href={`/tarefas/${tarefa.id}`} className="text-blue-500 hover:text-blue-700">
                        Editar
                    </Link>
                    <Link href={`/tarefas/${tarefa.id}/apagar`} className="text-red-500 hover:text-red-700">
                        Apagar
                    </Link>
                </div>
            </div>
            <p className={`mt-2 ${tarefa.concluida ? 'text-gray-600' : ''}`}>{tarefa.descricao}</p>
        </li>
    );
}
