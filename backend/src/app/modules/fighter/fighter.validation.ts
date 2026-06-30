import { z } from 'zod';

const createFighter = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    nickname: z.string().optional(),
    image: z.string().optional(),
    nationality: z.string().optional(),
    birthDate: z.string().datetime().optional(),
    division: z.string().min(1, 'Division is required'),
    stance: z.enum(['ORTHODOX', 'SOUTHPAW', 'SWITCH']).optional(),
    height: z.string().optional(),
    reach: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'RETIRED']).optional(),
  })
});

const updateFighter = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    nickname: z.string().optional(),
    image: z.string().optional(),
    nationality: z.string().optional(),
    birthDate: z.string().datetime().optional(),
    division: z.string().optional(),
    stance: z.enum(['ORTHODOX', 'SOUTHPAW', 'SWITCH']).optional(),
    height: z.string().optional(),
    reach: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'RETIRED']).optional(),
  })
});

export const FighterValidation = {
  createFighter,
  updateFighter
};
