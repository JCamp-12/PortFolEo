const fieldRules = {
  name: {
    label: 'Name',
    maxLength: 60,
    pattern: /^[A-Za-z0-9 ]+$/
  },
  email: {
    label: 'Email',
    maxLength: 80,
    pattern: /^[A-Za-z0-9@._-]+$/
  },
  message: {
    label: 'Message',
    maxLength: 240,
    pattern: /^[A-Za-z0-9 .,@_?-]+$/
  }
};

function sanitizeValue(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function validateField(key, value) {
  const rule = fieldRules[key];
  const sanitized = sanitizeValue(value);

  if (!sanitized) {
    return `${rule.label} is required.`;
  }

  if (sanitized.length > rule.maxLength) {
    return `${rule.label} must be ${rule.maxLength} characters or fewer.`;
  }

  if (!rule.pattern.test(sanitized)) {
    return `${rule.label} can only use letters, numbers, spaces, and basic email-safe symbols.`;
  }

  return '';
}

export function normalizeContactPayload(payload) {
  return {
    name: sanitizeValue(payload?.name),
    email: sanitizeValue(payload?.email),
    message: sanitizeValue(payload?.message)
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
