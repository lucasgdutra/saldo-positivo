'use client'

import { useEffect, useState } from 'react'
import './styles.css'

export default function Apresentacao() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = 3

  const showSlide = (n: number) => {
    let slideNumber = n
    if (n > totalSlides) slideNumber = 1
    if (n < 1) slideNumber = totalSlides
    setCurrentSlide(slideNumber)
  }

  const nextSlide = () => showSlide(currentSlide + 1)
  const prevSlide = () => showSlide(currentSlide - 1)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="slide-container">
      {/* Slide 1 - Evolução do Projeto */}
      <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
        <h2>Evolução do Projeto</h2>
        <div className="tech-grid" style={{ marginBottom: '20px' }}>
          <div className="tech-item">
            <h3>Protótipo Inicial</h3>
            <ul>
              <li>Design inicial no Canva</li>
              <li>Layout base e fluxos</li>
              <li>Validação de conceitos</li>
              <li>Feedback da equipe</li>
            </ul>
          </div>
          <div className="tech-item">
            <h3>Fase Atual</h3>
            <ul>
              <li>Sistema completo em produção</li>
              <li>Interface refinada e responsiva</li>
              <li>Funcionalidades implementadas</li>
              <li>Documentação detalhada</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Slide 2 - Processo e Desafios */}
      <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
        <h2>Processo e Desafios</h2>
        <div style={{ marginBottom: '20px' }}>
          <h3>Metodologia/Processo:</h3>
          <ul>
            <li>Git/GitHub para versionamento</li>
            <li>Documentação estruturada</li>
            <li>Divisão clara de tarefas</li>
          </ul>
        </div>
        <div>
          <h3>Desafios Encontrados:</h3>
          <ul>
            <li>Gerenciamento de estado entre componentes</li>
            <li>Consultas complexas para relatórios</li>
            <li>Tratamento de datas e fusos horários</li>
            <li>Integração NextAuth com Prisma</li>
            <li>Estilização responsiva com Tailwind</li>
          </ul>
        </div>
      </div>

      {/* Slide 3 - Melhorias */}
      <div className={`slide ${currentSlide === 3 ? 'active' : ''}`}>
        <h2>Melhorias e Próximos Passos</h2>
        <div className="tech-grid" style={{ marginBottom: '20px' }}>
          <div className="tech-item">
            <h3>Relatórios Avançados</h3>
            <ul>
              <li>Exportação para PDF e Excel</li>
              <li>Relatório de fluxo de caixa</li>
              <li>Evolução patrimonial</li>
            </ul>
          </div>
          <div className="tech-item">
            <h3>Integração Bancária</h3>
            <ul>
              <li>Importação de extratos CSV/OFX</li>
              <li>Integração com Open Banking</li>
              <li>Múltiplas contas bancárias</li>
            </ul>
          </div>
          <div className="tech-item">
            <h3>Planejamento Financeiro</h3>
            <ul>
              <li>Sistema de orçamentos</li>
              <li>Definição de metas</li>
              <li>Transações recorrentes</li>
            </ul>
          </div>
          <div className="tech-item">
            <h3>Segurança e Usabilidade</h3>
            <ul>
              <li>Recuperação de senha por email</li>
              <li>Autenticação de dois fatores</li>
              <li>Edição de perfil</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="slide-number">
        Slide <span>{currentSlide}</span>/{totalSlides}
      </div>

      <div className="buttons">
        <button onClick={prevSlide}>Anterior</button>
        <button onClick={nextSlide}>Próximo</button>
        <button onClick={handlePrint}>Imprimir PDF</button>
      </div>
    </div>
  )
}