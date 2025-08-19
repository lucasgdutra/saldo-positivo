# Screenshots da Aplicação Saldo Positivo

Este diretório contém screenshots da aplicação gerados automaticamente com Playwright para documentação do projeto.

## Como gerar os screenshots

Para gerar ou atualizar os screenshots, execute:

```bash
pnpm test tests/screenshots.spec.ts --project=chromium
```

## Screenshots Disponíveis

### Páginas Principais

#### Homepage
- **homepage-full.png** - Página inicial completa (scroll completo)
- **homepage-hero.png** - Seção hero da página inicial
- **homepage-mobile.png** - Versão mobile da homepage
- **features-section.png** - Seção de recursos da homepage
- **login-form.png** - Formulário de login

#### Autenticação
- **registration-page.png** - Página de cadastro
- **auth-required-state.png** - Estado quando autenticação é necessária

### Dashboard e Funcionalidades (Autenticado)

#### Dashboard Principal
- **dashboard-full.png** - Dashboard completo (scroll completo)
- **dashboard-main.png** - Área principal do dashboard
- **dashboard-mobile.png** - Versão mobile do dashboard

#### Gestão Financeira
- **expenses-page.png** - Página de despesas
- **revenues-page.png** - Página de receitas
- **categories-page.png** - Página de categorias
- **reports-page.png** - Página de relatórios

#### Perfil e Formulários
- **profile-page.png** - Página de perfil do usuário
- **expense-form-modal.png** - Modal/formulário de nova despesa

## Organização dos Screenshots

### Por Funcionalidade

1. **Onboarding e Autenticação**
   - homepage-*.png
   - registration-page.png
   - login-form.png

2. **Dashboard e Visão Geral**
   - dashboard-*.png

3. **Gestão Financeira**
   - expenses-page.png
   - revenues-page.png
   - categories-page.png
   - reports-page.png

4. **Perfil e Configurações**
   - profile-page.png

5. **Estados e Modais**
   - auth-required-state.png
   - expense-form-modal.png

### Por Dispositivo

#### Desktop (1280x800)
- Todos os screenshots exceto os marcados como "mobile"

#### Mobile (375x667)
- homepage-mobile.png
- dashboard-mobile.png

## Uso na Documentação

Estes screenshots podem ser utilizados em:

1. **README.md principal** - Para mostrar a aparência da aplicação
2. **Documentação técnica** - Para ilustrar funcionalidades
3. **Apresentações** - Para demonstrar o projeto
4. **Relatórios acadêmicos** - Para evidenciar o desenvolvimento

## Configurações dos Screenshots

- **Resolução Desktop**: 1280x800px
- **Resolução Mobile**: 375x667px (iPhone SE)
- **Formato**: PNG
- **Qualidade**: Alta resolução para documentação
- **Timeout**: 30 segundos por teste para carregamento completo

## Atualização

Os screenshots são gerados automaticamente pelos testes do Playwright. Para manter a documentação atualizada:

1. Execute os testes sempre que houver mudanças visuais significativas
2. Verifique se todos os screenshots foram gerados corretamente
3. Atualize esta documentação se novos screenshots forem adicionados

## Troubleshooting

Se algum screenshot não for gerado:

1. Verifique se a aplicação está rodando corretamente
2. Confirme se as páginas carregam sem erros
3. Verifique se os seletores nos testes ainda são válidos
4. Execute os testes individualmente para identificar problemas específicos