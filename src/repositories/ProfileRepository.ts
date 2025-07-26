import { PrismaClient, User, Prisma } from '@prisma/client';

type PrismaTransactionClient = any;

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  password?: string;
}

export class ProfileRepository {
  private prisma: PrismaClient | PrismaTransactionClient;

  constructor(prismaInstance: PrismaClient | PrismaTransactionClient) {
    this.prisma = prismaInstance;
  }

  async getProfile(userId: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async updateProfile(userId: string, data: ProfileUpdateData): Promise<Omit<User, 'password'>> {
    const updateData: Prisma.UserUpdateInput = {};
    
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.password !== undefined) updateData.password = data.password;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async checkEmailExists(email: string, excludeUserId?: string): Promise<boolean> {
    const whereClause: Prisma.UserWhereInput = { email };
    
    if (excludeUserId) {
      whereClause.NOT = { id: excludeUserId };
    }

    const user = await this.prisma.user.findFirst({
      where: whereClause,
    });

    return !!user;
  }

  async getProfileStats(userId: string): Promise<{
    totalExpenses: number;
    totalRevenues: number;
    totalCategories: number;
    accountAge: number;
  }> {
    const [expenses, revenues, categories, user] = await Promise.all([
      this.prisma.expense.count({ where: { userId } }),
      this.prisma.revenue.count({ where: { userId } }),
      this.prisma.category.count({ where: { userId } }),
      this.prisma.user.findUnique({ where: { id: userId }, select: { createdAt: true } }),
    ]);

    const accountAge = user ? Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)) : 0;

    return {
      totalExpenses: expenses,
      totalRevenues: revenues,
      totalCategories: categories,
      accountAge,
    };
  }
}