import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library'; // Import Decimal
import bcrypt from 'bcrypt'; // Para hashear a senha

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // 1. Criar um usuário de exemplo
  const hashedPassword = await bcrypt.hash('password123', 10); // Hashear a senha
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });
  console.log(`Created user with id: ${user.id}`);

  // 2. Criar categorias de exemplo para o usuário
  // Assumindo uma constraint unique composta @@unique([name, userId]) no model Category
  // Se não existir, ajuste ou use .create()
  // Verificar/criar categorias individualmente
  async function findOrCreateCategory(name: string, userId: string) {
    let category = await prisma.category.findFirst({
      where: { name, userId },
    });
    if (!category) {
      category = await prisma.category.create({
        data: { name, userId },
      });
      console.log(`Created category: ${name}`);
    } else {
      console.log(`Found category: ${name}`);
    }
    return category;
  }

  const category1 = await findOrCreateCategory('Alimentação', user.id);
  const category2 = await findOrCreateCategory('Transporte', user.id);
  const category3 = await findOrCreateCategory('Lazer', user.id);

  // 3. Criar despesas de exemplo
  await prisma.expense.create({
    data: {
      amount: new Decimal(50.75),
      description: 'Almoço executivo',
      date: new Date(2025, 4, 1), // Ano, Mês (0-indexado), Dia
      userId: user.id,
      categoryId: category1.id,
    },
  });
  await prisma.expense.create({
    data: {
      amount: new Decimal(120.00),
      description: 'Supermercado',
      date: new Date(2025, 4, 3),
      userId: user.id,
      categoryId: category1.id,
    },
  });
  await prisma.expense.create({
    data: {
      amount: new Decimal(35.50),
      description: 'Aplicativo de transporte',
      date: new Date(2025, 4, 2),
      userId: user.id,
      categoryId: category2.id,
    },
  });
  await prisma.expense.create({
    data: {
      amount: new Decimal(80.00),
      description: 'Cinema',
      date: new Date(2025, 4, 4),
      userId: user.id,
      categoryId: category3.id,
    },
  });
  console.log(`Created sample expenses.`);

  // 4. Criar receitas de exemplo
  await prisma.revenue.create({
    data: {
      amount: new Decimal(5000.00),
      description: 'Salário Maio',
      date: new Date(2025, 4, 5),
      userId: user.id,
    },
  });
  await prisma.revenue.create({
    data: {
      amount: new Decimal(300.00),
      description: 'Freelance Website',
      date: new Date(2025, 4, 10),
      userId: user.id,
    },
  });
  console.log(`Created sample revenues.`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });