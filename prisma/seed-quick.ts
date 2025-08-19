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
  console.log(`🌱 Starting quick seed...`);

  // 1. Create detailed test user
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

  // Clean existing data for this user
  console.log(`🧹 Cleaning existing data for user: ${user.email}`);
  await prisma.expense.deleteMany({ where: { userId: user.id } });
  await prisma.revenue.deleteMany({ where: { userId: user.id } });
  await prisma.category.deleteMany({ where: { userId: user.id } });
  await prisma.balance.deleteMany({ where: { userId: user.id } });
  console.log(`✅ Cleaned existing financial data`);

  // 2. Create categories
  const categoryNames = ['Alimentação', 'Transporte', 'Lazer'];
  const categories: any[] = [];
  
  for (const categoryName of categoryNames) {
    const category = await prisma.category.create({
      data: {
        name: categoryName,
        userId: user.id,
      },
    });
    categories.push(category);
    console.log(`📂 Created category: ${categoryName}`);
  }

  // 3. Helper functions
  function randomDecimal(min: number, max: number): Decimal {
    const value = Math.random() * (max - min) + min;
    return new Decimal(Math.round(value * 100) / 100);
  }

  function getRandomCategory() {
    return categories[Math.floor(Math.random() * categories.length)];
  }

  // 4. Generate sample data for current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  let totalRevenues = new Decimal(0);
  let totalExpenses = new Decimal(0);

  console.log('📅 Generating sample financial data...');

  // Create revenues for current month
  const revenueDescriptions = ['Salário Mensal', 'Freelance', 'Consultoria'];
  for (let i = 0; i < 3; i++) {
    const amount = i === 0 ? randomDecimal(4500, 5500) : randomDecimal(200, 800);
    const revenueDate = new Date(currentYear, currentMonth, Math.floor(Math.random() * 28) + 1);
    
    await prisma.revenue.create({
      data: {
        amount,
        description: revenueDescriptions[i],
        date: revenueDate,
        userId: user.id,
      },
    });
    
    totalRevenues = totalRevenues.plus(amount);
    console.log(`💰 Created revenue: ${revenueDescriptions[i]} - R$ ${amount}`);
  }

  // Create expenses for current month
  const expenseDescriptions = {
    'Alimentação': ['Supermercado', 'Almoço executivo', 'Delivery'],
    'Transporte': ['Combustível', 'Uber', 'Ônibus'],
    'Lazer': ['Cinema', 'Bar', 'Streaming']
  };

  // Small expenses
  for (let i = 0; i < 10; i++) {
    const amount = randomDecimal(10, 150);
    const category = getRandomCategory();
    const descriptions = expenseDescriptions[category.name as keyof typeof expenseDescriptions];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const expenseDate = new Date(currentYear, currentMonth, Math.floor(Math.random() * 28) + 1);

    await prisma.expense.create({
      data: {
        amount,
        description,
        date: expenseDate,
        userId: user.id,
        categoryId: category.id,
      },
    });

    totalExpenses = totalExpenses.plus(amount);
    console.log(`💸 Created expense: ${description} - R$ ${amount}`);
  }

  // Large expenses
  for (let i = 0; i < 3; i++) {
    const amount = randomDecimal(200, 800);
    const category = getRandomCategory();
    const descriptions = expenseDescriptions[category.name as keyof typeof expenseDescriptions];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const expenseDate = new Date(currentYear, currentMonth, Math.floor(Math.random() * 28) + 1);

    await prisma.expense.create({
      data: {
        amount,
        description,
        date: expenseDate,
        userId: user.id,
        categoryId: category.id,
      },
    });

    totalExpenses = totalExpenses.plus(amount);
    console.log(`💸 Created large expense: ${description} - R$ ${amount}`);
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
    console.warn(error);
  }

  console.log(`🌱 Quick seed completed successfully!`);
  console.log(`👤 Test user created: ${SEED_USER.email} / ${SEED_USER.password}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });