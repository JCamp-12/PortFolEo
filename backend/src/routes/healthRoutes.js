import { Router } from 'express';

const router = Router();

router.get('/', (_request, response) => {
  response.json({
    ok: true,
    message: 'Backend connected and ready.'
  });
});

export default router;
