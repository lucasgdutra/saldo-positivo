"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth/auth-guard";
import { toast } from "sonner";

export default function ContatoPage() {
	const [formData, setFormData] = useState({
		nome: "",
		email: "",
		assunto: "",
		mensagem: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Simular envio do formulário
			await new Promise(resolve => setTimeout(resolve, 1000));

			toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
			setFormData({
				nome: "",
				email: "",
				assunto: "",
				mensagem: "",
			});
		} catch {
			toast.error("Erro ao enviar mensagem. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthGuard requireAuth={false}>
			<div className="min-h-screen bg-gray-50">
				<header className="bg-white shadow-sm">
					<div className="container mx-auto px-4 py-6">
						<div className="flex items-center justify-between">
							<Link href="/" className="text-2xl font-bold text-blue-600">
								Saldo Positivo
							</Link>
							<Link
								href="/"
								className="text-gray-600 hover:text-blue-600"
							>
								Voltar ao início
							</Link>
						</div>
					</div>
				</header>

				<main className="container mx-auto px-4 py-12">
					<div className="mx-auto max-w-4xl">
						{/* Aviso de Projeto Acadêmico */}
						<div className="mb-8 rounded-lg bg-yellow-50 border border-yellow-200 p-6">
							<div className="flex items-start space-x-3">
								<div>
									<h3 className="text-lg font-semibold text-yellow-800 mb-2">
										⚠️ Projeto Acadêmico
									</h3>
									<p className="text-yellow-700">
										<strong>ATENÇÃO:</strong> O Saldo Positivo é um sistema desenvolvido exclusivamente para fins acadêmicos
										como projeto de faculdade. Esta plataforma não foi criada para uso real por usuários e não deve ser
										utilizada para gerenciar informações financeiras reais. Este formulário de contato é apenas demonstrativo
										e não enviará mensagens reais.
									</p>
								</div>
							</div>
						</div>

						<h1 className="mb-8 text-4xl font-bold text-gray-900">
							Entre em Contato
						</h1>

						<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
							<div>
								<h2 className="mb-6 text-2xl font-semibold text-gray-900">
									Informações de Contato
								</h2>

								<div className="space-y-6">
									<div className="flex items-start space-x-4">
										<div className="rounded-full bg-blue-100 p-3">
											<svg
												className="h-6 w-6 text-blue-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">Email</h3>
											<p className="text-gray-600">contato@saldopositivo.com</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="rounded-full bg-blue-100 p-3">
											<svg
												className="h-6 w-6 text-blue-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">Horário de Atendimento</h3>
											<p className="text-gray-600">Segunda a Sexta, 9h às 18h</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="rounded-full bg-blue-100 p-3">
											<svg
												className="h-6 w-6 text-blue-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">Suporte</h3>
											<p className="text-gray-600">Resposta em até 24 horas</p>
										</div>
									</div>
								</div>
							</div>

							<div>
								<div className="rounded-lg bg-white p-8 shadow-md">
									<h2 className="mb-6 text-2xl font-semibold text-gray-900">
										Envie sua Mensagem
									</h2>

									<form onSubmit={handleSubmit} className="space-y-6">
										<div>
											<label htmlFor="nome" className="block text-sm font-medium text-gray-700">
												Nome Completo
											</label>
											<input
												type="text"
												id="nome"
												name="nome"
												value={formData.nome}
												onChange={handleChange}
												required
												className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
											/>
										</div>

										<div>
											<label htmlFor="email" className="block text-sm font-medium text-gray-700">
												Email
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												required
												className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
											/>
										</div>

										<div>
											<label htmlFor="assunto" className="block text-sm font-medium text-gray-700">
												Assunto
											</label>
											<select
												id="assunto"
												name="assunto"
												value={formData.assunto}
												onChange={handleChange}
												required
												className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
											>
												<option value="">Selecione um assunto</option>
												<option value="suporte">Suporte Técnico</option>
												<option value="duvida">Dúvida sobre Funcionalidades</option>
												<option value="sugestao">Sugestão de Melhoria</option>
												<option value="problema">Relatar Problema</option>
												<option value="outro">Outro</option>
											</select>
										</div>

										<div>
											<label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">
												Mensagem
											</label>
											<textarea
												id="mensagem"
												name="mensagem"
												value={formData.mensagem}
												onChange={handleChange}
												required
												rows={5}
												className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
												placeholder="Descreva sua mensagem em detalhes..."
											/>
										</div>

										<button
											type="submit"
											disabled={isSubmitting}
											className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
										>
											{isSubmitting ? "Enviando..." : "Enviar Mensagem"}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</AuthGuard>
	);
}