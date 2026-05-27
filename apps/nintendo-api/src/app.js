import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { characters, games, platforms } from './data/catalog.js';
import { openApiSpec } from './openapi.js';

const app = express();
const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(publicDir));

const apiMeta = {
  name: 'Unofficial Nintendo Reference API',
  status: 'portfolio-prototype',
  affiliation: 'Unofficial. Not affiliated with Nintendo.',
  dataPolicy:
    'V1 uses tiny demo seed data. Future sources should favor publicly available factual metadata and original summaries.',
  images: 'No box art, logos, screenshots, or official artwork are stored in this API.',
};

function sendCollection(response, resourceName, data) {
  response.json({
    ...apiMeta,
    resource: resourceName,
    count: data.length,
    results: data,
  });
}

function sendBySlug(response, resourceName, data, slug) {
  const record = data.find((item) => item.slug === slug);

  if (!record) {
    response.status(404).json({
      ...apiMeta,
      error: `${resourceName} not found`,
      slug,
    });
    return;
  }

  response.json({
    ...apiMeta,
    resource: resourceName,
    result: record,
  });
}

app.get('/api', (request, response) => {
  response.json({
    ...apiMeta,
    endpoints: ['/api/health', '/api/games', '/api/characters', '/api/platforms', '/openapi.json'],
  });
});

app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    message: 'Unofficial Nintendo Reference API is running.',
  });
});

app.get('/api/games', (request, response) => {
  sendCollection(response, 'games', games);
});

app.get('/api/games/:slug', (request, response) => {
  sendBySlug(response, 'game', games, request.params.slug);
});

app.get('/api/characters', (request, response) => {
  sendCollection(response, 'characters', characters);
});

app.get('/api/characters/:slug', (request, response) => {
  sendBySlug(response, 'character', characters, request.params.slug);
});

app.get('/api/platforms', (request, response) => {
  sendCollection(response, 'platforms', platforms);
});

app.get('/openapi.json', (request, response) => {
  response.json(openApiSpec);
});

export default app;
