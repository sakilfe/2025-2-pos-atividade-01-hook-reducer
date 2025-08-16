import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <header style={{ borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
        <h1>Infoweb - Atividade 1</h1>
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link href="/">Home</Link>
          <Link href="/tarefas">Tarefas</Link>
          <Link href="/tarefas/nova">Nova Tarefa</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer style={{ borderTop: "1px solid #ccc", marginTop: "20px" }}>
        <p>GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007</p>
      </footer>
    </div>
  );
}