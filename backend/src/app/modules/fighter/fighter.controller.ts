import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FighterService } from './fighter.service';

const createFighter = catchAsync(async (req: Request, res: Response) => {
  const result = await FighterService.createFighter(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Fighter created successfully',
    data: result,
  });
});

const getAllFighters = catchAsync(async (req: Request, res: Response) => {
  const result = await FighterService.getAllFighters(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fighters fetched successfully',
    data: result,
  });
});

const getSingleFighter = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await FighterService.getSingleFighter(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fighter fetched successfully',
    data: result,
  });
});

const updateFighter = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await FighterService.updateFighter(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fighter updated successfully',
    data: result,
  });
});

const deleteFighter = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await FighterService.deleteFighter(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fighter deleted successfully',
    data: result,
  });
});

export const FighterController = {
  createFighter,
  getAllFighters,
  getSingleFighter,
  updateFighter,
  deleteFighter
};
