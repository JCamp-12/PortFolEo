export const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'Unofficial Nintendo Reference API',
    version: '0.1.0',
    description:
      'Portfolio project for practicing API design with publicly available reference-style metadata. Not affiliated with Nintendo.',
  },
  servers: [{ url: 'http://localhost:4100' }],
  paths: {
    '/api/health': {
      get: {
        summary: 'Check API health',
        responses: {
          200: {
            description: 'API status',
          },
        },
      },
    },
    '/api/games': {
      get: {
        summary: 'List games',
        responses: {
          200: {
            description: 'Game collection',
          },
        },
      },
    },
    '/api/games/{slug}': {
      get: {
        summary: 'Get a game by slug',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Game detail',
          },
          404: {
            description: 'Game not found',
          },
        },
      },
    },
    '/api/characters': {
      get: {
        summary: 'List characters',
        responses: {
          200: {
            description: 'Character collection',
          },
        },
      },
    },
    '/api/characters/{slug}': {
      get: {
        summary: 'Get a character by slug',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Character detail',
          },
          404: {
            description: 'Character not found',
          },
        },
      },
    },
    '/api/platforms': {
      get: {
        summary: 'List platforms',
        responses: {
          200: {
            description: 'Platform collection',
          },
        },
      },
    },
  },
};
