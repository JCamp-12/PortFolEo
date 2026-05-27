import request from 'supertest';
import { describe, expect, test } from 'vitest';
import app from '../app.js';

describe('project routes', () => {
  test('returns the sample projects list', async () => {
    const response = await request(app).get('/api/projects');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    expect(response.body[0].slug).toBe('signal-stack');
  });

  test('returns one project by slug', async () => {
    const response = await request(app).get('/api/projects/field-notes');

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Field Notes');
  });
});
