import bcrypt from 'bcryptjs';

import config from '../src/app/config';
import { logger } from '../src/app/utils/logger';
import prisma from '../src/app/utils/prisma';

async function main() {
  logger.info('Start seeding...');

  const adminEmail = config.admin.email;
  const adminPassword = config.admin.password;

  const hashedPassword = await bcrypt.hash(adminPassword, config.bcryptSaltRounds);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name: 'System Admin'
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      name: 'System Admin'
    }
  });

  logger.info(`Admin user ensured in database: ${adminUser.email}`);

  // Seed fighters if empty
  const count = await prisma.fighter.count();
  if (count === 0) {
    logger.info('Seeding fighters...');
    const fightersData = [
      {
        firstName: "Canelo",
        lastName: "Alvarez",
        nickname: "Saul",
        division: "Super Middleweight",
        stance: "ORTHODOX" as const,
        wins: 60,
        losses: 2,
        draws: 2,
        koRate: 65,
        status: "ACTIVE" as const,
        nationality: "Mexico"
      },
      {
        firstName: "Tyson",
        lastName: "Fury",
        nickname: "The Gypsy King",
        division: "Heavyweight",
        stance: "ORTHODOX" as const,
        wins: 34,
        losses: 1,
        draws: 1,
        koRate: 70,
        status: "ACTIVE" as const,
        nationality: "United Kingdom"
      },
      {
        firstName: "Oleksandr",
        lastName: "Usyk",
        nickname: "The Cat",
        division: "Heavyweight",
        stance: "SOUTHPAW" as const,
        wins: 22,
        losses: 0,
        draws: 0,
        koRate: 64,
        status: "ACTIVE" as const,
        nationality: "Ukraine"
      },
      {
        firstName: "Terence",
        lastName: "Crawford",
        nickname: "Bud",
        division: "Welterweight",
        stance: "SWITCH" as const,
        wins: 40,
        losses: 0,
        draws: 0,
        koRate: 77.5,
        status: "ACTIVE" as const,
        nationality: "United States"
      },
      {
        firstName: "Naoya",
        lastName: "Inoue",
        nickname: "Monster",
        division: "Super Bantamweight",
        stance: "ORTHODOX" as const,
        wins: 26,
        losses: 0,
        draws: 0,
        koRate: 88,
        status: "ACTIVE" as const,
        nationality: "Japan"
      }
    ];

    for (const fighter of fightersData) {
      await prisma.fighter.create({
        data: fighter
      });
    }
    logger.info('Fighters seeded.');
  }

  logger.info('Seeding finished.');
}

main()
  .catch((e) => {
    logger.error('Error during seeding', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
