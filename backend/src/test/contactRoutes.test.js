import request from 'supertest';
import { describe, expect, test } from 'vitest';
import app from '../app.js';

describe('contact routes', () => {
  test('accepts a valid contact payload', async () => {
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
  });
});
