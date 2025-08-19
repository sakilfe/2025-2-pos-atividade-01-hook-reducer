import Link from 'next/link';

interface PageLayoutProps {
    children: React.ReactNode;
    title: string;
    showBackButton?: boolean;
    backUrl?: string;
}

export default function PageLayout({ 
    children, 
    title, 
    showBackButton = false, 
    backUrl = '/tarefas' 
}: PageLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{title}</h1>
                {showBackButton && (
                    <Link
                        href={backUrl}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        ← Voltar
                    </Link>
                )}
            </div>
            {children}
        </div>
    );
}
