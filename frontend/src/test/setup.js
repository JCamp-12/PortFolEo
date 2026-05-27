import '@testing-library/jest-dom';

global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Backend connected and ready.' })
  });
