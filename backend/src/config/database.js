import { getPrismaClient } from '../lib/prisma.js';
import { env } from './env.js';

export async function connectDatabase() {
  if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is not configured.');
  }

  await getPrismaClient().$connect();
  console.log('PostgreSQL connected through Prisma.');
}

export async function disconnectDatabase() {
  await getPrismaClient().$disconnect();
}
