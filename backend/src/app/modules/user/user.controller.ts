import type { RequestHandler } from 'express';

import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const getMe: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(401, 'You are not authorized.');
  }

  const userId = req.user.userId;
  const result = await UserService.getMe(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully.',
    data: result
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully.',
    data: result
  });
});

const changeRole: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.changeRole(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User role updated successfully.',
    data: result
  });
});

const updateProfile: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(401, 'You are not authorized.');
  }
  const userId = req.user.userId;
  const result = await UserService.updateProfile(userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully.',
    data: result
  });
});

const updateProfileImage: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(401, 'You are not authorized.');
  }
  if (!req.file) {
    throw new AppError(400, 'No image file uploaded.');
  }

  const userId = req.user.userId;
  // Construct the relative path to be saved in DB
  const imagePath = `/uploads/profiles/${req.file.filename}`;
  
  const result = await UserService.updateProfileImage(userId, imagePath);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile image updated successfully.',
    data: result
  });
});

export const UserController = {
  getMe,
  getAllUsers,
  changeRole,
  updateProfile,
  updateProfileImage
};
