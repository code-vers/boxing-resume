import { z } from 'zod';

const changeRole = z.object({
  body: z
    .object({
      role: z.enum(['USER', 'MANAGER', 'ADMIN'], {
        message: 'Invalid role. Must be USER, MANAGER, or ADMIN.'
      })
    })
    .strict()
});

const updateProfile = z.object({
  body: z
    .object({
      name: z.string().min(2, 'Name must be at least 2 characters long.').optional(),
      phone: z.string().optional()
    })
    .strict()
});

export const UserValidation = {
  changeRole,
  updateProfile
};
