import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../app.js';

describe('nintendo api', () => {
  it('returns API metadata', async () => {
    const response = await request(app).get('/api');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Unofficial Nintendo Reference API');
    expect(response.body.affiliation).toContain('Not affiliated with Nintendo');
  });

  it('lists demo games', async () => {
    const response = await request(app).get('/api/games');

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(4);
    expect(response.body.results[0]).toMatchObject({
      slug: 'super-mario-bros',
      title: 'Super Mario Bros.',
    });
  });

  it('returns 404 for missing records', async () => {
    const response = await request(app).get('/api/characters/not-real');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('character not found');
  });
});
