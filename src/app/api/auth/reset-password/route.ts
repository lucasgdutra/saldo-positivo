import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import { PasswordResetService } from '@/services/PasswordResetService';
import { db } from '@/lib/db';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validation = resetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { token, password } = validation.data;

    // Initialize password reset service
    const passwordResetService = new PasswordResetService(db);
    
    // Reset password
    const result = await passwordResetService.resetPassword(token, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: result.message },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in reset password route:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token é obrigatório' },
        { status: 400 }
      );
    }

    // Initialize password reset service
    const passwordResetService = new PasswordResetService(db);
    
    // Validate token
    const result = await passwordResetService.validateToken(token);

    return NextResponse.json(
      { 
        valid: result.valid,
        message: result.message 
      },
      { status: result.valid ? 200 : 400 }
    );
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}