# Entregável 2 de Projeto e Desenvolvimento de Sistemas de Informação

**Alunos:**
- Andressa Oliveira Bernardes – 12121BSI201
- Dalmo Scalon Inácio – 12111BSI274
- Guilherme Castilho Machado – 12021BSI225
- Lucas Gabriel Dutra de Souza – 12121BSI226
- Matheus Fagundes Santos – 11811BSI300

## 1 INTRODUÇÃO

O sistema de controle de despesas pessoais é uma aplicação web projetada para auxiliar os usuários na organização e no gerenciamento das suas finanças pessoais de forma simples e eficiente.

Com a crescente necessidade de uma maior conscientização sobre os gastos diários, esta ferramenta permite que os usuários tenham uma visão clara sobre os seus hábitos financeiros, categorizando despesas em áreas como lazer, moradia, alimentação, entre outras.

O sistema oferece uma interface intuitiva, onde o usuário pode registrar suas receitas e despesas, visualizar relatórios detalhados sobre seus gastos e planejar orçamentos.

Além disso, proporciona uma análise contínua do quanto ainda pode ser gasto em cada categoria, ajudando a manter o controle financeiro e a alcançar objetivos de economia a curto e longo prazo.

### 1.1 Objetivo

O sistema auxilia os usuários no acompanhamento de seus gastos, permitindo uma gestão financeira mais eficiente. Ele simplifica a visualização da alocação do dinheiro em categorias como lazer e mercado, facilitando ajustes conforme a necessidade.

### 1.2 Nome do sistema

O nome do sistema de controle de despesas pessoais é Saldo Positivo.

### 1.3 Equipe e funções

- Andressa Oliveira Bernardes – Gerente
- Dalmo Scalon Inácio – Desenvolvedor
- Guilherme Castilho Machado – Analista
- Lucas Gabriel Dutra de Souza - Desenvolvedor
- Matheus Fagundes Santos – Desenvolvedor

## 2 DEFINIÇÕES, ACRÔNIMOS E ABREVIAÇÕES

- **Receita/Entrada:** Dinheiro que entrou na conta.
- **Despesa/Saída:** Dinheiro que saiu da conta como um gasto.
- **Relatórios:** Uma tela com as informações da Receita/Entrada é Despesa/Saída do usuário, que ajuda a manter o controle financeiro.
- **Categorias:** São os filtros de despesas do usuário como por exemplo, em áreas como lazer, moradia e alimentação.
- **Saldo:** Diferenças das receitas e despesas.
- **SEO:** Search Engine Optimization (Otimização para Motores de Busca, em tradução livre).
- **ORM:** Object Relational Mapping (Mapeamento Objeto-Relacional, em tradução livre).
- **BaaS:** Backend as a Service (Banco como serviço, em tradução livre).
- **IDE:** Integrated Development Environment (Ambiente de Desenvolvimento Integrado, em tradução livre).

## 3 REQUISITOS FUNCIONAIS

Esta seção apresenta os requisitos funcionais do sistema.

### [RF001] Cadastrar categorias de despesas

O sistema deverá permitir que os usuários cadastrem, editem ou excluam categorias para organizar as suas despesas. Ex.: lazer, alimentação, moradia.

### [RF002] Registrar despesas

O sistema deverá permitir que os usuários registrem suas despesas informando categoria, valor, data e uma descrição opcional, assim como editar e excluir receitas já criadas. Ex.: Compra no supermercado - alimentação, R$250, 17/02/2025, compra da semana.

### [RF003] Exibir despesas

O sistema deverá permitir a exibição de uma lista das despesas registradas, possibilitando que elas sejam filtradas por categoria, data e/ou valor.

### [RF004] Gerar relatório de despesas

O sistema deverá permitir a geração de um relatório de despesas que mostre a soma total por categoria e por período, com a opção de fazer um comparativo periódico. Ex.: geração de relatório da categoria de lazer do período 01/2025.

### [RF005] Controle de saldo

O sistema deverá permitir que o usuário registre, edite e exclua uma receita e calcule automaticamente quanto ele ainda tem de saldo disponível - subtraindo a soma das despesas já registradas no mês. Ele também deve permitir que o usuário visualize o saldo atual. Ex.: entrada de salário ou outros rendimentos.

## 4 REQUISITOS NÃO-FUNCIONAIS

Esta seção apresenta os requisitos não-funcionais do sistema.

### [RNF001] Usabilidade

- O sistema deve ter interface intuitiva e fácil de usar.
- O sistema deve ser responsivo.

### [RNF002] Desempenho

- Tempo de resposta para operações como registro de despesas e cadastro de categorias deve ser inferior a 2 segundos.
- O sistema deve suportar múltiplos usuários simultâneos sem queda perceptível no desempenho.

### [RNF003] Segurança

- Os dados dos usuários devem ser protegidos com autenticação segura - login com senha e criptografia.
- O sistema deve utilizar práticas seguras para evitar ataques.

### [RNF004] Disponibilidade

- O sistema deve estar disponível pelo menos 99% do tempo - todos os dias da semana, em qualquer horário - para acesso dos usuários.
- Deve haver backup automático periódico para evitar a perda de dados.

### [RNF005] Manutenibilidade e escalabilidade

- O código deve ser bem documentado para facilitar manutenções e futuras expansões.
- A arquitetura do sistema deve permitir a adição de novas funcionalidades sem impactar as já existentes.

## 5 DIAGRAMAS

Esta seção apresenta o fluxograma principal e diagramas de componentes, implantação e entidade-relacionamento, respectivamente.

### 5.1 Fluxograma Principal

![Fluxograma Principal](Fluxograma%20Principal.svg)

O fluxograma principal representa o fluxo de autenticação do usuário, seguido pelas principais funcionalidades: gerenciamento de despesas e receitas, visualização de saldo e geração de relatórios. O diagrama organiza essas funções de forma hierárquica, mostrando as possíveis ações dentro de cada módulo, como adicionar, editar, excluir registros e visualizar os tipos de relatórios.

### 5.2 Diagrama de Componentes

![Diagrama de Componentes](Diagrama%20de%20Componentes.svg)

O diagrama de componentes mostra a arquitetura do sistema, dividida em Frontend (NextJS), Backend e Banco de Dados (PostgreSQL). O Frontend interage com o Backend por meio de rotas da API, que gerenciam autenticação, despesas, receitas e saldo. O Banco de Dados utiliza Prisma ORM para garantir a consistência das transações.

### 5.3 Diagrama de Implantação

![Diagrama de Implantação](Diagrama%20de%20Implantação.svg)

O diagrama de implantação representa a implantação do sistema, onde um cliente acessa a aplicação via navegador web (HTTPS). A aplicação NextJS está hospedada na plataforma Vercel, que processa chamadas API por meio de funções serverless. Essas funções se comunicam com um banco de dados PostgreSQL, executando consultas SQL.

### 5.4 Diagrama Entidade-Relacionamento

![Diagrama Entidade-Relacionamento](Diagrama%20Entidade-Relacionamento.svg)

O diagrama entidade-relacionamento representa o sistema, onde um usuário pode criar despesas e receitas, que pertencem a uma categoria. O usuário também possui um saldo consolidado, que armazena o valor total, mês de referência e totais de receitas e despesas. Cada entidade contém atributos relevantes, como identificadores (UUIDs), valores, datas e descrições.

## 6 VISÃO DA INTERFACE COM OS USUÁRIOS

Esta seção apresenta uma descrição das principais telas do sistema.

### 6.1 Tela de login

Permite que o usuário faça login com email e senha e fornece a opção de se cadastrar, caso ele ainda não seja cadastrado.

### 6.2 Tela de cadastro

Permite que o usuário faça cadastro com nome completo, email e senha e fornece a opção de fazer login, caso ele já seja cadastrado.

### 6.3 Tela de gerenciamento de categorias

Permite criar, editar ou excluir categorias de despesas para melhor organização das suas despesas.

### 6.4 Tela de lançamento de despesas

Permite criar novas despesas com categoria, valor, data da criação, data em que a despesa ocorrerá ou ocorreu e uma descrição opcional.

Possui opções para editar ou excluir uma despesa previamente criada.

### 6.5 Tela de exibição de despesas

Permite a visualização e filtragem de despesas registradas por categoria, período ou valor.

### 6.6 Tela de relatórios

Permite a geração e visualização de um relatório contendo a soma total de despesas por categoria e outro contendo a soma total de despesas por período, com a possibilidade de fazer um comparativo com o período anterior.

### 6.7 Tela de controle de saldo

Permite registrar, editar ou excluir uma receita.

Faz o cálculo automático do saldo disponível.

Permite a visualização do saldo atual e do total de despesas registradas.

## 7 DESCRIÇÃO DO AMBIENTE DE DESENVOLVIMENTO/PRODUÇÃO

Esta seção apresenta detalhes e informações sobre o ambiente de desenvolvimento/produção.

### 7.1 Repositório

O código-fonte do projeto será armazenado e gerenciado em um repositório do GitHub, permitindo controle de versão e colaboração eficiente entre os desenvolvedores.

### 7.2 Ferramentas e Tecnologias

#### 7.2.1 Frontend

O Framework Next.js será utilizado para a construção da interface web, garantindo performance otimizada e SEO aprimorado.

A Biblioteca de Componentes Tailwind CSS será utilizada para estilização eficiente e responsiva.

O Gerenciador de Pacotes pnpm será utilizado para instalação e gerenciamento de dependências do projeto.

#### 7.2.2 Backend

As linguagens utilizadas serão HTML, CSS, Javascript, SQL.

O framework Next.js será utilizado para a criação das APIs serverless que lidam com as operações do sistema.

O ORM Prisma facilitará a comunicação com o banco de dados e garantirá a integridade dos dados.

#### 7.2.3 Banco de Dados

O banco de dados utilizado será o PostgreSQL, escolhido por sua confiabilidade e suporte a operações complexas.

A hospedagem Supabase será utilizada como BaaS para gerenciar o banco de dados.

#### 7.2.4 Ambiente de Desenvolvimento

A IDE utilizada será o VS Code, ambiente principal de desenvolvimento, com várias extensões que podem auxiliar na codificação.

A ferramenta para controle de versão utilizada será o Git/GitHub, para versionamento e colaboração no código.

#### 7.2.5 Ambiente de Produção

A hospedagem do frontend será feita no Vercel, responsável pelo deploy do Next.js, garantindo alta performance e escalabilidade.

O banco de dados Supabase/PostgreSQL será hospedado em nuvem para garantir acessibilidade e backups automáticos.

O monitoramento será feito no Vercel Analytics e Supabase Logs, para acompanhamento da performance e detecção de possíveis falhas.