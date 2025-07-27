import { randomBytes } from 'crypto';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { PrismaClientWithExtensions } from '@/lib/db';

export class PasswordResetService {
  constructor(private prisma: PrismaClientWithExtensions) {}

  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Find user by email
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Don't reveal if email exists for security reasons
        return {
          success: true,
          message: 'Se o e-mail existir em nossa base, você receberá instruções para redefinir sua senha.',
        };
      }

      // Generate secure random token
      const token = randomBytes(32).toString('hex');
      
      // Set expiration for 1 hour from now
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      // Invalidate any existing tokens for this user
      await this.prisma.passwordResetToken.updateMany({
        where: {
          userId: user.id,
          used: false,
        },
        data: {
          used: true,
        },
      });

      // Create new password reset token
      await this.prisma.passwordResetToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt,
        },
      });

      // Send password reset email
      const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/redefinir-senha?token=${token}`;
      
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Redefinir senha - Saldo Positivo',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Redefinir Senha</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2563eb; margin-bottom: 10px;">Saldo Positivo</h1>
                <h2 style="color: #374151; font-size: 24px;">Redefinir sua senha</h2>
              </div>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p>Olá <strong>${user.name}</strong>,</p>
                <p>Você solicitou a redefinição da sua senha. Clique no botão abaixo para criar uma nova senha:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" 
                     style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                    Redefinir Senha
                  </a>
                </div>
                
                <p>Ou copie e cole o link abaixo no seu navegador:</p>
                <p style="word-break: break-all; background-color: #e5e7eb; padding: 10px; border-radius: 4px; font-family: monospace;">
                  ${resetUrl}
                </p>
              </div>
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #6b7280; font-size: 14px;">
                <p><strong>Importante:</strong></p>
                <ul>
                  <li>Este link é válido por <strong>1 hora</strong></li>
                  <li>Após usar este link, ele se tornará inválido</li>
                  <li>Se você não solicitou esta alteração, ignore este e-mail</li>
                </ul>
                
                <p style="margin-top: 20px;">
                  Atenciosamente,<br>
                  <strong>Equipe Saldo Positivo</strong>
                </p>
              </div>
            </body>
          </html>
        `,
      });

      console.log(`Password reset email sent to ${email}`);

      return {
        success: true,
        message: 'Se o e-mail existir em nossa base, você receberá instruções para redefinir sua senha.',
      };
    } catch (error) {
      console.error('Error in password reset request:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  async validateToken(token: string): Promise<{ valid: boolean; userId?: string; message: string }> {
    try {
      const resetToken = await this.prisma.passwordResetToken.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!resetToken) {
        return {
          valid: false,
          message: 'Token inválido',
        };
      }

      if (resetToken.used) {
        return {
          valid: false,
          message: 'Este token já foi utilizado',
        };
      }

      if (new Date() > resetToken.expiresAt) {
        return {
          valid: false,
          message: 'Token expirado',
        };
      }

      return {
        valid: true,
        userId: resetToken.userId,
        message: 'Token válido',
      };
    } catch (error) {
      console.error('Error validating token:', error);
      return {
        valid: false,
        message: 'Erro ao validar token',
      };
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      // Validate token first
      const tokenValidation = await this.validateToken(token);
      
      if (!tokenValidation.valid || !tokenValidation.userId) {
        return {
          success: false,
          message: tokenValidation.message,
        };
      }

      // Hash the new password
      const bcrypt = await import('bcrypt');
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update user password and mark token as used
      await this.prisma.$transaction([
        this.prisma.user.update({
          where: { id: tokenValidation.userId },
          data: { password: hashedPassword },
        }),
        this.prisma.passwordResetToken.update({
          where: { token },
          data: { used: true },
        }),
      ]);

      console.log(`Password reset successful for user ${tokenValidation.userId}`);

      return {
        success: true,
        message: 'Senha redefinida com sucesso',
      };
    } catch (error) {
      console.error('Error resetting password:', error);
      return {
        success: false,
        message: 'Erro ao redefinir senha',
      };
    }
  }
}