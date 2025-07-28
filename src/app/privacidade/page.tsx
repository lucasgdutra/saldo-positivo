import Link from "next/link";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function PrivacidadePage() {
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
										utilizada para gerenciar informações financeiras reais. Todos os dados inseridos são fictícios e 
										destinados apenas para demonstração e avaliação acadêmica.
									</p>
								</div>
							</div>
						</div>

						<h1 className="mb-8 text-4xl font-bold text-gray-900">
							Política de Privacidade
						</h1>

						<div className="space-y-8 text-gray-700">
							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									1. Informações que Coletamos
								</h2>
								<p className="mb-4">
									Coletamos informações que você nos fornece diretamente, como:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Nome completo e informações de contato</li>
									<li>Dados financeiros inseridos na plataforma</li>
									<li>Informações de conta e preferências</li>
									<li>Comunicações que você envia para nós</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									2. Como Usamos suas Informações
								</h2>
								<p className="mb-4">
									Utilizamos suas informações para:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Fornecer e manter nossos serviços</li>
									<li>Processar transações e gerar relatórios</li>
									<li>Comunicar sobre atualizações e mudanças</li>
									<li>Melhorar nossa plataforma e experiência do usuário</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									3. Compartilhamento de Informações
								</h2>
								<p className="mb-4">
									Não vendemos, alugamos ou compartilhamos suas informações pessoais 
									com terceiros, exceto nas seguintes situações:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Com seu consentimento explícito</li>
									<li>Para cumprir obrigações legais</li>
									<li>Para proteger nossos direitos e segurança</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									4. Segurança dos Dados
								</h2>
								<p>
									Implementamos medidas de segurança técnicas e organizacionais 
									para proteger suas informações contra acesso não autorizado, 
									alteração, divulgação ou destruição.
								</p>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									5. Seus Direitos
								</h2>
								<p className="mb-4">
									Você tem o direito de:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Acessar suas informações pessoais</li>
									<li>Corrigir dados incorretos</li>
									<li>Solicitar a exclusão de sua conta</li>
									<li>Retirar seu consentimento a qualquer momento</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									6. Contato
								</h2>
								<p>
									Para questões sobre esta política de privacidade, entre em contato 
									através da nossa página de <Link href="/contato" className="text-blue-600 hover:underline">contato</Link>.
								</p>
							</section>

							<section>
								<p className="text-sm text-gray-500">
									Última atualização: {new Date().toLocaleDateString('pt-BR')}
								</p>
							</section>
						</div>
					</div>
				</main>
			</div>
		</AuthGuard>
	);
}