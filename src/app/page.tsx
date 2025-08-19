import Link from "next/link";
import PageLayout from "../components/PageLayout";

export default function Home() {
  return (
    <PageLayout title="Gerenciador de Tarefas">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl text-gray-600 mb-4">
            Organize suas tarefas de forma simples e eficiente
          </h2>
          <p className="text-gray-500">
            Com este aplicativo você pode criar, editar, marcar como concluída e remover suas tarefas.
            Todos os dados são salvos localmente no seu navegador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">📝 Criar Tarefas</h3>
            <p className="text-sm text-gray-600">Adicione novas tarefas com título e descrição</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">✅ Marcar Concluídas</h3>
            <p className="text-sm text-gray-600">Acompanhe o progresso das suas atividades</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">🗂️ Organizar</h3>
            <p className="text-sm text-gray-600">Edite ou remova tarefas conforme necessário</p>
          </div>
        </div>

        <Link
          href="/tarefas"
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
        >
          Acessar Lista de Tarefas
        </Link>
      </div>
    </PageLayout>
  );
}