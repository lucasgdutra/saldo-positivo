# Saldo Positivo

Sistema de controle de finanças pessoais desenvolvido com Next.js, Prisma e PostgreSQL.

## Visão Geral

O Saldo Positivo é uma aplicação web completa para gerenciamento financeiro pessoal, permitindo aos usuários:

## 🚀 Demo Online

Acesse a versão de demonstração da aplicação: **[www.saldopositivo.space](https://www.saldopositivo.space)**

A demo está hospedada na Vercel e utiliza:
- **Banco de Dados**: PostgreSQL hospedado no Prisma.io
- **Envio de E-mails**: Serviço Resend.com para recuperação de senha

### Arquitetura de Plataformas

```mermaid
graph TB
    User["👤 Usuário<br/>saldopositivo.space"]
    
    subgraph "Frontend & Deploy"
        Vercel[🚀 Vercel<br/>Hosting & CDN]
        NextJS[⚛️ Next.js 15.2.1<br/>React 19.1.1]
        API[🔗 API Routes<br/>Serverless]
    end
    
    subgraph "Banco de Dados"
        PrismaIO[🗄️ Prisma.io<br/>PostgreSQL]
        Prisma[⚙️ Prisma ORM<br/>Type Safety]
    end
    
    subgraph "Serviços"
        Resend[📧 Resend.com<br/>E-mails]
        Analytics[📊 Vercel Analytics<br/>Monitoring]
    end
    
    User --> Vercel
    Vercel --> NextJS
    NextJS --> API
    API --> Resend
    API --> Prisma
    Prisma --> PrismaIO
    Vercel --> Analytics
    
    classDef userClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef vercelClass fill:#000,color:#fff,stroke:#333,stroke-width:2px
    classDef reactClass fill:#61dafb,stroke:#21759b,stroke-width:2px
    classDef databaseClass fill:#336791,color:#fff,stroke:#1a472a,stroke-width:2px
    classDef serviceClass fill:#ff6b6b,color:#fff,stroke:#c92a2a,stroke-width:2px
    
    class User userClass
    class Vercel,Analytics vercelClass
    class NextJS,API reactClass
    class PrismaIO,Prisma databaseClass
    class NextAuth,Resend serviceClass
```


## Funcionalidades

### Autenticação
- Registro de novos usuários
- Login com email e senha
- Recuperação de senha por email
- Redefinição de senha
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
- Visualização em lista

### Gerenciamento de Categorias
- Adicionar, editar e excluir categorias para despesas
- Visualização de despesas por categoria

### Relatórios
- Relatórios de despesas por período
- Relatórios de despesas por categoria
- Comparação com períodos anteriores
- Visualização em gráficos e tabelas

### Perfil do Usuário
- Visualização e edição de dados pessoais
- Estatísticas de uso da aplicação

## Tecnologias Utilizadas

- **Frontend**: Next.js 15.2.1 (App Router), React 19.1.1, Tailwind CSS 4.1.12, Recharts
- **Backend**: API Routes do Next.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma 6.14.0
- **Autenticação**: NextAuth.js 4.24.11
- **Validação**: Zod 4.0.17
- **UI Components**: Radix UI, Lucide React
- **Containerização**: Docker e Docker Compose
- **Análise**: Vercel Analytics & Speed Insights

## Requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
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
RESEND_API_KEY="sua-chave-resend-para-emails" # Opcional, para recuperação de senha
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

> **Nota**: O projeto utiliza Turbopack para desenvolvimento mais rápido.

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento com Turbopack
- `pnpm build` - Constrói a aplicação para produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa verificação de linting

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
  - `/perfil` - Página de perfil do usuário
  - `/apresentacao` - Página de apresentação
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
- `/src/repositories` - Camada de acesso a dados
- `/src/services` - Lógica de negócio
- `/src/schemas` - Schemas Zod gerados automaticamente
- `/src/types` - Definições de tipos TypeScript


## Implantação

### Produção (Configuração Atual)

A aplicação está atualmente implantada usando a seguinte stack de produção:

#### 🚀 Hospedagem: [Vercel](https://vercel.com)
- Serverless functions para API Routes
- CDN global para performance otimizada
- SSL/HTTPS automático
- **URL de produção**: [www.saldopositivo.space](https://www.saldopositivo.space)

#### 🗄️ Banco de Dados: [Prisma.io](https://www.prisma.io)
- PostgreSQL hospedado e gerenciado
- Connection pooling automático
- Backup e recuperação automática
- Monitoring integrado

#### 📧 E-mails: [Resend.com](https://resend.com)
- API moderna para envio de emails
- Templates responsivos
- Analytics de entrega
- Usado para recuperação de senha

### Implantação Alternativa

Para implantar sua própria versão:

#### 1. Hospedagem
- **Recomendado**: [Vercel](https://vercel.com/new) (deploy com 1-click)
- **Alternativas**: Netlify, Railway, Render

#### 2. Banco de Dados
Opções recomendadas para PostgreSQL:
- [Prisma.io](https://www.prisma.io) (usado em produção)
- [Neon](https://neon.tech) (PostgreSQL serverless)
- [Supabase](https://supabase.com) (PostgreSQL + Backend-as-a-Service)
- [Railway](https://railway.app) (PostgreSQL simples)

#### 3. Envio de E-mails
- [Resend.com](https://resend.com) (usado em produção)
- [SendGrid](https://sendgrid.com)
- [Mailgun](https://www.mailgun.com)

### Variáveis de Ambiente em Produção

Configure as seguintes variáveis no painel da Vercel ou sua plataforma escolhida:

```bash
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_URL="https://www.saldopositivo.space"
NEXTAUTH_SECRET="sua-chave-secreta-super-segura"
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
```

## Documentação Adicional

Para mais informações sobre o projeto, consulte:
- [Documentação de Requisitos](./docs/Entrega2/index.md)
- [Diagramas do Sistema](./docs/Entrega2/)
