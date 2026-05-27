import { useState } from 'react';
import { validateContactPayload } from '../../../shared/contactValidation.js';
import { submitContact } from '../data/api';

const initialForm = {
  name: '',
  email: '',
  message: ''
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ tone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = validateContactPayload(form);

    if (!result.isValid) {
      setErrors(result.errors);
      setStatus({
        tone: 'fail',
        message: 'Please use plain text only and fix the highlighted fields.'
      });
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await submitContact(result.contact);
      setForm(initialForm);
      setStatus({ tone: 'success', message: response.message });
    } catch (error) {
      setErrors(error.details || {});
      setStatus({
        tone: 'fail',
        message: error.message || 'Submission failed. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.22em] text-stone-500">Contact</p>
        <h2 className="text-3xl">Start a conversation</h2>
        <p className="max-w-2xl text-sm leading-7 text-stone-700">
          This form stays intentionally strict for now. Plain text only, clear warnings,
          and a backend-ready shape for future Mongo storage.
        </p>
      </div>

      <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <Field
          error={errors.name}
          label="Name"
          name="name"
          onChange={updateField}
          value={form.name}
        />
        <Field
          error={errors.email}
          label="Email"
          name="email"
          onChange={updateField}
          value={form.email}
        />
        <Field
          className="md:col-span-2"
          error={errors.message}
          label="Message"
          name="message"
          onChange={updateField}
          textarea
          value={form.message}
        />
        <div className="md:col-span-2">
          <button
            className="rounded border border-cedar px-5 py-3 text-sm text-cedar disabled:opacity-60"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Sending...' : 'Send message'}
          </button>
        </div>
        {status.message && (
          <p
            className={`md:col-span-2 text-sm ${
              status.tone === 'success' ? 'text-emerald-700' : 'text-red-700'
            }`}
            role="status"
          >
            {status.message}
          </p>
        )}
      </form>
    </section>
  );
}

function Field({ className = '', error, label, name, onChange, textarea, value }) {
  const baseClass = `space-y-2 ${className}`.trim();
  const inputClass = 'w-full rounded border border-stone-300 px-4 py-3 text-sm';

  return (
    <label className={baseClass}>
      <span className="text-sm text-stone-700">{label}</span>
      {textarea ? (
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          name={name}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input className={inputClass} name={name} onChange={onChange} value={value} />
      )}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </label>
  );
}
