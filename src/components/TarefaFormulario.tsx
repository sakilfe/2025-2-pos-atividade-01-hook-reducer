"use client";

import { useState } from "react";
import type { TarefaInput } from "../types/tarefa";

interface TarefaFormularioProps {
  onSubmit: (tarefa: TarefaInput) => void;
  textoBotao?: string;
  valorInicial?: TarefaInput;
  disabled?: boolean;
}

export default function TarefaFormulario({ 
  onSubmit, 
  textoBotao = "Adicionar tarefa", 
  valorInicial,
  disabled = false 
}: TarefaFormularioProps) {
  const [titulo, setTitulo] = useState(valorInicial?.titulo || "");
  const [descricao, setDescricao] = useState(valorInicial?.descricao || "");
  const [carregando, setCarregando] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) return;
    
    setCarregando(true);
    const tarefa: TarefaInput = {
      titulo,
      descricao,
      concluida: valorInicial?.concluida || false,
    };
    
    Promise.resolve(onSubmit(tarefa)).finally(() => {
      setCarregando(false);
      if (!valorInicial) {
        setTitulo("");
        setDescricao("");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
          Título
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
          disabled={disabled}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>
      
      <button
        type="submit"
        disabled={carregando || disabled}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {carregando ? 'Processando...' : textoBotao}
      </button>
    </form>
  );
}