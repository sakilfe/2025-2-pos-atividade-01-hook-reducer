"use client";

import { Tarefa } from "@/types/tarefa";
import { useState } from "react";

interface TaskFormProps {
  initialData?: Tarefa;
  onSubmit: (task: Tarefa) => void;
}

export default function TaskForm({ initialData, onSubmit }: TaskFormProps) {
  const [titulo, setTitle] = useState(initialData?.titulo || "");
  const [descricao, setDescription] = useState(initialData?.descricao || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || crypto.randomUUID(),
      titulo,
      descricao,
      concluida: initialData?.concluida || false,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        placeholder="Título da tarefa"
        value={titulo}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}