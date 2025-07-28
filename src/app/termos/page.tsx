import Link from "next/link";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function TermosPage() {
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
							Termos de Uso
						</h1>

						<div className="space-y-8 text-gray-700">
							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									1. Aceitação dos Termos
								</h2>
								<p>
									Ao acessar e usar o Saldo Positivo, você aceita estar vinculado 
									a estes Termos de Uso. Se você não concordar com qualquer parte 
									destes termos, não deve usar nossos serviços.
								</p>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									2. Descrição do Serviço
								</h2>
								<p>
									O Saldo Positivo é uma plataforma de gestão financeira pessoal 
									que permite aos usuários registrar receitas, despesas, visualizar 
									relatórios e acompanhar seu saldo financeiro.
								</p>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									3. Responsabilidades do Usuário
								</h2>
								<p className="mb-4">Ao usar nossos serviços, você concorda em:</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Fornecer informações precisas e atualizadas</li>
									<li>Manter a confidencialidade de sua conta</li>
									<li>Usar o serviço apenas para fins legais</li>
									<li>Não compartilhar sua conta com terceiros</li>
									<li>Notificar-nos sobre qualquer uso não autorizado</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									4. Limitações de Responsabilidade
								</h2>
								<p>
									O Saldo Positivo é fornecido "como está". Não garantimos que 
									o serviço será ininterrupto ou livre de erros. Você usa o 
									serviço por sua conta e risco.
								</p>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									5. Propriedade Intelectual
								</h2>
								<p>
									Todo o conteúdo, recursos e funcionalidades disponíveis através 
									do Saldo Positivo são de propriedade exclusiva da plataforma e 
									são protegidos por leis de direitos autorais.
								</p>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									6. Encerramento
								</h2>
								<p>
									Podemos encerrar ou suspender sua conta a qualquer momento, 
									sem aviso prévio, por conduta que viole estes Termos de Uso 
									ou seja prejudicial a outros usuários.
								</p>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									7. Alterações aos Termos
								</h2>
								<p>
									Reservamos o direito de modificar estes termos a qualquer momento. 
									As alterações entrarão em vigor imediatamente após a publicação.
								</p>
							</section>

							<section>
								<h2 className="mb-4 text-2xl font-semibold text-gray-900">
									8. Contato
								</h2>
								<p>
									Para questões sobre estes termos, entre em contato através da 
									nossa página de <Link href="/contato" className="text-blue-600 hover:underline">contato</Link>.
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