const fieldRules = {
  name: {
    label: 'Name',
    maxLength: 60,
    pattern: /^[A-Za-z0-9 .'-]+$/,
    message: 'Name can use letters, numbers, spaces, apostrophes, periods, and hyphens.'
  },
  email: {
    label: 'Email',
    maxLength: 80,
    pattern: /^[A-Za-z0-9@._+-]+$/,
    message: 'Email can only use standard email characters.'
  },
  message: {
    label: 'Message',
    maxLength: 240,
    pattern: /^[^<>]+$/,
    message: 'Message can use normal punctuation, but not angle brackets.'
  }
};

function sanitizeLineValue(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function sanitizeMessageValue(value) {
  return String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

function sanitizeValue(key, value) {
  return key === 'message' ? sanitizeMessageValue(value) : sanitizeLineValue(value);
}

function validateField(key, value) {
  const rule = fieldRules[key];
  const sanitized = sanitizeValue(key, value);

  if (!sanitized) {
    return `${rule.label} is required.`;
  }

  if (sanitized.length > rule.maxLength) {
    return `${rule.label} must be ${rule.maxLength} characters or fewer.`;
  }

  if (!rule.pattern.test(sanitized)) {
    return rule.message;
  }

  return '';
}

export function normalizeContactPayload(payload) {
  return {
    name: sanitizeValue('name', payload?.name),
    email: sanitizeValue('email', payload?.email),
    message: sanitizeValue('message', payload?.message)
  };
}

export function validateContactPayload(payload) {
  const contact = normalizeContactPayload(payload);
  const errors = {};

  Object.keys(fieldRules).forEach((key) => {
    const error = validateField(key, contact[key]);
    if (error) {
      errors[key] = error;
    }
  });

  if (contact.email && !contact.email.includes('@')) {
    errors.email = 'Email must include an @ symbol.';
  }

  return {
    contact,
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
