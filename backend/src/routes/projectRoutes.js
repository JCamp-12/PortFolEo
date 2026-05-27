import { Router } from 'express';
import { projects } from '../../../shared/projects.js';

const router = Router();

router.get('/', (_request, response) => {
  response.json(projects);
});

router.get('/:slug', (request, response) => {
  const project = projects.find((item) => item.slug === request.params.slug);

  if (!project) {
    response.status(404).json({ message: 'Project not found.' });
    return;
  }

  response.json(project);
});

export default router;
