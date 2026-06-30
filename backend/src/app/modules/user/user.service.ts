import fs from 'fs';
import path from 'path';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import type { IChangeRolePayload, IUpdateProfilePayload } from './user.interface';

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      image: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!user) {
    throw new AppError(404, 'User not found.');
  }

  return user;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return users;
};

const changeRole = async (id: string, payload: IChangeRolePayload) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw new AppError(404, 'User not found.');
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { role: payload.role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  return updatedUser;
};

const updateProfile = async (id: string, payload: IUpdateProfilePayload) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw new AppError(404, 'User not found.');
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: payload.name ?? user.name,
      phone: payload.phone ?? user.phone
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      image: true
    }
  });

  return updatedUser;
};

const updateProfileImage = async (id: string, imagePath: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw new AppError(404, 'User not found.');
  }

  // Delete old image if it exists
  if (user.image) {
    // Assuming image is stored as relative path like '/uploads/profiles/profile-123.jpg'
    const absoluteOldPath = path.join(process.cwd(), 'public', user.image);
    if (fs.existsSync(absoluteOldPath)) {
      fs.unlinkSync(absoluteOldPath);
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { image: imagePath },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      image: true
    }
  });

  return updatedUser;
};

export const UserService = {
  getMe,
  getAllUsers,
  changeRole,
  updateProfile,
  updateProfileImage
};
