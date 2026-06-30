import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import config from '../../config';
import AppError from '../../errors/AppError';
import { sendEmail } from '../../utils/email';
import prisma from '../../utils/prisma';
import type {
  IChangePasswordPayload,
  IForgotPasswordPayload,
  ILoginResponse,
  IResetPasswordPayload,
  IUserLoginPayload,
  IUserRegisterPayload,
  IUserResponse
} from './auth.interface';

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'MANAGER' | 'ADMIN';
};

const sanitizeUser = (user: UserRecord): IUserResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role
});

const register = async (payload: IUserRegisterPayload): Promise<IUserResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  });

  if (existingUser) {
    throw new AppError(409, 'A user with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(payload.password, config.bcryptSaltRounds);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role ?? 'USER'
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  return sanitizeUser(user);
};

const login = async (payload: IUserLoginPayload): Promise<ILoginResponse> => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  });

  if (!user) {
    throw new AppError(401, 'Invalid email or password.');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(401, 'Invalid email or password.');
  }

  const authPayload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  const accessToken = jwt.sign(authPayload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn
  });

  return {
    accessToken,
    user: sanitizeUser(user)
  };
};

const changePassword = async (
  userId: string,
  payload: IChangePasswordPayload
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new AppError(404, 'User not found.');
  }

  const isPasswordMatched = await bcrypt.compare(payload.oldPassword, user.password);

  if (!isPasswordMatched) {
    throw new AppError(403, 'Old password does not match.');
  }

  const newHashedPassword = await bcrypt.hash(payload.newPassword, config.bcryptSaltRounds);

  await prisma.user.update({
    where: { id: userId },
    data: { password: newHashedPassword }
  });
};

const forgotPassword = async (payload: IForgotPasswordPayload): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email }
  });

  if (!user) {
    // We don't throw an error here to prevent email enumeration.
    return;
  }

  // Generate a secure random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token using SHA-256 to store in the DB
  const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  // Set expiration to 15 minutes from now
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetCode: hashedResetToken,
      passwordResetExpires: expiresAt
    }
  });

  // Construct the secure reset link
  const resetLink = `${config.frontendUrl}/reset-password?token=${resetToken}`;

  const emailHtml = `
    <h1>Password Reset Request</h1>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetLink}" target="_blank">Reset Password</a>
    <p>This link will expire in 15 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
  `;

  await sendEmail(user.email, 'Password Reset Link', emailHtml);
};

const resetPassword = async (payload: IResetPasswordPayload): Promise<void> => {
  // Hash the incoming raw token to find it in the DB
  const hashedResetToken = crypto.createHash('sha256').update(payload.token).digest('hex');

  // Find the user with this valid, unexpired token
  const user = await prisma.user.findFirst({
    where: {
      passwordResetCode: hashedResetToken,
      passwordResetExpires: {
        gt: new Date()
      }
    }
  });

  if (!user) {
    throw new AppError(400, 'Invalid or expired reset token.');
  }

  // Token is valid. Hash the new password and clear the reset fields.
  const hashedPassword = await bcrypt.hash(payload.newPassword, config.bcryptSaltRounds);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetCode: null,
      passwordResetExpires: null
    }
  });
};

export const AuthService = {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword
};
