export const games = [
  {
    id: 1,
    slug: 'super-mario-bros',
    title: 'Super Mario Bros.',
    franchise: 'Mario',
    releaseYear: 1985,
    platforms: ['NES'],
    genres: ['Platformer'],
    characters: ['mario', 'luigi'],
    sourceStatus: 'Demo seed data; source policy not finalized.',
  },
  {
    id: 2,
    slug: 'super-mario-bros-2',
    title: 'Super Mario Bros. 2',
    franchise: 'Mario',
    releaseYear: 1988,
    platforms: ['NES'],
    genres: ['Platformer'],
    characters: ['mario', 'luigi'],
    sourceStatus: 'Demo seed data; source policy not finalized.',
  },
  {
    id: 3,
    slug: 'super-mario-bros-3',
    title: 'Super Mario Bros. 3',
    franchise: 'Mario',
    releaseYear: 1988,
    platforms: ['NES'],
    genres: ['Platformer'],
    characters: ['mario', 'luigi'],
    sourceStatus: 'Demo seed data; source policy not finalized.',
  },
  {
    id: 4,
    slug: 'super-mario-64',
    title: 'Super Mario 64',
    franchise: 'Mario',
    releaseYear: 1996,
    platforms: ['Nintendo 64'],
    genres: ['3D platformer'],
    characters: ['mario'],
    sourceStatus: 'Demo seed data; source policy not finalized.',
  },
];

export const characters = [
  {
    id: 1,
    slug: 'mario',
    name: 'Mario',
    franchise: 'Mario',
    firstKnownGame: 'Donkey Kong',
    gameAppearances: ['super-mario-bros', 'super-mario-bros-2', 'super-mario-bros-3', 'super-mario-64'],
    sourceStatus: 'Demo seed data; source policy not finalized.',
  },
  {
    id: 2,
    slug: 'luigi',
    name: 'Luigi',
    franchise: 'Mario',
    firstKnownGame: 'Mario Bros.',
    gameAppearances: ['super-mario-bros', 'super-mario-bros-2', 'super-mario-bros-3'],
    sourceStatus: 'Demo seed data; source policy not finalized.',
  },
];

export const platforms = [
  {
    id: 1,
    slug: 'nes',
    name: 'Nintendo Entertainment System',
    shortName: 'NES',
    releaseYear: 1983,
  },
  {
    id: 2,
    slug: 'nintendo-64',
    name: 'Nintendo 64',
    shortName: 'N64',
    releaseYear: 1996,
  },
];
