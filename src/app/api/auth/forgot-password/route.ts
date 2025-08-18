import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import { PasswordResetService } from '@/services/PasswordResetService';
import { db } from '@/lib/db';

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validation = forgotPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'E-mail inválido', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Initialize password reset service
    const passwordResetService = new PasswordResetService(db);
    
    // Request password reset
    const result = await passwordResetService.requestPasswordReset(email);

    return NextResponse.json(
      { message: result.message },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in forgot password route:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}