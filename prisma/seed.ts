import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Seed user credentials (for testing)
export const SEED_USER = {
  email: 'test.user@saldopositivo.com',
  password: 'TestPassword123!',
  name: 'João Silva Santos'
};

async function main() {
  console.log(`🌱 Starting comprehensive seed...`);

  // 1. Create detailed test user
  const hashedPassword = await bcrypt.hash(SEED_USER.password, 10);
  
  // First, try to find an existing user, if not create the test user
  let user = await prisma.user.findFirst({
    where: { email: SEED_USER.email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: SEED_USER.email,
        name: SEED_USER.name,
        password: hashedPassword,
        salaryRange: '5000-10000',
        usageMotivation: 'Controle financeiro pessoal',
        customMotivation: 'Quero alcançar independência financeira e fazer melhores investimentos',
        financialGoals: 'Economizar 30% da renda mensal, quitar dívidas em 2 anos, criar reserva de emergência',
        hasDebts: true,
        familySize: 3,
        financialExperience: 'Intermediário',
      },
    });
    console.log(`✅ Created new user: ${user.name} (${user.email})`);
  } else {
    console.log(`✅ Found existing user: ${user.name} (${user.email})`);
    
    // Update user with additional profile data if needed
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        salaryRange: '5000-10000',
        usageMotivation: 'Controle financeiro pessoal',
        customMotivation: 'Quero alcançar independência financeira e fazer melhores investimentos',
        financialGoals: 'Economizar 30% da renda mensal, quitar dívidas em 2 anos, criar reserva de emergência',
        hasDebts: true,
        familySize: 3,
        financialExperience: 'Intermediário',
      }
    });
    console.log(`✅ Updated user profile: ${user.name}`);
  }

  // Clean existing data for this user to avoid duplicates
  console.log(`🧹 Cleaning existing data for user: ${user.email}`);
  await prisma.expense.deleteMany({ where: { userId: user.id } });
  await prisma.revenue.deleteMany({ where: { userId: user.id } });
  await prisma.category.deleteMany({ where: { userId: user.id } });
  console.log(`✅ Cleaned existing financial data`);

  // 2. Create comprehensive expense categories
  const categoryNames = [
    'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 
    'Casa & Moradia', 'Investimentos', 'Roupas & Acessórios',
    'Tecnologia', 'Viagens', 'Presente & Doações', 'Serviços Financeiros'
  ];

  const categories: any[] = [];
  for (const categoryName of categoryNames) {
    // Try to find existing category first
    let category = await prisma.category.findFirst({
      where: {
        name: categoryName,
        userId: user.id
      }
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          userId: user.id,
        },
      });
      console.log(`📂 Created category: ${categoryName}`);
    } else {
      console.log(`📂 Found existing category: ${categoryName}`);
    }
    
    categories.push(category);
  }

  // 3. Helper functions for generating realistic data
  function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomDecimal(min: number, max: number): Decimal {
    const value = Math.random() * (max - min) + min;
    return new Decimal(Math.round(value * 100) / 100);
  }

  function getRandomCategory() {
    return categories[Math.floor(Math.random() * categories.length)];
  }

  // Revenue descriptions by type
  const revenueDescriptions = [
    'Salário Mensal',
    'Freelance - Desenvolvimento Web',
    'Consultoria',
    'Venda de Produtos Online',
    'Aluguel de Imóvel',
    'Dividendos de Investimentos',
    'Trabalho Extra',
    'Cashback e Recompensas'
  ];

  // Expense descriptions by category
  const expenseDescriptions = {
    'Alimentação': [
      'Supermercado', 'Almoço executivo', 'Jantar restaurante', 'Café da manhã',
      'Lanche da tarde', 'Delivery comida', 'Feira livre', 'Padaria',
      'Fast food', 'Mercado orgânico', 'Açougue', 'Hortifruti'
    ],
    'Transporte': [
      'Combustível', 'Uber/99', 'Ônibus/Metro', 'Estacionamento',
      'Manutenção veículo', 'IPVA', 'Seguro veículo', 'Pedágio',
      'Lavagem carro', 'Taxi', 'Aluguel bicicleta'
    ],
    'Lazer': [
      'Cinema', 'Teatro', 'Show/Concerto', 'Bar/Balada', 'Parque diversões',
      'Streaming (Netflix, etc)', 'Jogos', 'Livros', 'Revista/Jornal',
      'Hobby', 'Esportes', 'Academia'
    ],
    'Saúde': [
      'Consulta médica', 'Exames', 'Farmácia/Medicamentos', 'Dentista',
      'Plano de saúde', 'Fisioterapia', 'Psicólogo', 'Óculoseria',
      'Suplementos', 'Massagem', 'Check-up'
    ],
    'Casa & Moradia': [
      'Aluguel', 'Condomínio', 'Luz', 'Água', 'Gás', 'Internet',
      'Telefone', 'Manutenção casa', 'Móveis', 'Decoração',
      'Material de limpeza', 'IPTU'
    ],
    'Educação': [
      'Mensalidade escola/faculdade', 'Curso online', 'Livros didáticos',
      'Material escolar', 'Curso de idiomas', 'Certificação',
      'Workshop/Palestra', 'E-learning'
    ]
  };

  // 4. Generate monthly data from January 2024 to August 2025
  const startDate = new Date(2024, 0, 1); // January 2024
  const endDate = new Date(2025, 7, 31);  // August 2025
  
  let currentDate = new Date(startDate);
  let totalRevenues = new Decimal(0);
  let totalExpenses = new Decimal(0);

  console.log('📅 Generating monthly financial data...');

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    console.log(`📊 Processing ${year}-${(month + 1).toString().padStart(2, '0')}`);

    // Generate 3-5 revenues per month (~5000 total)
    const monthlyRevenues = randomBetween(3, 5);
    let monthlyRevenueTotal = new Decimal(0);

    for (let i = 0; i < monthlyRevenues; i++) {
      const revenueDate = new Date(year, month, randomBetween(1, 28));
      const baseAmount = i === 0 ? randomBetween(4500, 5500) : randomBetween(200, 800); // First is salary
      const amount = randomDecimal(baseAmount * 0.9, baseAmount * 1.1);
      const description = i === 0 ? 'Salário Mensal' : revenueDescriptions[randomBetween(1, revenueDescriptions.length - 1)];

      await prisma.revenue.create({
        data: {
          amount,
          description,
          date: revenueDate,
          userId: user.id,
        },
      });

      monthlyRevenueTotal = monthlyRevenueTotal.plus(amount);
      totalRevenues = totalRevenues.plus(amount);
    }

    // Generate small expenses (30 expenses, 2-150 each)
    const smallExpensesCount = randomBetween(28, 32);
    let monthlyExpenseTotal = new Decimal(0);

    for (let i = 0; i < smallExpensesCount; i++) {
      const expenseDate = new Date(year, month, randomBetween(1, 28));
      const amount = randomDecimal(2, 150);
      const category = getRandomCategory();
      const descriptions = expenseDescriptions[category.name as keyof typeof expenseDescriptions] || ['Despesa diversa'];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];

      await prisma.expense.create({
        data: {
          amount,
          description,
          date: expenseDate,
          userId: user.id,
          categoryId: category.id,
        },
      });

      monthlyExpenseTotal = monthlyExpenseTotal.plus(amount);
      totalExpenses = totalExpenses.plus(amount);
    }

    // Generate larger expenses (5-15 expenses, 150-1500 each)
    const largeExpensesCount = randomBetween(5, 15);

    for (let i = 0; i < largeExpensesCount; i++) {
      const expenseDate = new Date(year, month, randomBetween(1, 28));
      const amount = randomDecimal(150, 1500);
      const category = getRandomCategory();
      const descriptions = expenseDescriptions[category.name as keyof typeof expenseDescriptions] || ['Despesa importante'];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];

      await prisma.expense.create({
        data: {
          amount,
          description,
          date: expenseDate,
          userId: user.id,
          categoryId: category.id,
        },
      });

      monthlyExpenseTotal = monthlyExpenseTotal.plus(amount);
      totalExpenses = totalExpenses.plus(amount);
    }

    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // 5. Create/Update user balance and trigger recalculation
  const currentBalance = totalRevenues.minus(totalExpenses);
  await prisma.balance.upsert({
    where: { userId: user.id },
    update: {
      totalAmount: currentBalance,
      totalRevenues: totalRevenues,
      totalExpenses: totalExpenses,
      referenceMonth: new Date(),
    },
    create: {
      totalAmount: currentBalance,
      totalRevenues: totalRevenues,
      totalExpenses: totalExpenses,
      referenceMonth: new Date(),
      userId: user.id,
    },
  });

  // 6. Trigger balance recalculation using the UserService
  console.log('🔄 Triggering balance recalculation...');
  try {
    const { default: UserService } = await import('../src/services/UserService');
    const userService = new UserService();
    const recalculatedBalance = await userService.recalculateBalance(user.id);
    console.log(`✅ Balance recalculated: R$ ${recalculatedBalance.totalAmount}`);
  } catch (error) {
    console.warn('⚠️ Balance recalculation failed, but data was inserted:', error);
  }

  console.log('📈 Financial Summary:');
  console.log(`💰 Total Revenues: R$ ${totalRevenues.toString()}`);
  console.log(`💸 Total Expenses: R$ ${totalExpenses.toString()}`);
  console.log(`🏦 Current Balance: R$ ${currentBalance.toString()}`);

  // Generate some statistics
  const totalTransactions = await prisma.$transaction([
    prisma.revenue.count({ where: { userId: user.id } }),
    prisma.expense.count({ where: { userId: user.id } }),
  ]);

  console.log(`📊 Generated ${totalTransactions[0]} revenues and ${totalTransactions[1]} expenses`);
  console.log(`🗂️  Created ${categories.length} categories`);
  console.log(`🌱 Seeding completed successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });