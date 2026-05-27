import { Router } from 'express';
import { validateContactPayload } from '../../../shared/contactValidation.js';

const router = Router();

router.post('/', (request, response) => {
  const { contact, errors, isValid } = validateContactPayload(request.body);

  if (!isValid) {
    response.status(400).json({
      ok: false,
      errors,
      message: 'Please fix the highlighted fields and try again.'
    });
    return;
  }

  response.status(201).json({
    ok: true,
    message: `Thanks, ${contact.name}. Your note is ready for future storage.`,
    contact
  });
});

export default router;
