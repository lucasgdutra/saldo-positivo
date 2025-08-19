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
  console.log(`🌱 Starting medium seed (Jan 2024 - Aug 2025)...`);

  // 1. Create/find user
  const hashedPassword = await bcrypt.hash(SEED_USER.password, 10);
  
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
  }

  // Clean existing data
  console.log(`🧹 Cleaning existing data...`);
  await prisma.expense.deleteMany({ where: { userId: user.id } });
  await prisma.revenue.deleteMany({ where: { userId: user.id } });
  await prisma.category.deleteMany({ where: { userId: user.id } });
  await prisma.balance.deleteMany({ where: { userId: user.id } });

  // 2. Create categories
  const categoryNames = [
    'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 
    'Casa & Moradia', 'Investimentos', 'Roupas & Acessórios'
  ];

  const categories: any[] = [];
  for (const categoryName of categoryNames) {
    const category = await prisma.category.create({
      data: {
        name: categoryName,
        userId: user.id,
      },
    });
    categories.push(category);
  }
  console.log(`📂 Created ${categories.length} categories`);

  // 3. Helper functions
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

  // Revenue and expense descriptions
  const revenueDescriptions = [
    'Salário Mensal', 'Freelance', 'Consultoria', 'Venda Online', 'Dividendos', 'Trabalho Extra'
  ];

  const expenseDescriptions = {
    'Alimentação': ['Supermercado', 'Almoço', 'Jantar', 'Delivery'],
    'Transporte': ['Combustível', 'Uber', 'Ônibus', 'Manutenção'],
    'Lazer': ['Cinema', 'Bar', 'Streaming', 'Esportes'],
    'Saúde': ['Consulta', 'Farmácia', 'Exames', 'Dentista'],
    'Casa & Moradia': ['Aluguel', 'Conta de luz', 'Internet', 'Manutenção'],
    'Educação': ['Curso', 'Livros', 'Certificação', 'Material'],
    'Investimentos': ['Ações', 'Tesouro', 'CDB', 'Fundos'],
    'Roupas & Acessórios': ['Roupas', 'Calçados', 'Acessórios', 'Cosméticos']
  };

  // 4. Generate data for Jan 2024 to Aug 2025 (20 months)
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date(2025, 7, 31);
  
  let currentDate = new Date(startDate);
  let totalRevenues = new Decimal(0);
  let totalExpenses = new Decimal(0);

  console.log('📅 Generating 20 months of financial data...');

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    console.log(`📊 Processing ${year}-${(month + 1).toString().padStart(2, '0')}`);

    // Batch arrays for this month
    const monthRevenues = [];
    const monthExpenses = [];

    // Generate revenues (3-4 per month)
    const monthlyRevenuesCount = randomBetween(3, 4);
    for (let i = 0; i < monthlyRevenuesCount; i++) {
      const revenueDate = new Date(year, month, randomBetween(1, 28));
      const baseAmount = i === 0 ? randomBetween(4500, 5500) : randomBetween(300, 800);
      const amount = randomDecimal(baseAmount * 0.9, baseAmount * 1.1);
      const description = i === 0 ? 'Salário Mensal' : revenueDescriptions[randomBetween(1, revenueDescriptions.length - 1)];

      monthRevenues.push({
        amount,
        description,
        date: revenueDate,
        userId: user.id,
      });

      totalRevenues = totalRevenues.plus(amount);
    }

    // Generate small expenses (8-12 per month)
    const smallExpensesCount = randomBetween(8, 12);
    for (let i = 0; i < smallExpensesCount; i++) {
      const expenseDate = new Date(year, month, randomBetween(1, 28));
      const amount = randomDecimal(10, 150);
      const category = getRandomCategory();
      const descriptions = expenseDescriptions[category.name as keyof typeof expenseDescriptions] || ['Despesa'];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];

      monthExpenses.push({
        amount,
        description,
        date: expenseDate,
        userId: user.id,
        categoryId: category.id,
      });

      totalExpenses = totalExpenses.plus(amount);
    }

    // Generate large expenses (3-5 per month)
    const largeExpensesCount = randomBetween(3, 5);
    for (let i = 0; i < largeExpensesCount; i++) {
      const expenseDate = new Date(year, month, randomBetween(1, 28));
      const amount = randomDecimal(200, 1000);
      const category = getRandomCategory();
      const descriptions = expenseDescriptions[category.name as keyof typeof expenseDescriptions] || ['Despesa'];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];

      monthExpenses.push({
        amount,
        description,
        date: expenseDate,
        userId: user.id,
        categoryId: category.id,
      });

      totalExpenses = totalExpenses.plus(amount);
    }

    // Batch insert for this month
    await prisma.revenue.createMany({ data: monthRevenues });
    await prisma.expense.createMany({ data: monthExpenses });

    console.log(`   💰 ${monthRevenues.length} revenues, 💸 ${monthExpenses.length} expenses`);

    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // 5. Create balance
  const currentBalance = totalRevenues.minus(totalExpenses);
  await prisma.balance.create({
    data: {
      totalAmount: currentBalance,
      totalRevenues: totalRevenues,
      totalExpenses: totalExpenses,
      referenceMonth: new Date(),
      userId: user.id,
    },
  });

  console.log('📈 Financial Summary:');
  console.log(`💰 Total Revenues: R$ ${totalRevenues.toString()}`);
  console.log(`💸 Total Expenses: R$ ${totalExpenses.toString()}`);
  console.log(`🏦 Current Balance: R$ ${currentBalance.toString()}`);

  // 6. Trigger balance recalculation
  console.log('🔄 Triggering balance recalculation...');
  try {
    const { default: UserService } = await import('../src/services/UserService');
    const userService = new UserService();
    const recalculatedBalance = await userService.recalculateBalance(user.id);
    console.log(`✅ Balance recalculated: R$ ${recalculatedBalance.totalAmount}`);
  } catch (error) {
    console.warn('⚠️ Balance recalculation failed, but data was inserted');
  }

  // Generate statistics
  const [revenueCount, expenseCount] = await Promise.all([
    prisma.revenue.count({ where: { userId: user.id } }),
    prisma.expense.count({ where: { userId: user.id } })
  ]);

  console.log(`📊 Generated ${revenueCount} revenues and ${expenseCount} expenses across 20 months`);
  console.log(`🗂️  Created ${categories.length} categories`);
  console.log(`🌱 Medium seed completed successfully!`);
  console.log(`👤 Test user: ${SEED_USER.email} / ${SEED_USER.password}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });