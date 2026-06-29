import prisma from '../../utils/prisma';
import { Prisma } from '@prisma/client';

const createFighter = async (payload: Prisma.FighterCreateInput) => {
  const result = await prisma.fighter.create({
    data: payload,
  });
  return result;
};

const getAllFighters = async (filters: any) => {
  const { search, division, status } = filters;
  
  const andConditions: Prisma.FighterWhereInput[] = [];
  
  if (search) {
    andConditions.push({
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { nickname: { contains: search, mode: 'insensitive' } },
      ],
    });
  }

  if (division && division !== 'all') {
    andConditions.push({ division });
  }

  if (status && status !== 'all') {
    andConditions.push({ status: status.toUpperCase() as any });
  }

  const whereConditions: Prisma.FighterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.fighter.findMany({
    where: whereConditions,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const getSingleFighter = async (id: string) => {
  const result = await prisma.fighter.findUnique({
    where: { id },
    include: {
      titleHistory: {
        include: { title: true }
      },
      matchesWon: true,
      matchesLost: true,
    }
  });
  return result;
};

const updateFighter = async (id: string, payload: Prisma.FighterUpdateInput) => {
  const result = await prisma.fighter.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteFighter = async (id: string) => {
  const result = await prisma.fighter.delete({
    where: { id },
  });
  return result;
};

export const FighterService = {
  createFighter,
  getAllFighters,
  getSingleFighter,
  updateFighter,
  deleteFighter
};
