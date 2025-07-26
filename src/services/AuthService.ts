import { hash } from "bcrypt";
import * as z from "zod";
import { UserRepository } from "@/repositories/UserRepository";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { User } from "@prisma/client"; // Assumindo que o tipo User vem do Prisma

// Schema de validação movido para o Service
const userSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  name: z.string().min(1, "Nome é obrigatório"),
  salaryRange: z.string().min(1, "Faixa salarial é obrigatória"),
  usageMotivation: z.string().min(1, "Motivo de uso é obrigatório"),
  customMotivation: z.string().optional(),
  financialGoals: z.string().optional(),
  hasDebts: z.boolean().optional(),
  monthlyIncome: z.string().optional(),
  familySize: z.coerce.number().min(1, "Tamanho da família deve ser pelo menos 1").optional(),
  financialExperience: z.string().optional(),
}).refine(
  (data) => {
    if (data.usageMotivation === "outro" && !data.customMotivation) {
      return false;
    }
    return true;
  },
  {
    message: "Especifique o motivo personalizado",
    path: ["customMotivation"],
  }
);

// Tipo para os dados de entrada do registro
type RegisterUserData = z.infer<typeof userSchema>;

// Lista de categorias padrão movida para o Service
const DEFAULT_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Educação",
  "Saúde",
  "Lazer",
  "Vestuário",
  "Utilidades",
  "Outros"
];

// Erro customizado para usuário já existente
export class UserAlreadyExistsError extends Error {
  constructor(message = "E-mail já cadastrado") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository
  ) {}

  // Função para criar categorias padrão movida e adaptada para o Service
  private async createDefaultCategories(userId: string): Promise<void> {
    const categoriesData = DEFAULT_CATEGORIES.map(name => ({
      name,
      userId
    }));

    // Utiliza o CategoryRepository injetado para criar cada categoria individualmente
    for (const categoryData of categoriesData) {
      await this.categoryRepository.create(categoryData);
    }
  }

  async register(data: RegisterUserData): Promise<Omit<User, 'password'>> {
    // 1. Validar os dados de entrada
    const validatedData = userSchema.parse(data);
    const { 
      email, 
      password, 
      name, 
      salaryRange, 
      usageMotivation, 
      customMotivation, 
      financialGoals, 
      hasDebts, 
      monthlyIncome, 
      familySize, 
      financialExperience 
    } = validatedData;

    // 2. Verificar se o usuário já existe usando UserRepository
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsError(); // Lança erro específico
    }

    // 3. Criar hash da senha
    const hashedPassword = await hash(password, 10);

    // 4. Criar usuário usando UserRepository
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      salaryRange,
      usageMotivation,
      customMotivation,
      financialGoals,
      hasDebts,
      monthlyIncome,
      familySize,
      financialExperience,
    });

    // 5. Criar categorias padrão para o novo usuário
    try {
      await this.createDefaultCategories(user.id);
    } catch (error) {
      // Log do erro na criação de categorias, mas não impede o registro
      console.error(`Erro ao criar categorias padrão para o usuário ${user.id}:`, error);
      // Poderia adicionar uma lógica de compensação aqui se necessário,
      // como marcar o usuário para tentar criar as categorias depois.
    }

    // 6. Criar balance inicial para o novo usuário
    try {
      await this.userRepository.upsertBalance(user.id, {
        totalAmount: 0,
        totalRevenues: 0,
        totalExpenses: 0,
        referenceMonth: new Date(),
      });
      console.log(`Balance inicial criado para o usuário ${user.id}`);
    } catch (error) {
      // Log do erro na criação do balance, mas não impede o registro
      console.error(`Erro ao criar balance inicial para o usuário ${user.id}:`, error);
    }


    // 7. Retornar usuário sem a senha
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}