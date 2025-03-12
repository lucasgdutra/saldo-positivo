import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function Home() {
	return (
		<AuthGuard requireAuth={false}>
			<div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
				{/* Cabeçalho */}
				<header className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold text-blue-600">Saldo Positivo</h1>
						<Link
							href="#auth"
							className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
						>
							Fazer Login
						</Link>
					</div>
				</header>

				{/* Hero Section */}
				<section className="container mx-auto px-4 py-16">
					<div className="grid grid-cols-1 gap-12 md:grid-cols-2">
						<div className="flex flex-col justify-center">
							<h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
								Gerencie suas finanças com simplicidade e eficiência
							</h2>
							<p className="mt-6 text-xl text-gray-600">
								O Saldo Positivo é uma plataforma completa para controle
								financeiro pessoal, ajudando você a acompanhar receitas,
								despesas e alcançar seus objetivos financeiros.
							</p>
							<div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
								<Link
									href="#auth"
									className="rounded-md bg-blue-600 px-6 py-3 text-center text-white hover:bg-blue-700"
								>
									Começar Agora
								</Link>
								<Link
									href="#features"
									className="rounded-md border border-gray-300 bg-white px-6 py-3 text-center text-gray-700 hover:bg-gray-50"
								>
									Saiba Mais
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Recursos */}
				<section id="features" className="bg-white py-16">
					<div className="container mx-auto px-4">
						<h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
							Recursos Principais
						</h2>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="rounded-lg bg-blue-50 p-6">
								<div className="mb-4 rounded-full bg-blue-100 p-3 inline-block">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
										/>
									</svg>
								</div>
								<h3 className="mb-2 text-xl font-semibold">
									Dashboard Completo
								</h3>
								<p className="text-gray-600">
									Visualize seu saldo atual, histórico de transações e gráficos
									de despesas por categoria.
								</p>
							</div>
							<div className="rounded-lg bg-blue-50 p-6">
								<div className="mb-4 rounded-full bg-blue-100 p-3 inline-block">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="mb-2 text-xl font-semibold">
									Gestão de Receitas e Despesas
								</h3>
								<p className="text-gray-600">
									Registre e categorize suas receitas e despesas de forma
									simples e organizada.
								</p>
							</div>
							<div className="rounded-lg bg-blue-50 p-6">
								<div className="mb-4 rounded-full bg-blue-100 p-3 inline-block">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<h3 className="mb-2 text-xl font-semibold">
									Relatórios Detalhados
								</h3>
								<p className="text-gray-600">
									Acesse relatórios personalizados para analisar seus gastos e
									identificar oportunidades de economia.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Autenticação */}
				<section id="auth" className="bg-gray-50 py-16">
					<div className="container mx-auto px-4">
						<div className="mx-auto max-w-md">
							<div className="rounded-lg bg-white p-8 shadow-md">
								<div className="mb-8 text-center">
									<h2 className="text-3xl font-bold text-gray-900">
										Acesse sua conta
									</h2>
									<p className="mt-2 text-gray-600">
										Entre ou crie uma conta para começar a gerenciar suas
										finanças
									</p>
								</div>
								<AuthForm />
							</div>
						</div>
					</div>
				</section>

				{/* Rodapé */}
				<footer className="bg-gray-800 py-8 text-white">
					<div className="container mx-auto px-4">
						<div className="flex flex-col items-center justify-between md:flex-row">
							<div className="mb-4 md:mb-0">
								<h3 className="text-xl font-bold">Saldo Positivo</h3>
								<p className="mt-2 text-gray-400">
									© {new Date().getFullYear()} Todos os direitos reservados
								</p>
							</div>
							<div className="flex space-x-4">
								<a href="#" className="hover:text-blue-400">
									Termos de Uso
								</a>
								<a href="#" className="hover:text-blue-400">
									Política de Privacidade
								</a>
								<a href="#" className="hover:text-blue-400">
									Contato
								</a>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</AuthGuard>
	);
}
