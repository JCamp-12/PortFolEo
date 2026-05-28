import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.js';

let prismaClient;

export function getPrismaClient() {
  if (!prismaClient) {
    if (!env.databaseUrl) {
      throw new Error('DATABASE_URL is not configured.');
    }

    const adapter = new PrismaPg({
      connectionString: env.databaseUrl
    });

    prismaClient = new PrismaClient({ adapter });
  }

  return prismaClient;
}
