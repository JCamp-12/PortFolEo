import { beforeEach, describe, expect, test, vi } from 'vitest';
import request from 'supertest';

const prismaMock = vi.hoisted(() => ({
  contactMessage: {
    create: vi.fn()
  }
}));

vi.mock('../lib/prisma.js', () => ({
  getPrismaClient: () => prismaMock
}));

import app from '../app.js';

describe('contact routes', () => {
  beforeEach(() => {
    prismaMock.contactMessage.create.mockReset();
  });

  test('accepts a valid contact payload', async () => {
    prismaMock.contactMessage.create.mockResolvedValue({
      id: 1,
      name: 'Jason Campbell',
      email: 'jason@campbell.dev',
      message: 'Portfolio update request',
      createdAt: new Date('2026-05-28T00:00:00.000Z')
    });

    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Jason Campbell',
        email: 'jason@campbell.dev',
        message: 'Portfolio update request'
      });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.contact.name).toBe('Jason Campbell');
    expect(response.body.message).toMatch(/has been saved/i);
    expect(prismaMock.contactMessage.create).toHaveBeenCalledWith({
      data: {
        name: 'Jason Campbell',
        email: 'jason@campbell.dev',
        message: 'Portfolio update request'
      }
    });
  });

  test('rejects unsafe characters', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: '<script>',
        email: 'bad@email.com',
        message: 'Hello'
      });

    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.errors.name).toMatch(/letters, numbers/i);
    expect(prismaMock.contactMessage.create).not.toHaveBeenCalled();
  });

  test('returns a server error when persistence fails', async () => {
    prismaMock.contactMessage.create.mockRejectedValue(new Error('db unavailable'));

    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Jason Campbell',
        email: 'jason@campbell.dev',
        message: 'Portfolio update request'
      });

    expect(response.status).toBe(500);
    expect(response.body.ok).toBe(false);
    expect(response.body.message).toMatch(/could not save/i);
  });
});
