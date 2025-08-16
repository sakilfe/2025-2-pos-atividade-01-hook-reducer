import { TarefaProvider } from "@/lib/tarefaContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <TarefaProvider>
          {children}
        </TarefaProvider>
      </body>
    </html>
  );
}