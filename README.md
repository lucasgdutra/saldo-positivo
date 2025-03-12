# Saldo Positivo

Sistema de controle de finanças pessoais desenvolvido com Next.js, Prisma e PostgreSQL.

## Visão Geral

O Saldo Positivo é uma aplicação web completa para gerenciamento financeiro pessoal, permitindo aos usuários:

- Visualizar um dashboard com resumo financeiro
- Registrar e gerenciar receitas e despesas
- Categorizar transações financeiras
- Gerar relatórios detalhados por período e categoria
- Acompanhar o histórico de saldo ao longo do tempo

## Tecnologias Utilizadas

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Recharts
- **Backend**: API Routes do Next.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: NextAuth.js
- **Containerização**: Docker e Docker Compose

## Requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para o banco de dados PostgreSQL)
- [pnpm](https://pnpm.io/) (recomendado) ou npm/yarn

## Configuração do Banco de Dados

O projeto utiliza PostgreSQL como banco de dados, configurado através do Docker Compose.

### Iniciando o Banco de Dados

Para iniciar o banco de dados PostgreSQL:

```bash
# Inicia o contêiner PostgreSQL em segundo plano
docker-compose up -d
```

Para verificar se o contêiner está rodando:

```bash
docker-compose ps
```

Para parar o banco de dados:

```bash
docker-compose down
```

## Configuração do Prisma

O projeto utiliza Prisma ORM para interagir com o banco de dados.

### Inicializando o Prisma

Após iniciar o banco de dados, execute as migrações para criar as tabelas:

```bash
# Aplica as migrações ao banco de dados
npx prisma migrate dev --name init
```

Para visualizar e gerenciar os dados do banco:

```bash
# Abre o Prisma Studio (interface web para o banco de dados)
npx prisma studio
```

## Configuração do Projeto

1. Instale as dependências:

```bash
pnpm install
# ou
npm install
# ou
yarn install
```

2. Verifique se o arquivo `.env` contém as variáveis de ambiente necessárias:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saldo_positivo"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-segredo-aqui-substitua-em-producao"
```

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
# ou
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

- `/docs` - Documentação do projeto
- `/prisma` - Schema do banco de dados e migrações
- `/public` - Arquivos estáticos
- `/src/app` - Rotas e páginas da aplicação (Next.js App Router)
  - `/api` - Endpoints da API
  - `/dashboard` - Página principal do dashboard
  - `/despesas` - Gerenciamento de despesas
  - `/receitas` - Gerenciamento de receitas
  - `/categorias` - Gerenciamento de categorias
  - `/relatorios` - Geração de relatórios
- `/src/components` - Componentes React reutilizáveis
  - `/auth` - Componentes de autenticação
  - `/dashboard` - Componentes do dashboard
  - `/expenses` - Componentes de despesas
  - `/revenues` - Componentes de receitas
  - `/categories` - Componentes de categorias
  - `/reports` - Componentes de relatórios
  - `/layout` - Componentes de layout
  - `/ui` - Componentes de UI genéricos
- `/src/lib` - Utilitários e configurações
- `/src/providers` - Provedores de contexto React
- `/src/types` - Definições de tipos TypeScript

## Funcionalidades

### Autenticação
- Registro de novos usuários
- Login com email e senha
- Proteção de rotas para usuários autenticados

### Dashboard
- Resumo financeiro (saldo atual, receitas e despesas)
- Gráfico de histórico de saldo
- Gráfico de despesas por categoria
- Lista de transações recentes

### Gerenciamento de Despesas
- Adicionar, editar e excluir despesas
- Categorização de despesas
- Visualização em lista com filtros

### Gerenciamento de Receitas
- Adicionar, editar e excluir receitas
- Visualização em lista com filtros

### Gerenciamento de Categorias
- Adicionar, editar e excluir categorias para despesas
- Associação de cores às categorias

### Relatórios
- Relatórios de despesas por período
- Relatórios de despesas por categoria
- Comparação com períodos anteriores
- Visualização em gráficos e tabelas

## Implantação

Para implantar em produção, recomenda-se usar a [Vercel](https://vercel.com/new) ou outro serviço compatível com Next.js.

Para o banco de dados em produção, considere usar serviços como:
- [Neon](https://neon.tech) (PostgreSQL serverless)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

## Documentação Adicional

Para mais informações sobre o projeto, consulte:
- [Documentação de Estudo do Código](./docs/estudo-codigo.md)
- [Documentação de Requisitos](./docs/Entrega2/index.md)
- [Diagramas do Sistema](./docs/Entrega2/)
