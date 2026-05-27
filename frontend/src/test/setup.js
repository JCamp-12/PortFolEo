import '@testing-library/jest-dom';
import { projects } from '../../../shared/projects.js';

global.fetch = (url, options = {}) => {
  if (url === '/api/health') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Backend connected and ready.' })
    });
  }

  if (url === '/api/projects') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(projects)
    });
  }

  if (url === '/api/contact') {
    const payload = JSON.parse(options.body);
    const isUnsafe = payload.name.includes('<');

    return Promise.resolve({
      ok: !isUnsafe,
      json: () =>
        Promise.resolve(
          isUnsafe
            ? {
                message: 'Please fix the highlighted fields and try again.',
                errors: { name: 'Name can only use letters, numbers, spaces, and basic email-safe symbols.' }
              }
            : {
                message: `Thanks, ${payload.name}. Your note is ready for future storage.`
              }
        )
    });
  }

  return Promise.reject(new Error(`Unhandled fetch request: ${url}`));
};
