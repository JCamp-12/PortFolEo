import { Router } from 'express';
import { validateContactPayload } from '../../../shared/contactValidation.js';
import { getPrismaClient } from '../lib/prisma.js';

const router = Router();

router.post('/', async (request, response) => {
  const { contact, errors, isValid } = validateContactPayload(request.body);

  if (!isValid) {
    response.status(400).json({
      ok: false,
      errors,
      message: 'Please fix the highlighted fields and try again.'
    });
    return;
  }

  try {
    const savedMessage = await getPrismaClient().contactMessage.create({
      data: contact
    });

    response.status(201).json({
      ok: true,
      message: `Thanks, ${savedMessage.name}. Your note has been saved.`,
      contact: {
        id: savedMessage.id,
        name: savedMessage.name,
        email: savedMessage.email,
        message: savedMessage.message,
        createdAt: savedMessage.createdAt
      }
    });
  } catch (error) {
    console.error('Contact message save failed:', error.message);
    response.status(500).json({
      ok: false,
      message: 'We could not save your message right now. Please try again soon.'
    });
  }
});

export default router;
