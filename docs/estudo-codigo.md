# Ordem Recomendada para Entender o Código

Para entender o código do projeto "Saldo Positivo" de forma eficiente, sugiro a seguinte ordem de leitura:

## 1. Documentação do Projeto
- `docs/Entrega1/index.md` - Visão geral do sistema
- `docs/Entrega2/index.md` - Requisitos, diagramas e arquitetura
- `README.md` - Visão geral atualizada e instruções de configuração

## 2. Estrutura e Configuração Básica
- `package.json` - Para conhecer as dependências e scripts
- `prisma/schema.prisma` - Para entender o modelo de dados
- `docker-compose.yml` - Para entender a infraestrutura
- `next.config.ts` - Configuração do Next.js
- `tailwind.config.ts` - Configuração do Tailwind CSS

## 3. Modelo de Dados
O sistema utiliza Prisma como ORM e possui os seguintes modelos principais:
- `User` - Usuários do sistema
- `Category` - Categorias para classificação de despesas
- `Expense` - Registro de despesas
- `Revenue` - Registro de receitas
- `Balance` - Saldo financeiro do usuário

Cada modelo possui relacionamentos bem definidos, como:
- Um usuário pode ter várias categorias, despesas e receitas
- Cada despesa pertence a uma categoria
- Cada usuário possui um registro de saldo

## 4. Configuração de Autenticação
- `src/lib/auth.ts` - Configuração de autenticação
- `src/app/api/auth/[...nextauth]/route.ts` - Implementação do NextAuth
- `src/providers/auth-provider.tsx` - Provedor de contexto de autenticação
- `src/components/auth/auth-form.tsx` - Formulário de autenticação
- `src/components/auth/auth-guard.tsx` - Proteção de rotas
- `src/app/api/auth/register/route.ts` - API de registro

## 5. Componentes de Layout e UI Base
- `src/app/layout.tsx` - Layout principal da aplicação
- `src/components/layout/app-layout.tsx` - Layout da aplicação autenticada
- `src/components/layout/main-nav.tsx` - Navegação principal
- `src/components/ui/error-boundary.tsx` - Tratamento de erros
- `src/app/page.tsx` - Página inicial com apresentação e login

## 6. Dashboard (Visão Geral Financeira)
- `src/app/dashboard/page.tsx` - Página do dashboard
- `src/components/dashboard/index.ts` - Exportações do dashboard
- `src/components/dashboard/dashboard-summary.tsx` - Resumo do dashboard
- `src/components/dashboard/balance-chart.tsx` - Gráfico de saldo
- `src/components/dashboard/expenses-by-category-chart.tsx` - Gráfico de despesas por categoria
- `src/components/dashboard/recent-transactions.tsx` - Transações recentes
- `src/components/dashboard/dashboard-error.tsx` - Tratamento de erros do dashboard

## 7. APIs do Dashboard
- `src/app/api/dashboard/balance-history/route.ts` - Histórico de saldo
- `src/app/api/dashboard/expenses-by-category/route.ts` - Despesas por categoria
- `src/app/api/dashboard/recent-transactions/route.ts` - Transações recentes

## 8. Gerenciamento de Despesas
- `src/app/despesas/page.tsx` - Página de listagem de despesas
- `src/components/expenses/expenses-list.tsx` - Lista de despesas com funcionalidades CRUD
- `src/components/expenses/expense-dialog.tsx` - Modal para adicionar/editar despesas
- `src/app/api/expenses/route.ts` - API para gerenciamento de despesas (GET, POST, PUT, DELETE)

## 9. Gerenciamento de Receitas
- `src/app/receitas/page.tsx` - Página de listagem de receitas
- `src/components/revenues/revenues-list.tsx` - Lista de receitas com funcionalidades CRUD
- `src/components/revenues/revenue-dialog.tsx` - Modal para adicionar/editar receitas
- `src/app/api/revenues/route.ts` - API para gerenciamento de receitas (GET, POST, PUT, DELETE)

## 10. Gerenciamento de Categorias
- `src/app/categorias/page.tsx` - Página de categorias
- `src/components/categories/categories-list.tsx` - Lista de categorias
- `src/components/categories/category-dialog.tsx` - Diálogo de categoria
- `src/app/api/categorias/route.ts` - API de categorias

## 11. Relatórios Financeiros
- `src/app/relatorios/page.tsx` - Página de relatórios
- `src/components/reports/reports-list.tsx` - Componente principal de relatórios
- `src/app/api/reports/expenses-by-category-period/route.ts` - API para relatórios de despesas por categoria
- `src/app/api/reports/expenses-by-period/route.ts` - API para relatórios de despesas por período

## 12. Utilitários e Tipos
- `src/lib/utils.ts` - Funções utilitárias
- `src/lib/db.ts` - Configuração do banco de dados
- `src/lib/balance-utils.ts` - Utilitários para cálculo de saldo
- `src/types/next-auth.d.ts` - Tipos para NextAuth

## Fluxo de Funcionamento

### Autenticação
1. O usuário acessa a página inicial (`src/app/page.tsx`)
2. Realiza login ou registro através do formulário de autenticação (`src/components/auth/auth-form.tsx`)
3. Após autenticação, é redirecionado para o dashboard

### Dashboard
1. O dashboard (`src/app/dashboard/page.tsx`) exibe uma visão geral das finanças
2. Componentes como `DashboardSummary`, `BalanceChart`, `ExpensesByCategoryChart` e `RecentTransactions` buscam dados das APIs correspondentes
3. O usuário pode navegar para outras seções através do menu principal (`src/components/layout/main-nav.tsx`)

### Gerenciamento de Despesas e Receitas
1. Nas páginas de despesas (`src/app/despesas/page.tsx`) e receitas (`src/app/receitas/page.tsx`), o usuário pode visualizar, adicionar, editar e excluir registros
2. Os componentes `ExpensesList` e `RevenuesList` gerenciam a interface e interagem com as APIs correspondentes
3. Os diálogos `ExpenseDialog` e `RevenueDialog` permitem a edição dos dados

### Relatórios
1. Na página de relatórios (`src/app/relatorios/page.tsx`), o usuário pode configurar e gerar diferentes tipos de relatórios
2. O componente `ReportsList` permite selecionar períodos, categorias e tipos de agrupamento
3. Os relatórios são exibidos em formato de gráficos e tabelas

## Observações Importantes

O sistema implementa completamente os requisitos documentados em `docs/Entrega2/index.md`, incluindo:
- [RF002] Registrar despesas (informando categoria, valor, data e descrição)
- [RF003] Exibir despesas (com filtros por categoria, data e/ou valor)
- [RF004] Gerar relatório de despesas

A implementação das APIs de despesas e receitas (`src/app/api/expenses/route.ts` e `src/app/api/revenues/route.ts`) suporta todas as operações CRUD (GET, POST, PUT, DELETE), permitindo o gerenciamento completo das finanças do usuário.