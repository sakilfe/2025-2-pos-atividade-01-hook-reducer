import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TarefaProvider } from "../lib/tarefaContext";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciador de Tarefas",
  description: "Sistema de gerenciamento de tarefas com React e Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
                Gerenciador de Tarefas
              </Link>
              <Link 
                href="/tarefas" 
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Minhas Tarefas
              </Link>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen">
          <TarefaProvider>
            {children}
          </TarefaProvider>
        </main>
        
        <footer className="bg-white border-t mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Gerenciador de Tarefas - Desenvolvido com Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  );
}